const express = require("express");
const router = express.Router();
const {
  dailyTotalWeight,
  conclusionDashboard,
  dailyTotalPricePerType,
  dailyTotalPrice,
} = require("../../controllers/admin/summaryController");

router.get("/dailyTotalWeight", dailyTotalWeight);
router.get("/conclusionDashboard", conclusionDashboard);
router.get("/dailyTotalPricePerType", dailyTotalPricePerType);
router.get("/dailyTotalPrice", dailyTotalPrice);

module.exports = router;
