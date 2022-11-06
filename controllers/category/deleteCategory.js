const CategoryModel = require('../../models/Category');
const FoodModel = require('../../models/Food');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');
const fs = require('fs');
const path = require('path');

const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const food = await FoodModel.find({ category: categoryId });
  food.length &&
    food.forEach(async foodItem => {
      const imagePath = path.join(
        __dirname,
        '../../public/uploads/food/' + `${foodItem._id}.jpg`
      );
      fs.existsSync(imagePath) && fs.unlinkSync(imagePath);
      await foodItem.remove();
    });
  const category = await CategoryModel.findOne({ _id: categoryId });
  if (!category) {
    throw new Errors.NotFoundError(`No category with id ${categoryId}`);
  }
  const imagePath = path.join(
    __dirname,
    '../../public/uploads/category/' + `${category._id}.jpg`
  );
  fs.existsSync(imagePath) && fs.unlinkSync(imagePath);
  await category.remove();
  res.status(StatusCodes.OK).send();
};

module.exports = deleteCategory;
