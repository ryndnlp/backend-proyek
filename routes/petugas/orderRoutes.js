const express = require("express");
const router = express.Router();
const {
  listOrder,
  updateOrderStatus,
  updatePaidAmount,
  confirmPayment,
} = require("../../controllers/petugas/orderController");

router.get("/", listOrder);
router.put("/:orderId/updateStatus", updateOrderStatus);
router.put("/:orderId/updatePaidAmount", updatePaidAmount);
router.post("/:orderId/confirmPayment", confirmPayment);

module.exports = router;
