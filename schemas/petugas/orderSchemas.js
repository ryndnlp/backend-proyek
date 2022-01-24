const Joi = require("joi");

const listOrderSchema = Joi.object({
  orderStatus: Joi.string().valid(
    "UNASSIGNED",
    "UPCOMING",
    "ONGOING",
    "FINISH"
  ),
}).min(1);

const updateOrderStatusSchema = Joi.object({
  orderId: Joi.string().length(24).required(),
  orderStatus: Joi.string().valid("ONGOING", "FINISH").required(),
});

const updatePaidAmountSchema = Joi.object({
  orderId: Joi.string().length(24).required(),
  paidAmount: Joi.number().required(),
});

module.exports = {
  listOrderSchema,
  updateOrderStatusSchema,
  updatePaidAmountSchema,
};
