const Learning = require("../../models/Learning");

const listLearning = async (req, res) => {
  try {
    const result = await Learning.find({});
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

module.exports = { listLearning };
