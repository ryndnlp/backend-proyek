const express = require("express");
const router = express.Router();
const {
  createOrder,
  listOrder,
  detailOrder,
  assignOrder,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", listOrder);
router.get("/:orderId", detailOrder);
router.post("/:orderId/assign", assignOrder);

module.exports = router;
