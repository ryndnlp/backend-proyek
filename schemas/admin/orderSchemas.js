const Joi = require("joi");

const listOrderSchema = Joi.object({
  orderStatus: Joi.string().valid(
    "UNASSIGNED",
    "UPCOMING",
    "ONGOING",
    "FINISH"
  ),
  orderDate: Joi.date(),
}).min(1);

const assignOrderSchema = Joi.object({
  orderId: Joi.string().length(24).required(),
  orderDate: Joi.date().required(),
  petugasId: Joi.string().length(24).required(),
  timeCategory: Joi.number().required(),
});

module.exports = {
  listOrderSchema,
  assignOrderSchema,
};
