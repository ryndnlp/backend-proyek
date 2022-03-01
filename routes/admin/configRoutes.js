const express = require("express");
const router = express.Router();
const { updateConfig } = require("../../controllers/admin/configController");

router.put("/", updateConfig);

module.exports = router;
