const express = require("express");
const router = express.Router();
const {
  monthlyTotalWeightPerYear,
} = require("../../controllers/member/summaryController");

router.get("/monthlyTotalWeightPerYear", monthlyTotalWeightPerYear);

module.exports = router;
