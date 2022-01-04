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

const trashDetailSchema = Joi.object({
  type: Joi.string().required(),
  category: Joi.number().valid(0, 1, 2, 3, 4, 5, 6).required(),
});

const createOrderSchema = Joi.object({
  userId: Joi.string().required(),
  address: addressSchema,
  trashDetail: Joi.array().items(trashDetailSchema).required().min(1),
  price: Joi.number().required(),
});

const listOrderSchema = Joi.object({
  userId: Joi.string().length(24),
  orderStatus: Joi.string().valid(
    "UNASSIGNED",
    "UPCOMING",
    "ONGOING",
    "FINISH"
  ),
}).min(1);

const detailOrderSchema = Joi.object({
  orderId: Joi.string().length(24).required(),
});

const assignOrderSchema = Joi.object({
  orderId: Joi.string().length(24).required(),
  orderDate: Joi.date().required(),
  petugasId: Joi.string().length(24).required(),
  timeCategory: Joi.number().required(),
});

module.exports = {
  createOrderSchema,
  listOrderSchema,
  detailOrderSchema,
  assignOrderSchema,
};
