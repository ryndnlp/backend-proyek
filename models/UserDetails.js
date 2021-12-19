const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordinteSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const addressSchema = new Schema({
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
});

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

const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);

module.exports = UserDetails;
