const { ObjectId } = require("mongodb");

const Notification = require("../../models/Notification");

const listUserNotification = async (req, res) => {
  try {
    const result = await Notification.find({
      userId: ObjectId(req.cookies.authCookie),
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

module.exports = { listUserNotification };
