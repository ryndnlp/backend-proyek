const Joi = require("joi");

const coordinateSchema = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

const addressSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  coordinate: coordinateSchema,
});

const trashDetailSchema = Joi.object({
  type: Joi.string().required(),
  category: Joi.number().required(),
});

const createOrderSchema = Joi.object({
  userId: Joi.string().required(),
  address: addressSchema,
  trashDetail: trashDetailSchema,
  price: Joi.number().required(),
});

const listOrderSchema = Joi.object({
  userId: Joi.string().required().length(24),
});

const detailOrderSchema = Joi.object({
  id: Joi.string().required().length(24),
});

module.exports = {
  createOrderSchema,
  listOrderSchema,
  detailOrderSchema,
};
