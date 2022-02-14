const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongodb");

const NotificationSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "PETUGAS_STARTED",
        "PETUGAS_ARRIVED",
        "PAYMENT_COMPLETE",
        "NEW_ORDER",
      ],
      required: true,
    },
    orderId: {
      type: ObjectId,
      ref: "Order",
    },
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    strict: true,
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Notification = model("Notification", NotificationSchema);

module.exports = Notification;
