const express = require("express");
const {
  buyVoucher,
  listUserVoucher,
  applyVoucher,
  listVoucher,
} = require("../../controllers/member/voucherController");
const router = express.Router();

router.post("/:voucherId/buy", buyVoucher);
router.get("/me", listUserVoucher);
router.post("/:userVoucherId/apply", applyVoucher);
router.get("/", listVoucher);

module.exports = router;
