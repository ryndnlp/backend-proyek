const Joi = require("joi");

const coordinateSchema = Joi.object({
  latitude: Joi.number(),
  longitude: Joi.number(),
});

const addressSchema = Joi.object({
  name: Joi.string(),
  detail: Joi.string(),
  description: Joi.string(),
  coordinate: coordinateSchema,
});

const updateUserSchema = Joi.object({
  password: Joi.string(),
  phone: Joi.string(),
  fullName: Joi.string(),
  type: Joi.string().valid("ADMIN", "PETUGAS", "MEMBER"),
  address: Joi.array().items(addressSchema),
  deviceToken: Joi.string(),
  email: Joi.string().email({ tlds: { allow: false } }),
}).min(1);

module.exports = { updateUserSchema };
