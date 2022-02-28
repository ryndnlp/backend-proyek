const { Schema, model } = require("mongoose");

const ConfigSchema = new Schema(
  {
    pickUpPrice: {
      type: Number,
    },
  },
  { versionKey: false, strict: true }
);

const Config = model("Config", ConfigSchema);

module.exports = Config;
