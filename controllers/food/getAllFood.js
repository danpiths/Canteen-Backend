const FoodModel = require('../../models/Food');
const { StatusCodes } = require('http-status-codes');

const getAllFood = async (req, res) => {
  const food = await FoodModel.find({});
  res.status(StatusCodes.OK).json({ food, count: food.length });
};

module.exports = getAllFood;
