const express = require("express");
const router = express.Router();
const {
  createDailyReport,
} = require("../../controllers/petugas/dailyReportController");

router.post("/", createDailyReport);

module.exports = router;
