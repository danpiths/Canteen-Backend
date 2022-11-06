const OrderModel = require('../../models/Order');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const getCurrentUserOrders = async (req, res) => {
  if (req.user.role === 'admin') {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: 'Admin cannot have orders' });
  }
  const userOrders = await OrderModel.find({ userId: req.user.userId });
  if (!userOrders) {
    throw new Errors.NotFoundError(`No orders with userId ${id}`);
  }
  res.status(StatusCodes.OK).json({ userOrders, count: userOrders.length });
};

module.exports = getCurrentUserOrders;
