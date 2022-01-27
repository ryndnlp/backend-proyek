const { ObjectId } = require("mongodb");

const User = require("../models/User");
const { updateUserSchema } = require("../schemas/userSchemas");

const updateUser = async (req, res) => {
  try {
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const result = await User.findOneAndUpdate(
      { _id: ObjectId(req.cookies.authCookie) },
      { $set: value },
      { returnOriginal: false }
    );
    const response = {
      code: 200,
      data: result,
    };
    res.json(response);
  } catch (err) {
    const response = {
      code: 400,
      error: err,
    };
    res.status(400).json(response);
  }
};

module.exports = { updateUser };
