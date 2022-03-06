const { Schema, model } = require("mongoose");

const LearningSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, strict: true }
);

const Learning = model("Learning", LearningSchema);

module.exports = Learning;
