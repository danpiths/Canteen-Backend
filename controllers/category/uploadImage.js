const CategoryModel = require('../../models/Category');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImage = async (req, res) => {
  const { id: categoryId } = req.params;
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
    '../../public/uploads/category/' + `${categoryId}.jpg`
  );
  await productImage.mv(imagePath);

  const result = await cloudinary.uploader.upload(imagePath, {
    use_filename: true,
    overwrite: true,
    resource_type: 'image',
    folder: 'canteen-backend/category',
  });

  fs.unlinkSync(imagePath);

  const category = await CategoryModel.findOne({ _id: categoryId });
  if (!category) {
    throw new Errors.NotFoundError(`No category with id ${categoryId}`);
  }
  category.image = result.secure_url;
  await category.save();

  res.status(StatusCodes.OK).json({
    msg: 'Successfully Uploaded Image!',
    image: {
      src: result.secure_url,
    },
  });
};

module.exports = uploadImage;
