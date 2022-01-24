const express = require("express");
const router = express.Router();

const authRotes = require("./authRoutes");

const member = require("./member");
const admin = require("./admin");
const { verifyMember, verifyAdmin } = require("../utils/verify");

// general endpoint
router.use("/auth", authRotes);

// specific endpoint
router.use("/member", verifyMember, member);
router.use("/admin", verifyAdmin, admin);

module.exports = router;
