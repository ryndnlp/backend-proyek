const Joi = require("joi");

const monthlyTotalWeightPerYearSchema = Joi.object({
  startYear: Joi.number().required(),
  endYear: Joi.number().required(),
});

module.exports = { monthlyTotalWeightPerYearSchema };
