const { Schema, model } = require("mongoose");

const UserVerifiedSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false, strict: true }
);

const UserVerified = model("UserVerified", UserVerifiedSchema);

module.exports = UserVerified;
