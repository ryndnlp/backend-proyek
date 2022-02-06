const { ObjectId } = require("mongodb");

const DailyReport = require("../../models/DailyReport");
const Order = require("../../models/Order");

const {
  createDailyReportSchema,
} = require("../../schemas/petugas/dailyReportSchemas");

const createDailyReport = async (req, res) => {
  try {
    const { error, value } = createDailyReportSchema.validate(req.body);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const { weight, volume, photoUrl, orderId } = value;

    const isOrderExists = await Order.exists({ _id: ObjectId(orderId) });

    if (!isOrderExists) {
      const err = {
        name: "OrderNotExists",
        message: "Order is not exists",
      };
      throw err;
    }

    const result = await DailyReport.create({
      weight,
      volume,
      photoUrl,
      petugasId: ObjectId(req.cookies.authCookie),
    });

    await Order.findOneAndUpdate(
      { _id: ObjectId(orderId) },
      { $set: { laporanId: result._id } },
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

module.exports = { createDailyReport };
