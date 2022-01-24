const express = require("express");
const router = express.Router();
const {
  createOrder,
  listOrder,
  detailOrder,
} = require("../../controllers/member/orderController");

router.post("/", createOrder);
router.get("/", listOrder);
router.get("/:orderId", detailOrder);

module.exports = router;
