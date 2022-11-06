const CategoryModel = require("../../models/Category");
const { StatusCodes } = require("http-status-codes");

const getAllCategories = async (req, res) => {
  const categories = await CategoryModel.find({});
  res.status(StatusCodes.OK).json({ categories, count: categories.length });
};

module.exports = getAllCategories;
