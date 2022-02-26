const isEmpty = require("lodash/isEmpty");
const { ObjectId } = require("mongodb");

const Notification = require("../../models/Notification");
const Order = require("../../models/Order");
const User = require("../../models/User");

const {
  listOrderSchema,
  assignOrderSchema,
} = require("../../schemas/admin/orderSchemas");
const { sendNotification } = require("../../utils/notifications");
const { NEW_ORDER } = require("../../template/notification");

const assignOrder = async (req, res) => {
  try {
    const args = {
      orderId: req.params.orderId,
      ...req.body,
    };

    const { error, value } = assignOrderSchema.validate(args);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const { orderId, petugasId, orderDate, timeCategory } = value;
    const order = await Order.findOne({ _id: ObjectId(orderId) }).populate(
      "memberId"
    );

    if (isEmpty(order)) {
      const err = {
        name: "OrderNotExists",
        message: "Order is not exists",
      };
      throw err;
    }

    const petugas = await User.findOne({
      _id: ObjectId(petugasId),
      type: "PETUGAS",
    });
    if (isEmpty(petugas)) {
      const err = {
        name: "PetugasNotExists",
        message: "Petugas is not exists",
      };
      throw err;
    }

    const { fullName: petugasName, phone: petugasPhone } = petugas;
    const result = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        $set: {
          orderDate,
          timeCategory,
          petugasId,
          orderStatus: "UPCOMING",
          petugasName,
          petugasPhone,
        },
      },
      { returnOriginal: false }
    );

    const notification = {
      type: "NEW_ORDER",
      orderId,
      userId: petugasId,
    };

    await Notification.create(notification);

    sendNotification(
      NEW_ORDER.title,
      NEW_ORDER.body,
      "NEW_ORDER",
      petugas.deviceToken,
      {
        orderId,
      }
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

const listOrder = async (req, res) => {
  try {
    const { error, value } = listOrderSchema.validate(req.query);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const result = await Order.find({ ...value });
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
  assignOrder,
};
