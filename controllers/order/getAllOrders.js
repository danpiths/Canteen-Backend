const OrderModel = require("../../models/Order");
const { StatusCodes } = require("http-status-codes");

const getAllOrders = async (req, res) => {
  const orders = await OrderModel.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

module.exports = getAllOrders;
