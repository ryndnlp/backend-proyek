const { ObjectId } = require("mongodb");
const isEmpty = require("lodash/isEmpty");

const Voucher = require("../../models/Voucher");
const User = require("../../models/User");
const {
  buyVoucherSchema,
  applyVoucherSchema,
} = require("../../schemas/member/voucherSchemas");
const UserVoucher = require("../../models/UserVoucher");

const buyVoucher = async (req, res) => {
  try {
    const args = {
      voucherId: req.params.voucherId,
    };
    const { error, value } = buyVoucherSchema.validate(args);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const { voucherId } = value;

    const userId = req.cookies.authCookie;
    const user = await User.findOne({ _id: ObjectId(userId) });
    const voucher = await Voucher.findOne({ _id: ObjectId(voucherId) });

    if (isEmpty(voucher)) {
      const err = {
        name: "InvalidVoucher",
        message: "Voucher is not found",
      };
      throw err;
    }

    if (user.point < voucher.point) {
      const err = {
        name: "InvalidPurchase",
        message: "Point is not sufficent",
      };
      throw err;
    }

    await UserVoucher.create({
      voucherId: ObjectId(voucherId),
      userId: ObjectId(userId),
      isApplied: false,
    });

    const result = await User.findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $set: { point: user.point - voucher.point } },
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

const listVoucher = async (req, res) => {
  try {
    const userId = req.cookies.authCookie;

    const result = await UserVoucher.find({
      userId: ObjectId(userId),
    }).populate("voucherId");
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

const applyVoucher = async (req, res) => {
  try {
    const args = {
      userVoucherId: req.params.userVoucherId,
    };
    const { error, value } = applyVoucherSchema.validate(args);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const { userVoucherId } = value;

    const userVoucher = await UserVoucher.findOne({
      _id: ObjectId(userVoucherId),
    }).select("isApplied -_id");

    if (userVoucher.isApplied) {
      const err = {
        name: "InvalidApply",
        message: "Voucher is already applied",
      };
      throw err;
    }

    const result = await UserVoucher.findOneAndUpdate(
      {
        _id: ObjectId(userVoucherId),
      },
      { $set: { isApplied: true } },
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

module.exports = { buyVoucher, listVoucher, applyVoucher };
