const { ObjectId } = require("mongodb");

const Notification = require("../../models/Notification");
const {
  listNotificationByMemberSchema,
} = require("../../schemas/petugas/notificationSchemas");

const listNotificationByMember = async (req, res) => {
  try {
    const args = {
      userId: req.params.userId,
    };
    const { error, value } = listNotificationByMemberSchema.validate(args);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const result = await Notification.find({
      userId: ObjectId(value.userId),
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

module.exports = { listNotificationByMember };
