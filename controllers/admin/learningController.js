const Learning = require("../../models/Learning");

const { createLearningSchema } = require("../../schemas/admin/learningSchemas");

const createLearning = async (req, res) => {
  try {
    const { error, value } = createLearningSchema.validate(req.body);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const result = await Learning.create(value);

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

module.exports = { createLearning, listLearning };
