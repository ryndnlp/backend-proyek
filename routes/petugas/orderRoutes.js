const express = require("express");
const router = express.Router();
const { listOrder } = require("../../controllers/petugas/orderController");

router.get("/", listOrder);

module.exports = router;
