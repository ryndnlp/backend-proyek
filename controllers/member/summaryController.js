const Order = require("../../models/Order");

const {
  monthlyTotalWeightPerYearSchema,
} = require("../../schemas/member/summarySchemas");

const monthlyTotalWeightPerYear = async (req, res) => {
  try {
    const { error, value } = monthlyTotalWeightPerYearSchema.validate(
      req.query
    );
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const { startYear, endYear } = value;

    const monthlyTotalWeight = await Order.aggregate([
      { $unwind: "$trashDetail" },
      {
        $group: {
          _id: {
            year: { $year: "$orderDate" },
            month: { $month: "$orderDate" },
          },
          sumWeight: { $sum: "$trashDetail.category" },
        },
      },
      {
        $match: { "_id.year": { $gte: startYear, $lte: endYear } },
      },
    ]);
    const result = {};

    monthlyTotalWeight.forEach((item) => {
      if (result.hasOwnProperty(item._id.year)) {
        result[item._id.year][item._id.month] = item.sumWeight;
      } else {
        result[item._id.year] = { [item._id.month]: item.sumWeight };
      }
    });

    Object.keys(result).forEach((year) => {
      for (let month = 1; month <= 12; month++) {
        if (!result[year].hasOwnProperty(month)) {
          result[year][month] = 0;
        }
      }
    });

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

module.exports = { monthlyTotalWeightPerYear };
