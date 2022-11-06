const FoodModel = require('../../models/Food');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const getSingleFood = async (req, res) => {
  const { id: foodId } = req.params;
  const food = await FoodModel.findOne({ _id: foodId });
  if (!food) {
    throw new Errors.NotFoundError(`No food with id ${foodId}`);
  }
  res.status(StatusCodes.OK).json({ food });
};

module.exports = getSingleFood;
