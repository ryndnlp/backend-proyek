const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  fullName: Joi.string().required(),
  key: Joi.string().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string().required(),
});

const verifySchema = Joi.object({
  username: Joi.string().required(),
  key: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema, verifySchema };
