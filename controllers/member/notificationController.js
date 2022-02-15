const { ObjectId } = require("mongodb");

const Notification = require("../../models/Notification");

const NOTIFICATION = require("../../template/notification");
const { templateFunc } = require("../../utils/template");

const listUserNotification = async (req, res) => {
  try {
    let result = await Notification.find({
      userId: ObjectId(req.cookies.authCookie),
    });

    result = result.map((res) => ({
      ...res.toObject(),
      title:
        res.type === "PETUGAS_STARTED"
          ? templateFunc(PETUGAS_STARTED.body, {
              orderDate: moment(orderDate).format("dddd, DD MMMM YYYY"),
            })
          : NOTIFICATION[res.type].title,
      body: NOTIFICATION[res.type].body,
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
