const express = require("express");
const router = express.Router();
const {
  updateDiscussion,
  listDiscussion,
} = require("../../controllers/admin/discussionController");

router.get("/", listDiscussion);
router.put("/:discussionId", updateDiscussion);

module.exports = router;
