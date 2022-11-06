const FoodModel = require('../../models/Food');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const deleteFood = async (req, res) => {
  const { id: foodId } = req.params;
  const food = await FoodModel.findOne({ _id: foodId });
  if (!food) {
    throw new Errors.NotFoundError(`No food with id ${foodId}`);
  }
  await food.remove();
  res.status(StatusCodes.OK).send();
};

module.exports = deleteFood;
