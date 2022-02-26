const { ObjectId } = require("mongodb");

const Notification = require("../../models/Notification");

const NOTIFICATION = require("../../template/notification");
const { templateFunc } = require("../../utils/template");
const moment = require("moment");

const listUserNotification = async (req, res) => {
  try {
    let result = await Notification.find({
      userId: ObjectId(req.cookies.authCookie),
    });

    result = result.map((res) => ({
      ...res.toObject(),
      title: NOTIFICATION[res.type].title,
      body:
        res.type === "PETUGAS_STARTED"
          ? templateFunc(NOTIFICATION[res.type].body, {
              orderDate: moment(res.createdAt).format("dddd, DD MMMM YYYY"),
            })
          : NOTIFICATION[res.type].body,
    }));

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
