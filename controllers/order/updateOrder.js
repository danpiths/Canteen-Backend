const OrderModel = require('../../models/Order');
const { StatusCodes } = require('http-status-codes');
const Errors = require('../../errors');

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await OrderModel.findOneAndUpdate(
    { _id: orderId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!order) {
    throw new Errors.NotFoundError(`No order with id ${orderId}`);
  }
  res.status(StatusCodes.OK).json({ order });
};

module.exports = updateOrder;
