const { ObjectId } = require("mongodb");

const DailyReport = require("../../models/DailyReport");

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

    const result = await DailyReport.create({
      ...value,
      petugasId: ObjectId(req.cookies.authCookie),
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

module.exports = { createDailyReport };
