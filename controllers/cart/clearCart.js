const CartModel = require('../../models/Cart');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const clearCart = async (req, res) => {
  const cart = await CartModel.findOne({ userId: req.user.userId });
  if (!cart) {
    throw new Errors.NotFoundError(`No cart with userId ${id}`);
  }
  cart.totalPrice = 0;
  cart.cartItems = [];
  await cart.save();
  res.status(StatusCodes.OK).json({ cart });
};

module.exports = clearCart;
