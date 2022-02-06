const { ObjectId } = require("mongodb");

const Order = require("../../models/Order");
const User = require("../../models/User");

const {
  listOrderSchema,
  updateOrderStatusSchema,
  updatePaidAmountSchema,
  confirmPaymentSchema,
} = require("../../schemas/petugas/orderSchemas");

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
      { $set: { orderStatus } },
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
    const { paidAmount, price, memberId } = await Order.findOne({
      _id: orderId,
    }).select("paidAmount price memberId -_id");

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
