const Joi = require("joi");

const createDailyReportSchema = Joi.object({
  weight: Joi.number().required(),
  volume: Joi.number().required(),
  photoUrl: Joi.string().required(),
});

module.exports = { createDailyReportSchema };
