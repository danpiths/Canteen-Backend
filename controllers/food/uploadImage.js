const FoodModel = require('../../models/Food');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImage = async (req, res) => {
  const { id: foodId } = req.params;
  if (!req.files) {
    throw new Errors.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new Errors.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new Errors.BadRequestError('Please upload image smaller than 1MB');
  }

  const imagePath = path.join(
    __dirname,
    '../../public/uploads/food/' + `${foodId}.jpg`
  );
  await productImage.mv(imagePath);

  const result = await cloudinary.uploader.upload(imagePath, {
    use_filename: true,
    unique_filename: true,
    resource_type: 'image',
    folder: 'canteen-backend/food',
  });

  fs.unlinkSync(imagePath);

  const food = await FoodModel.findOne({ _id: foodId });
  if (!food) {
    throw new Errors.NotFoundError(`No food with id ${foodId}`);
  }
  food.image = result.secure_url;
  await food.save();

  res.status(StatusCodes.OK).json({
    msg: 'Successfully Uploaded Image!',
    image: {
      src: result.secure_url,
    },
  });
};

module.exports = uploadImage;
