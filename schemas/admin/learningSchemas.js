const Joi = require("joi");

const createLearningSchema = Joi.object({
  author: Joi.string().required(),
  description: Joi.string(),
  imgUrl: Joi.string().required(),
});

module.exports = { createLearningSchema };
