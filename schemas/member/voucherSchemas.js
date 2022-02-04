const Joi = require("joi");

const buyVoucherSchema = Joi.object({
  voucherId: Joi.string().length(24).required(),
});

const applyVoucherSchema = Joi.object({
  userVoucherId: Joi.string().length(24).required(),
});

module.exports = { buyVoucherSchema, applyVoucherSchema };
