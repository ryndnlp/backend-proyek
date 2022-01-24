const express = require("express");
const router = express.Router();
const {
  listOrder,
  assignOrder,
} = require("../../controllers/admin/orderController");

router.get("/", listOrder);
router.post("/:orderId/assign", assignOrder);

module.exports = router;
