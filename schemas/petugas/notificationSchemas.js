const Joi = require("joi");

const listNotificationByMemberSchema = Joi.object({
  userId: Joi.string().length(24).required(),
});

module.exports = { listNotificationByMemberSchema };
