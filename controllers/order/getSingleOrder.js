const OrderModel = require('../../models/Order');
const { StatusCodes } = require('http-status-codes');
const checkPermissions = require('../../utils/checkPermissions');
const Errors = require('../../errors');

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await OrderModel.findOne({ _id: orderId });
  if (!order) {
    throw new Errors.NotFoundError(`No order with id ${orderId}`);
  }
  checkPermissions(req.user, order.userId);
  res.status(StatusCodes.OK).json({ order });
};

module.exports = getSingleOrder;
