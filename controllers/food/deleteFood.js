const FoodModel = require('../../models/Food');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');
const fs = require('fs');
const path = require('path');

const deleteFood = async (req, res) => {
  const { id: foodId } = req.params;
  const food = await FoodModel.findOne({ _id: foodId });
  if (!food) {
    throw new Errors.NotFoundError(`No food with id ${foodId}`);
  }
  const imagePath = path.join(
    __dirname,
    '../../public/uploads/food/' + `${food._id}.jpg`
  );
  fs.existsSync(imagePath) && fs.unlinkSync(imagePath);
  await food.remove();
  res.status(StatusCodes.OK).send();
};

module.exports = deleteFood;
