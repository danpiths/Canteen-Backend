const FoodModel = require('../../models/Food');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const updateMenu = async (req, res) => {
  const { id: foodId } = req.params;

  const food = await FoodModel.findOne({ _id: foodId });
  if (!food) {
    throw new Errors.NotFoundError(`No food with id ${foodId}`);
  }

  req.body.category && (food.category = req.body.category);
  req.body.name && (food.name = req.body.name);
  req.body.price && (food.price = req.body.price);
  req.body.inStock && (food.inStock = req.body.inStock);
  req.body.description && (food.description = req.body.description);
  req.body.image && (food.image = req.body.image);
  await food.save();

  res.status(StatusCodes.OK).json({ food });
};

module.exports = updateMenu;
