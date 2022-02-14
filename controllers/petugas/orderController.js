const { ObjectId } = require("mongodb");

const Order = require("../../models/Order");
const User = require("../../models/User");
const Notification = require("../../models/Notification");

const moment = require("moment");

const {
  listOrderSchema,
  updateOrderStatusSchema,
  updatePaidAmountSchema,
  confirmPaymentSchema,
} = require("../../schemas/petugas/orderSchemas");
const {
  PAYMENT_COMPLETE,
  PETUGAS_STARTED,
  PETUGAS_ARRIVED,
} = require("../../template/notification");
const { sendNotification } = require("../../utils/notifications");
const { templateFunc } = require("../../utils/template");

const listOrder = async (req, res) => {
  try {
    const { error, value } = listOrderSchema.validate(req.query);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const result = await Order.find({
      ...value,
      petugasId: ObjectId(req.cookies.authCookie),
    });
    const response = {
      code: 200,
      data: result,
    };
    res.json(response);
  } catch (err) {
    const response = {
      code: 400,
      error: err,
    };
    res.status(400).json(response);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const args = {
      orderId: req.params.orderId,
      ...req.body,
    };
    const { error, value } = updateOrderStatusSchema.validate(args);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const { orderId, orderStatus } = value;
    const petugasId = req.cookies.authCookie;

    const isOrderExists = await Order.exists({
      _id: orderId,
      petugasId,
    });

    if (!isOrderExists) {
      const err = {
        name: "OrderNotExists",
        message: "Order is not exists",
      };
      throw err;
    }

    const {
      memberId: { deviceToken },
      orderDate,
    } = await Order.findOne({
      _id: orderId,
    }).populate("memberId");

    const result = await Order.findOneAndUpdate(
      { _id: orderId, petugasId },
      { $set: { orderStatus } },
      { returnOriginal: false }
    );

    let notification;

    switch (orderStatus) {
      case "ONGOING": {
        notification = {
          type: "PETUGAS_STARTED",
          orderId,
          userId: result.memberId,
        };

        await Notification.create(notification);

        sendNotification(
          PETUGAS_STARTED.title,
          templateFunc(PETUGAS_STARTED.body, {
            orderDate: moment(orderDate).format("dddd, DD MMMM YYYY"),
          }),
          "PETUGAS_STARTED",
          deviceToken,
          { orderId }
        );
        break;
      }
      case "FINISH": {
        notification = {
          type: "PETUGAS_ARRIVED",
          orderId,
          userId: result.memberId,
        };

        await Notification.create(notification);

        sendNotification(
          PETUGAS_ARRIVED.title,
          PETUGAS_ARRIVED.body,
          "PETUGAS_ARRIVED",
          deviceToken,
          { orderId }
        );
        break;
      }
    }

    const response = {
      code: 200,
      data: result,
    };
    res.json(response);
  } catch (err) {
    const response = {
      code: 400,
      error: err,
    };
    res.status(400).json(response);
  }
};

const updatePaidAmount = async (req, res) => {
  try {
    const args = {
      orderId: req.params.orderId,
      ...req.body,
    };
    const { error, value } = updatePaidAmountSchema.validate(args);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const { orderId, paidAmount } = value;

    const isOrderExists = await Order.exists({
      _id: orderId,
      petugasId: req.cookies.authCookie,
    });

    if (!isOrderExists) {
      const err = {
        name: "OrderNotExists",
        message: "Order is not exists",
      };
      throw err;
    }

    const result = await Order.findOneAndUpdate(
      { _id: orderId, petugasId: req.cookies.authCookie },
      { $set: { paidAmount } },
      { returnOriginal: false }
    );
    const response = {
      code: 200,
      data: result,
    };
    res.json(response);
  } catch (err) {
    const response = {
      code: 400,
      error: err,
    };
    res.status(400).json(response);
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { error, value } = confirmPaymentSchema.validate(req.params);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const { orderId } = value;

    const isOrderExists = await Order.exists({
      _id: orderId,
    });

    if (!isOrderExists) {
      const err = {
        name: "OrderNotExists",
        message: "Order is not exists",
      };
      throw err;
    }

    const {
      paidAmount,
      price,
      memberId: { _id: memberId, deviceToken },
    } = await Order.findOne({
      _id: orderId,
    }).populate("memberId");

    if (paidAmount === price) {
      const err = {
        name: "OrderPaid",
        message: "Order is already paid",
      };
      throw err;
    }

    const { point: currentPoint } = await User.findOne({
      _id: memberId,
    }).select("point -_id");

    await User.findOneAndUpdate(
      { _id: ObjectId(memberId) },
      { $set: { point: currentPoint + Math.floor(price / 10) } },
      { returnOriginal: false }
    );

    const result = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { paidAmount: price } },
      { returnOriginal: false }
    );

    const notification = {
      type: "PAYMENT_COMPLETE",
      userId: memberId,
    };

    await Notification.create(notification);

    sendNotification(
      PAYMENT_COMPLETE.title,
      PAYMENT_COMPLETE.body,
      "PAYMENT_COMPLETE",
      deviceToken,
      { orderId }
    );

    const response = {
      code: 200,
      data: result,
    };
    res.json(response);
  } catch (err) {
    const response = {
      code: 400,
      error: err,
    };
    res.status(400).json(response);
  }
};

module.exports = {
  listOrder,
  updateOrderStatus,
  updatePaidAmount,
  confirmPayment,
};
