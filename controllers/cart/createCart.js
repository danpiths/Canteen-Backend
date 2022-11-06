const CartModel = require('../../models/Cart');
const { StatusCodes } = require('http-status-codes');

const createCart = async (req, res, userId) => {
  req.body.userId = userId;
  const cart = await CartModel.create({ ...req.body });
  return cart;
};

module.exports = createCart;
