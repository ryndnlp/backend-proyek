const Joi = require("joi");

const createDailyReportSchema = Joi.object({
  weight: Joi.number().required(),
  volume: Joi.number().required(),
  photoUrl: Joi.string().required(),
  orderId: Joi.string().length(24).required(),
});

module.exports = { createDailyReportSchema };
