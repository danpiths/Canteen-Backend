const FoodModel = require('../../models/Food');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const getAllFood = async (req, res) => {
  const { slug } = req.params;
  const food = await FoodModel.find({ slug });
  if (!food) {
    throw new Errors.NotFoundError(`No food with slug ${slug}`);
  }
  res.status(StatusCodes.OK).json({ food });
};

module.exports = getAllFood;
