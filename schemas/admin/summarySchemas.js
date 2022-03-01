const Joi = require("joi");

const dailyTotalWeightSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
});

const conclusionSchema = Joi.object({
  currentDate: Joi.date().required(),
});

module.exports = { dailyTotalWeightSchema, conclusionSchema };
