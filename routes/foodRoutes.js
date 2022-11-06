const express = require('express');
const router = express.Router();

const foodController = require('../controllers/food');
const authController = require('../middleware/authentication');

router
  .route('/')
  .get(foodController.getAllFood)
  .post(
    authController.authenticateUser,
    authController.authorizePermissions('admin'),
    foodController.createFood
  );

router.route('/slug/:slug').get(foodController.getFoodBySlug);

router
  .route('/uploadImage/:id')
  .post(
    authController.authenticateUser,
    authController.authorizePermissions('admin'),
    foodController.uploadImage
  );

router
  .route('/:id')
  .get(foodController.getSingleFood)
  .patch(
    authController.authenticateUser,
    authController.authorizePermissions('admin'),
    foodController.updateFood
  )
  .delete(
    authController.authenticateUser,
    authController.authorizePermissions('admin'),
    foodController.deleteFood
  );

module.exports = router;
