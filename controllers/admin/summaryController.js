const {
  dailyTotalWeightSchema,
  conclusionSchema,
} = require("../../schemas/admin/summarySchemas");

const Order = require("../../models/Order");

const dailyTotalWeight = async (req, res) => {
  try {
    const { error, value } = dailyTotalWeightSchema.validate(req.query);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const { startDate, endDate } = value;

    const result = await Order.aggregate([
      {
        $match: { orderDate: { $gte: startDate, $lte: endDate } },
      },
      { $unwind: "$trashDetail" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%d-%m-%Y", date: "$orderDate" },
          },
          sumWeight: { $sum: "$trashDetail.category" },
        },
      },
      {
        $addFields: {
          orderDate: "$_id",
        },
      },
      {
        $project: { _id: 0, sum: 0 },
      },
      {
        $sort: { orderDate: 1 },
      },
    ]);

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

const conclusion = async (req, res) => {
  try {
    const { error, value } = conclusionSchema.validate(req.query);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const { currentDate } = value;

    const nextDay = 1 * 24 * 60 * 60000;
    const month = currentDate.getMonth() + 1;

    const dailyTotalWeight = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: currentDate,
            $lte: new Date(currentDate.getTime() + nextDay),
          },
        },
      },
      { $unwind: "$trashDetail" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%d-%m-%Y", date: "$orderDate" },
          },
          sumWeight: { $sum: "$trashDetail.category" },
        },
      },
    ]);

    const dailyTotalFinishedWeight = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: currentDate,
            $lte: new Date(currentDate.getTime() + nextDay),
          },
          orderStatus: "FINISH",
        },
      },
      { $unwind: "$trashDetail" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%d-%m-%Y", date: "$orderDate" },
          },
          sumWeight: { $sum: "$trashDetail.category" },
        },
      },
    ]);

    const dailyTotalInorganicWeight = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: currentDate,
            $lte: new Date(currentDate.getTime() + nextDay),
          },
        },
      },
      { $unwind: "$trashDetail" },
      {
        $match: {
          "trashDetail.type": {
            $ne: "Organik",
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%d-%m-%Y", date: "$orderDate" },
          },
          sumWeight: { $sum: "$trashDetail.category" },
        },
      },
    ]);

    const monthlyTotalWeight = await Order.aggregate([
      { $unwind: "$trashDetail" },
      {
        $group: {
          _id: {
            $month: "$orderDate",
          },
          sumWeight: { $sum: "$trashDetail.category" },
        },
      },
      {
        $match: {
          _id: month,
        },
      },
    ]);

    const monthlyTotalFinishedWeight = await Order.aggregate([
      {
        $match: {
          orderStatus: "FINISH",
        },
      },
      { $unwind: "$trashDetail" },
      {
        $group: {
          _id: {
            $month: "$orderDate",
          },
          sumWeight: { $sum: "$trashDetail.category" },
        },
      },
      {
        $match: {
          _id: month,
        },
      },
    ]);

    const monthlyTotalInorganicWeight = await Order.aggregate([
      { $unwind: "$trashDetail" },
      {
        $match: {
          "trashDetail.type": {
            $ne: "Organik",
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$orderDate",
          },
          sumWeight: { $sum: "$trashDetail.category" },
        },
      },
      {
        $match: {
          _id: month,
        },
      },
    ]);

    const result = {
      daily: {
        totalWeight: dailyTotalWeight[0].sumWeight || 0,
        totalFinishedWeight: dailyTotalFinishedWeight[0].sumWeight || 0,
        totalInorganicWeight: dailyTotalInorganicWeight[0].sumWeight || 0,
      },
      monthly: {
        totalWeight: monthlyTotalWeight[0].sumWeight || 0,
        totalFinishedWeight: monthlyTotalFinishedWeight[0].sumWeight || 0,
        totalInorganicWeight: monthlyTotalInorganicWeight[0].sumWeight || 0,
      },
    };

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

module.exports = { dailyTotalWeight, conclusion };
