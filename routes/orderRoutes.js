const express = require("express");
const router = express.Router();
const {
  createOrder,
  listOrder,
  detailOrder,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", listOrder);
router.get("/:orderId", detailOrder);
router.put("/:orderId", assignOrder);

module.exports = router;
