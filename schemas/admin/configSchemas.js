const Joi = require("joi");

const updateConfigSchema = Joi.object({
  pickUpPrice: Joi.number().required(),
});

module.exports = { updateConfigSchema };
