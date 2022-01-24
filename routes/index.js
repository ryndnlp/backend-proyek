const express = require("express");
const router = express.Router();

const authRotes = require("./authRoutes");

const member = require("./member");
const admin = require("./admin");
const petugas = require("./petugas");

const { verifyMember, verifyAdmin, verifyPetugas } = require("../utils/verify");

// general endpoint
router.use("/auth", authRotes);

// specific endpoint
router.use("/member", verifyMember, member);
router.use("/admin", verifyAdmin, admin);
router.use("/petugas", verifyPetugas, petugas);

module.exports = router;
