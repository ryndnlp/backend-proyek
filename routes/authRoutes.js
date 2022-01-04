const express = require("express");
const router = express.Router();
const {
  login,
  register,
  verify,
  listPetugas,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verify);
router.get("/petugas", listPetugas);

module.exports = router;
