const { ObjectId } = require("mongodb");

const Discussion = require("../../models/Discussion");

const {
  updateDiscussionSchema,
} = require("../../schemas/admin/discussionSchemas");

const updateDiscussion = async (req, res) => {
  try {
    const args = {
      discussionId: req.params.discussionId,
      ...req.body,
    };
    const { error, value } = updateDiscussionSchema.validate(args);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const { discussionId, answer } = value;

    const adminId = ObjectId(req.cookies.authCookie);
    const result = await Discussion.findOneAndUpdate(
      { _id: discussionId },
      { $set: { adminId, answer } },
      { returnOriginal: false }
    );
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

const listDiscussion = async (req, res) => {
  try {
    const result = await Discussion.find({});
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

module.exports = { updateDiscussion, listDiscussion };
