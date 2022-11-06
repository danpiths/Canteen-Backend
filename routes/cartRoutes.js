const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart');
const authController = require('../middleware/authentication');

router
  .route('/myCart')
  .get(authController.authenticateUser, cartController.getCurrentUserCart);

router
  .route('/clearCart')
  .patch(authController.authenticateUser, cartController.clearCart);

router
  .route('/updateCart')
  .patch(authController.authenticateUser, cartController.updateCart);

module.exports = router;
