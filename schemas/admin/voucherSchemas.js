const Joi = require("joi");

const createVoucherSchema = Joi.object({
  name: Joi.string().required(),
  point: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
  discount: Joi.number().required(),
});

module.exports = { createVoucherSchema };
