const express = require("express");
const router = express.Router();
const { getConfig } = require("../../controllers/member/configController");

router.get("/", getConfig);

module.exports = router;
