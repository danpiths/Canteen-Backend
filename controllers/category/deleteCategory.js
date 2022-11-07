const CategoryModel = require('../../models/Category');
const FoodModel = require('../../models/Food');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');
const cloudinary = require('cloudinary').v2;

const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const food = await FoodModel.find({ category: categoryId });
  food.length &&
    food.forEach(async foodItem => {
      foodItem.image !== '/uploads/food/default.jpg' &&
        (await cloudinary.uploader.destroy(
          `canteen-backend/food/${foodItem._id}`,
          {
            resource_type: 'image',
          }
        ));
      await foodItem.remove();
    });
  const category = await CategoryModel.findOne({ _id: categoryId });
  if (!category) {
    throw new Errors.NotFoundError(`No category with id ${categoryId}`);
  }
  category.image !== '/uploads/category/default.jpg' &&
    (await cloudinary.uploader.destroy(
      `canteen-backend/category/${category._id}`,
      { resource_type: 'image' }
    ));
  await category.remove();
  res.status(StatusCodes.OK).send();
};

module.exports = deleteCategory;
