const express = require("express");
const router = express.Router();
const {
  listLearning,
  createLearning,
} = require("../../controllers/admin/learningController");

router.get("/", listLearning);
router.post("/", createLearning);

module.exports = router;
