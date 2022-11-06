const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');
const authController = require('../middleware/authentication');

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(
    authController.authenticateUser,
    authController.authorizePermissions('admin'),
    categoryController.createCategory
  );

router
  .route('/uploadImage/:id')
  .post(
    authController.authenticateUser,
    authController.authorizePermissions('admin'),
    categoryController.uploadImage
  );

router.route('/slug/:slug').get(categoryController.getCategoryBySlug);

router
  .route('/:id')
  .get(categoryController.getSingleCategory)
  .patch(
    authController.authenticateUser,
    authController.authorizePermissions('admin'),
    categoryController.updateCategory
  )
  .delete(
    authController.authenticateUser,
    authController.authorizePermissions('admin'),
    categoryController.deleteCategory
  );

module.exports = router;
