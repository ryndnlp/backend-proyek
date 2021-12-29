const { Schema, model } = require("mongoose");

const coordinteSchema = new Schema(
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
    coodinates: {
      type: coordinteSchema,
      required: true,
    },
  },
  { _id: false }
);

const UserDetailsSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: [{ type: addressSchema }],
  },
  { versionKey: false, strict: true }
);

const UserDetails = model("UserDetails", UserDetailsSchema);

module.exports = UserDetails;
