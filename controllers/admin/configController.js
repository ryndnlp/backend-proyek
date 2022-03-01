const { ObjectId } = require("mongodb");

const Config = require("../../models/Config");

const { updateConfigSchema } = require("../../schemas/admin/configSchemas");

const updateConfig = async (req, res) => {
  try {
    const { error, value } = updateConfigSchema.validate(req.body);
    if (error) {
      const err = { name: error.name, ...error.details[0] };
      throw err;
    }
    const result = await Config.findOneAndUpdate(
      { _id: ObjectId("621c75f93c618df50496a503") },
      { $set: value },
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

module.exports = { updateConfig };
