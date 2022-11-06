const CategoryModel = require('../../models/Category');
const { StatusCodes } = require('http-status-codes');

const createCategory = async (req, res) => {
  const category = await CategoryModel.create({ ...req.body });
  return res.status(StatusCodes.CREATED).json({ category });
};

module.exports = createCategory;
