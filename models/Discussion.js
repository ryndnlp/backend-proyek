const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongodb");

const DiscussionSchema = new Schema(
  {
    memberId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    memberName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["LAPORAN", "PERTANYAAN"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
    },
    adminId: {
      type: ObjectId,
      ref: "User",
    },
  },
  { versionKey: false, strict: true }
);

const Discussion = model("Discussion", DiscussionSchema);

module.exports = Discussion;
