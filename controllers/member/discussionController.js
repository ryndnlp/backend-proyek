const { ObjectId } = require("mongodb");

const Discussion = require("../../models/Discussion");
const User = require("../../models/User");

const {
  createDiscussionSchema,
} = require("../../schemas/member/discussionSchemas");

const listDiscussionByUser = async (req, res) => {
  try {
    const result = await Discussion.find({
      memberId: ObjectId(req.cookies.authCookie),
    });
    const response = {
      code: 200,
      data: result,
    };
    res.json(response);
  } catch (err) {
    const response = {
      code: 400,
      error: err,
    };
    res.status(400).json(response);
  }
};

const listQuestion = async (req, res) => {
  try {
    const result = await Discussion.find({
      type: "PERTANYAAN",
    });
    const response = {
      code: 200,
      data: result,
    };
    res.json(response);
  } catch (err) {
    const response = {
      code: 400,
      error: err,
    };
    res.status(400).json(response);
  }
};

const createDiscussion = async (req, res) => {
  try {
    const { error, value } = createDiscussionSchema.validate(req.body);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const { type, message } = value;

    const memberId = ObjectId(req.cookies.authCookie);
    const member = await User.findOne({ _id: memberId });
    const result = await Discussion.create({
      memberId,
      memberName: member.fullName,
      type,
      message,
    });
    const response = {
      code: 200,
      data: result,
    };
    res.json(response);
  } catch (err) {
    const response = {
      code: 400,
      error: err,
    };
    res.status(400).json(response);
  }
};

module.exports = { listDiscussionByUser, listQuestion, createDiscussion };
