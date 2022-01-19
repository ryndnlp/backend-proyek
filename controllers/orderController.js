const isEmpty = require("lodash/isEmpty");
const { ObjectId } = require("mongodb");

const Order = require("../models/Order");
const User = require("../models/User");

const {
  createOrderSchema,
  listOrderSchema,
  detailOrderSchema,
  assignOrderSchema,
} = require("../schemas/orderSchemas");

const createOrder = async (req, res) => {
  try {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const result = await Order.create({
      ...value,
      orderStatus: "UNASSIGNED",
      paymentStatus: false,
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

const detailOrder = async (req, res) => {
  try {
    const { error, value } = detailOrderSchema.validate(req.params);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const result = await Order.findOne({ _id: ObjectId(value.orderId) });
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

const assignOrder = async (req, res) => {
  try {
    const args = {
      orderId: req.params.orderId,
      ...req.body,
    };
    console.log(args);
    const { error, value } = assignOrderSchema.validate(args);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const { orderId, petugasId, orderDate, timeCategory } = value;
    const order = await Order.findOne({ _id: ObjectId(orderId) });

    if (isEmpty(order)) {
      const err = {
        name: "OrderNotExists",
        message: "Order is not exists",
      };
      throw err;
    }

    const petugas = User.findOne({
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

    const result = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { orderDate, timeCategory, petugasId, orderStatus: "UPCOMING" } },
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

module.exports = { createOrder, listOrder, detailOrder, assignOrder };
