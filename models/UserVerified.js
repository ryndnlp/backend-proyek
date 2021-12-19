const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const UserVerified = mongoose.model("UserVerified", UserVerifiedSchema);

module.exports = UserVerified;
