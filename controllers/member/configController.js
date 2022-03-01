const { ObjectId } = require("mongodb");

const Config = require("../../models/Config");

const getConfig = async (req, res) => {
  try {
    const result = await Config.findOne({
      _id: ObjectId("621c75f93c618df50496a503"),
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

module.exports = { getConfig };
