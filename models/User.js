const { Schema, model } = require("mongoose");

const coordinate = new Schema(
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

const addressSchema = new Schema(
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
    },
    coordinate: {
      type: coordinate,
      required: true,
    },
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["ADMIN", "PETUGAS", "MEMBER"],
      required: true,
    },
    address: [{ type: addressSchema }],
    point: {
      type: Number,
    },
  },
  { versionKey: false, strict: true }
);

const User = model("User", UserSchema);

module.exports = User;
