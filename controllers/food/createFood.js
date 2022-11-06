const FoodModel = require('../../models/Food');
const { StatusCodes } = require('http-status-codes');

const createFood = async (req, res) => {
  const food = await FoodModel.create({ ...req.body });
  return res.status(StatusCodes.CREATED).json({ food });
};

module.exports = createFood;
