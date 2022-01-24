const User = require("../../models/User");
const { listUserSchema } = require("../../schemas/admin/userSchemas");

const listUser = async (req, res) => {
  try {
    const { error, value } = listUserSchema.validate(req.query);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const result = await User.find({ type: value.type });
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

module.exports = {
  listUser,
};
