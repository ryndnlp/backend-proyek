const { ObjectId } = require("mongodb");

const Notification = require("../../models/Notification");
const {
  listNotificationByMemberSchema,
} = require("../../schemas/petugas/notificationSchemas");

const NOTIFICATION = require("../../template/notification");

const { templateFunc } = require("../../utils/template");

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

    let result = await Notification.find({
      userId: ObjectId(value.userId),
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

module.exports = { listNotificationByMember };
