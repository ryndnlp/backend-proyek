const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongodb");

const DailyReportSchema = new Schema(
  {
    petugasId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, strict: true }
);

const DailyReport = model("DailyReport", DailyReportSchema);

module.exports = DailyReport;
