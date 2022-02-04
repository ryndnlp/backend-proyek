const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongodb");

const UserVoucherSchema = new Schema(
  {
    voucherId: {
      type: ObjectId,
      required: true,
      ref: "Voucher",
    },
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    isApplied: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false, strict: true }
);

const UserVoucher = model("UserVoucher", UserVoucherSchema);

module.exports = UserVoucher;
