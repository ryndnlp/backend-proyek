const express = require("express");
const router = express.Router();
const {
  listDiscussionByUser,
  listQuestion,
  createDiscussion,
} = require("../../controllers/member/discussionController");

router.get("/question", listQuestion);
router.get("/me", listDiscussionByUser);
router.post("/", createDiscussion);

module.exports = router;
