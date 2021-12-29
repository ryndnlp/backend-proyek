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
      requried: true,
    },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderStatus: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: AddressSchema,
      required: true,
    },
    trashDetail: {
      type: TrashDetailSchema,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, strict: true }
);

const Order = model("Order", OrderSchema);

module.exports = Order;
