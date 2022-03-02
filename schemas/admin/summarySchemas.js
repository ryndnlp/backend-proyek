const Joi = require("joi");

const dailyTotalWeightSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
});

const conclusionDashboardSchema = Joi.object({
  currentDate: Joi.date().required(),
});

const dailyTotalPricePerTypeSchema = Joi.object({
  currentDate: Joi.date().required(),
});

const dailyTotalPriceSchema = Joi.object({
  currentDate: Joi.date().required(),
});

module.exports = {
  dailyTotalWeightSchema,
  conclusionDashboardSchema,
  dailyTotalPricePerTypeSchema,
  dailyTotalPriceSchema,
};
