const UserModel = require('../../models/User');
const Errors = require('../../errors');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
  const users = await UserModel.find({ role: 'user' }).select('-password');
  if (users.length === 0) {
    throw new Errors.NotFoundError('No users exist');
  }
  return res.status(StatusCodes.OK).json({ users });
};

module.exports = getAllUsers;
