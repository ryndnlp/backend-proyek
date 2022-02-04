const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongodb");

const VoucherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    point: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    adminId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, strict: true }
);

const Voucher = model("Voucher", VoucherSchema);

module.exports = Voucher;
