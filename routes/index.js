const express = require("express");
const router = express.Router();

const authRotes = require("./authRoutes");

const member = require("./member");
const admin = require("./admin");

// general endpoint
router.use("/auth", authRotes);

// specific endpoint
router.use("/member", member);
router.use("/admin", admin);

module.exports = router;
