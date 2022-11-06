const CategoryModel = require('../../models/Category');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const getCategoryBySlug = async (req, res) => {
  const { slug } = req.params;
  console.log(slug);
  const categories = await CategoryModel.find({ slug });
  if (!categories) {
    throw new Errors.NotFoundError(`No category with slug ${slug}`);
  }
  res.status(StatusCodes.OK).json({ categories });
};

module.exports = getCategoryBySlug;
