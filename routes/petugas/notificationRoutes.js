const express = require("express");
const {
  listNotificationByMember,
} = require("../../controllers/petugas/notificationController");
const router = express.Router();

router.get("/:userId", listNotificationByMember);

module.exports = router;
