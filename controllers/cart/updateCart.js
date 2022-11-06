const CartModel = require('../../models/Cart');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const updateCart = async (req, res) => {
  req.body.userId = req.user.userId;

  const cart = await CartModel.findOneAndUpdate(
    { userId: req.user.userId },
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!cart) {
    throw new Errors.NotFoundError(`No cart with userId ${id}`);
  }

  res.status(StatusCodes.OK).json({ cart });
};

module.exports = updateCart;
