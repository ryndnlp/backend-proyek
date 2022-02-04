const { ObjectId } = require("mongodb");

const Voucher = require("../../models/Voucher");
const { createVoucherSchema } = require("../../schemas/admin/voucherSchemas");

const createVoucher = async (req, res) => {
  try {
    const { error, value } = createVoucherSchema.validate(req.body);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const adminId = ObjectId(req.cookies.authCookie);
    const result = await Voucher.create({ adminId, ...value });

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
    const result = await Voucher.find({});

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

module.exports = { createVoucher, listVoucher };
