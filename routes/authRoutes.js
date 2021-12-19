const express = require("express");
const router = express.Router();
const { login, register, verify } = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verify);

module.exports = router;
