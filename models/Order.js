const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongodb");

const CoordinateSchema = new Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const AddressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coordinate: {
      type: CoordinateSchema,
      required: true,
    },
  },
  { _id: false }
);

const TrashDetailSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    category: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6],
      required: true,
    },
  },
  { _id: false }
);

const PriceSchema = new Schema(
  {
    trashPrice: {
      type: Number,
    },
    voucherPrice: {
      type: Number,
    },
    pickUpPrice: {
      type: Number,
    },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderStatus: {
      type: String,
      enum: ["UNASSIGNED", "UPCOMING", "ONGOING", "FINISH"],
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    memberId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: AddressSchema,
      required: true,
    },
    trashDetail: [
      {
        type: TrashDetailSchema,
        required: true,
      },
    ],
    price: {
      type: PriceSchema,
    },
    orderDate: {
      type: Date,
    },
    petugasId: {
      type: ObjectId,
      ref: "User",
    },
    timeCategory: {
      type: Number,
      enum: [1, 2, 3],
    },
    petugasName: {
      type: String,
    },
    memberName: {
      type: String,
      required: true,
    },
    petugasPhone: {
      type: String,
    },
    memberPhone: {
      type: String,
      required: true,
    },
    laporanId: {
      type: ObjectId,
      ref: "DailyReport",
    },
  },
  { versionKey: false, strict: true }
);

const Order = model("Order", OrderSchema);

module.exports = Order;
