const express = require("express");
const {
  buyVoucher,
  listVoucher,
  applyVoucher,
} = require("../../controllers/member/voucherController");
const router = express.Router();

router.post("/:voucherId/buy", buyVoucher);
router.get("/", listVoucher);
router.post("/:userVoucherId/apply", applyVoucher);

module.exports = router;
