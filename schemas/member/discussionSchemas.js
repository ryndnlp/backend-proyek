const Joi = require("joi");

const createDiscussionSchema = Joi.object({
  type: Joi.string().valid("PERTANYAAN", "LAPORAN").required(),
  message: Joi.string().required(),
});

module.exports = { createDiscussionSchema };
