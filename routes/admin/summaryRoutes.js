const express = require("express");
const router = express.Router();
const {
  dailyTotalWeight,
  conclusion,
} = require("../../controllers/admin/summaryController");

router.get("/dailyTotalWeight", dailyTotalWeight);
router.get("/conclusion", conclusion);

module.exports = router;
