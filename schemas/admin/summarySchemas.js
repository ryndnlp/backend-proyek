const Joi = require("joi");

const dailyTotalWeightSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
});

const conclusionDashboardTrashSchema = Joi.object({
  currentDate: Joi.date().required(),
});

const dailyTotalPricePerTypeSchema = Joi.object({
  currentDate: Joi.date().required(),
});

const dailyTotalPriceSchema = Joi.object({
  currentDate: Joi.date().required(),
});

const countFinishedOrderSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
});

const conclusionDashboardTransactionSchema = Joi.object({
  currentDate: Joi.date().required(),
});

module.exports = {
  dailyTotalWeightSchema,
  conclusionDashboardTrashSchema,
  dailyTotalPricePerTypeSchema,
  dailyTotalPriceSchema,
  countFinishedOrderSchema,
  conclusionDashboardTransactionSchema,
};
