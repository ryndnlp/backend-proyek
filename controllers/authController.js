const isEmpty = require("lodash/isEmpty");

const User = require("../models/User");
const UserVerified = require("../models/UserVerified");
const {
  registerSchema,
  loginSchema,
  verifySchema,
} = require("../schemas/authSchemas");

const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const { username, phone, key, ...args } = value;
    const isUserNameExists = await User.exists({ username });
    if (isUserNameExists) {
      const err = {
        name: "UsernameExists",
        message: "Username is already exists",
      };
      throw err;
    }

    const isPhoneExists = await User.exists({ phone });
    if (isPhoneExists) {
      const err = {
        name: "PhoneExists",
        message: "Phone is already exists",
      };
      throw err;
    }

    const isVerified = await UserVerified.exists({ username });
    if (!isVerified) {
      const err = {
        name: "UserNotVerified",
        message: "User has not been verified",
      };
      throw err;
    }

    let type;
    switch (key) {
      case "IniKunciPetugas":
        type = "PETUGAS";
        break;
      case "IniKunciAdmin":
        type = "ADMIN";
        break;
      case "IniKunciMember":
        type = "MEMBER";
        break;
      default:
        const err = {
          name: "Invalid key",
          message: "Key is not recognized",
        };
        throw err;
    }

    const result = await User.create({ username, phone, type, ...args });
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

const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const { username, password } = value;
    const user = await User.findOne({ username, password });
    if (isEmpty(user)) {
      const err = {
        name: "UserNotExists",
        message: "Username or password is incorrect",
      };
      throw err;
    }

    const response = {
      code: 200,
      data: user,
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

const verify = async (req, res) => {
  try {
    const KEY = "12345";
    const { error, value } = verifySchema.validate(req.body);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }

    const { username, key } = value;

    if (KEY !== key) {
      const err = { name: "InvalidKey", message: "Fail to verify user" };
      throw err;
    }

    const result = await UserVerified.create({ username });
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

module.exports = { register, login, verify };
