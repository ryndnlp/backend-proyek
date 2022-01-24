const express = require("express");
const router = express.Router();
const {
  listOrder,
  updateOrderStatus,
  updatePaidAmount,
} = require("../../controllers/petugas/orderController");

router.get("/", listOrder);
router.put("/:orderId/updateStatus", updateOrderStatus);
router.put("/:orderId/updatePaidAmount", updatePaidAmount);

module.exports = router;
