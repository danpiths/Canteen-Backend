const CartModel = require('../../models/Cart');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const getCurrentUserCart = async (req, res) => {
  if (req.user.role === 'admin') {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: 'Admin cannot have a cart' });
  }
  const userCart = await CartModel.findOne({ user: req.user.userId });
  if (!userCart) {
    throw new Errors.NotFoundError(`No cart with userId ${id}`);
  }
  res.status(StatusCodes.OK).json({ userCart });
};

module.exports = getCurrentUserCart;
