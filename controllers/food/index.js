const createFood = require('./createFood');
const deleteFood = require('./deleteFood');
const getAllFood = require('./getAllFood');
const getSingleFood = require('./getSingleFood');
const updateFood = require('./updateFood');
const uploadImage = require('./uploadImage');
const getFoodBySlug = require('./getFoodBySlug');

module.exports = {
  createFood,
  deleteFood,
  getAllFood,
  getSingleFood,
  getFoodBySlug,
  updateFood,
  uploadImage,
};
