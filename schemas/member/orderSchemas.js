const Joi = require("joi");

const coordinateSchema = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
}).required();

const addressSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  detail: Joi.string().required(),
  coordinate: coordinateSchema,
}).required();

const priceSchema = Joi.object({
  trashPrice: Joi.number().required(),
  voucherPrice: Joi.number().required(),
  pickUpPrice: Joi.number().required(),
});

const trashDetailSchema = Joi.object({
  type: Joi.string().required(),
  category: Joi.number().valid(0, 1, 2, 3, 4, 5, 6).required(),
});

const createOrderSchema = Joi.object({
  address: addressSchema,
  trashDetail: Joi.array().items(trashDetailSchema).required().min(1),
  price: priceSchema,
});

const listOrderSchema = Joi.object({
  orderStatus: Joi.string().valid(
    "UNASSIGNED",
    "UPCOMING",
    "ONGOING",
    "FINISH"
  ),
});

const detailOrderSchema = Joi.object({
  orderId: Joi.string().length(24).required(),
});

module.exports = {
  createOrderSchema,
  listOrderSchema,
  detailOrderSchema,
};
