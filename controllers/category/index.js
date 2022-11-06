const createCategory = require('./createCategory');
const deleteCategory = require('./deleteCategory');
const getAllCategories = require('./getAllCategories');
const getSingleCategory = require('./getSingleCategory');
const updateCategory = require('./updateCategory');
const uploadImage = require('./uploadImage');
const getCategoryBySlug = require('./getCategoryBySlug');

module.exports = {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  getCategoryBySlug,
  updateCategory,
  uploadImage,
};
