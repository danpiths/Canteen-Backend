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
  food.image !== '/uploads/food/default.jpg' &&
    (await cloudinary.uploader.destroy(`canteen-backend/food/${food._id}`, {
      resource_type: 'image',
    }));
  await food.remove();
  res.status(StatusCodes.OK).send();
};

module.exports = deleteFood;
