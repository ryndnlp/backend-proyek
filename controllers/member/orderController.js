const { ObjectId } = require("mongodb");

const Order = require("../../models/Order");

const {
  createOrderSchema,
  listOrderSchema,
  detailOrderSchema,
} = require("../../schemas/member/orderSchemas");

const createOrder = async (req, res) => {
  try {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const result = await Order.create({
      ...value,
      userId: ObjectId(req.cookies.authCookie),
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

    const result = await Order.find({
      ...value,
      userId: ObjectId(req.cookies.authCookie),
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

const detailOrder = async (req, res) => {
  try {
    const { error, value } = detailOrderSchema.validate(req.params);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const result = await Order.findOne({
      _id: ObjectId(value.orderId),
      userId: ObjectId(req.cookies.authCookie),
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

module.exports = {
  createOrder,
  listOrder,
  detailOrder,
};
