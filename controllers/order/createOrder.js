const OrderModel = require('../../models/Order');
const { StatusCodes } = require('http-status-codes');

const createOrder = async (req, res) => {
  req.body.userId = req.user.userId;
  const order = await OrderModel.create({ ...req.body });
  return res.status(StatusCodes.CREATED).json({ order });
};

module.exports = createOrder;
