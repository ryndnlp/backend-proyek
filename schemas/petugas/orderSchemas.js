const Joi = require("joi");

const listOrderSchema = Joi.object({
  orderStatus: Joi.string().valid(
    "UNASSIGNED",
    "UPCOMING",
    "ONGOING",
    "FINISH"
  ),
  orderDate: Joi.date(),
});

const updateOrderStatusSchema = Joi.object({
  orderId: Joi.string().length(24).required(),
  orderStatus: Joi.string().valid("ONGOING", "FINISH").required(),
});

const updatePaidAmountSchema = Joi.object({
  orderId: Joi.string().length(24).required(),
  paidAmount: Joi.number().required(),
});

const confirmPaymentSchema = Joi.object({
  orderId: Joi.string().length(24).required(),
});

module.exports = {
  listOrderSchema,
  updateOrderStatusSchema,
  updatePaidAmountSchema,
  confirmPaymentSchema,
};
