const CategoryModel = require('../../models/Category');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const getSingleCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const category = await CategoryModel.findOne({ _id: categoryId });
  if (!category) {
    throw new Errors.NotFoundError(`No category with id ${categoryId}`);
  }
  res.status(StatusCodes.OK).json({ category });
};

module.exports = getSingleCategory;
