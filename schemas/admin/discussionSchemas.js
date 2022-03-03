const Joi = require("joi");

const updateDiscussionSchema = Joi.object({
  discussionId: Joi.string().length(24).required(),
  answer: Joi.string().required(),
});

module.exports = { updateDiscussionSchema };
