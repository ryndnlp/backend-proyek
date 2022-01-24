const Joi = require("joi");

const listUserSchema = Joi.object({
  type: Joi.string().valid("PETUGAS", "ADMIN", "MEMBER").required(),
});

module.exports = { listUserSchema };
