const express = require("express");
const router = express.Router();
const {
  createOrder,
  listOrder,
  detailOrder,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", listOrder);
router.get("/:id", detailOrder);

module.exports = router;
