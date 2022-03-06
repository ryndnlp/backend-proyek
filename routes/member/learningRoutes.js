const express = require("express");
const router = express.Router();
const { listLearning } = require("../../controllers/member/learningController");

router.get("/", listLearning);

module.exports = router;
