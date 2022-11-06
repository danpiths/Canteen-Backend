const CategoryModel = require('../../models/Category');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const updateCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const { name } = req.body;
  const category = await CategoryModel.findOne({ _id: categoryId });
  if (!category) {
    throw new Errors.NotFoundError(`No category with id ${categoryId}`);
  }
  category.name = name;
  await category.save();
  res.status(StatusCodes.OK).json({ category });
};

module.exports = updateCategory;
