const express = require("express");
const {
  createVoucher,
  listVoucher,
} = require("../../controllers/admin/voucherController");
const router = express.Router();

router.post("/", createVoucher);
router.get("/", listVoucher);

module.exports = router;
