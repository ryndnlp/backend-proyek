const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

const member = require("./member");
const admin = require("./admin");
const petugas = require("./petugas");

const {
  verifyMember,
  verifyAdmin,
  verifyPetugas,
  verifyAll,
} = require("../utils/verify");

// general endpoint
router.use("/auth", authRoutes);
router.use("/user", verifyAll, userRoutes);

// specific endpoint
router.use("/member", verifyMember, member);
router.use("/admin", verifyAdmin, admin);
router.use("/petugas", verifyPetugas, petugas);

module.exports = router;
