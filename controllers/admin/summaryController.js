const {
  dailyTotalWeightSchema,
  conclusionDashboardSchema,
  dailyTotalPricePerTypeSchema,
  dailyTotalPriceSchema,
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
            $dateToString: { format: "%m-%d-%Y", date: "$orderDate" },
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

const conclusionDashboard = async (req, res) => {
  // try {
  const { error, value } = conclusionDashboardSchema.validate(req.query);
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
          $dateToString: { format: "%m-%d-%Y", date: "$orderDate" },
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
          $dateToString: { format: "%m-%d-%Y", date: "$orderDate" },
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
          $dateToString: { format: "%m-%d-%Y", date: "$orderDate" },
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
      totalWeight: dailyTotalWeight.length ? dailyTotalWeight[0].sumWeight : 0,
      totalFinishedWeight: dailyTotalFinishedWeight.length
        ? dailyTotalFinishedWeight[0].sumWeight
        : 0,
      totalInorganicWeight: dailyTotalInorganicWeight.length
        ? dailyTotalInorganicWeight[0].sumWeight
        : 0,
    },
    monthly: {
      totalWeight: monthlyTotalWeight.length
        ? monthlyTotalWeight[0].sumWeight
        : 0,
      totalFinishedWeight: monthlyTotalFinishedWeight.length
        ? monthlyTotalFinishedWeight[0].sumWeight
        : 0,
      totalInorganicWeight: monthlyTotalInorganicWeight.length
        ? monthlyTotalInorganicWeight[0].sumWeight
        : 0,
    },
  };

  const response = {
    code: 200,
    data: result,
  };
  res.json(response);
  // } catch (err) {
  //   const response = {
  //     code: 400,
  //     error: err,
  //   };
  //   res.status(400).json(response);
  // }
};

const dailyTotalPricePerType = async (req, res) => {
  try {
    const { error, value } = dailyTotalPricePerTypeSchema.validate(req.query);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const { currentDate } = value;
    const nextDay = 1 * 24 * 60 * 60000;

    const pricePerCategory = {
      1: 300,
      2: 600,
      3: 900,
      4: 1200,
      5: 1500,
      6: 2000,
    };

    let result = await Order.aggregate([
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
          _id: "$trashDetail.category",
          count: { $count: {} },
        },
      },
      {
        $addFields: {
          category: "$_id",
        },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { category: 1 },
      },
    ]);

    result = result.map((res) => ({
      category: res.category,
      sumPrice: res.count * pricePerCategory[res.category],
    }));

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

const dailyTotalPrice = async (req, res) => {
  try {
    const { error, value } = dailyTotalPriceSchema.validate(req.query);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const { currentDate } = value;
    const nextDay = 1 * 24 * 60 * 60000;

    const dailyTotalPrice = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: currentDate,
            $lte: new Date(currentDate.getTime() + nextDay),
          },
        },
      },
      { $unwind: "$price" },
      {
        $group: {
          _id: null,
          sumPrice: { $sum: "$price.trashPrice" },
        },
      },
      {
        $project: { _id: 0 },
      },
    ]);

    const matchedOrder = await Order.find({
      orderDate: {
        $gte: currentDate,
        $lte: new Date(currentDate.getTime() + nextDay),
      },
    });

    const dailyTotalTransaction = matchedOrder.reduce(
      (acc, curr) =>
        curr.price.pickUpPrice -
          curr.price.trashPrice -
          curr.price.voucherPrice >
        0
          ? acc +
            (curr.price.pickUpPrice -
              curr.price.trashPrice -
              curr.price.voucherPrice)
          : 0,
      0
    );

    const response = {
      code: 200,
      data: {
        dailyTotalPrice: dailyTotalPrice[0].sumPrice,
        dailyTotalTransaction,
      },
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
  dailyTotalWeight,
  conclusionDashboard,
  dailyTotalPricePerType,
  dailyTotalPrice,
};
