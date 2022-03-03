const express = require("express");
const router = express.Router();
const {
  dailyTotalWeight,
  conclusionDashboardTrash,
  dailyTotalPricePerType,
  dailyTotalPrice,
  countFinishedOrder,
  conclusionDashboardTransaction,
} = require("../../controllers/admin/summaryController");

router.get("/dailyTotalWeight", dailyTotalWeight);
router.get("/conclusionDashboardTrash", conclusionDashboardTrash);
router.get("/dailyTotalPricePerType", dailyTotalPricePerType);
router.get("/dailyTotalPrice", dailyTotalPrice);
router.get("/countFinishedOrder", countFinishedOrder);
router.get("/conclusionDashboardTransaction", conclusionDashboardTransaction);

module.exports = router;
