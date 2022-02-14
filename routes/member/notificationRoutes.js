const express = require("express");
const router = express.Router();
const {
  listUserNotification,
} = require("../../controllers/member/notificationController");

router.get("/me", listUserNotification);

module.exports = router;
