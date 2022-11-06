const UserModel = require('../../models/User');
const Errors = require('../../errors');
const { StatusCodes } = require('http-status-codes');
const checkPermissions = require('../../utils/checkPermissions');

const getSingleUser = async (req, res) => {
  const user = await UserModel.findOne({
    _id: req.params.id,
    role: 'user',
  }).select('-password');
  if (!user) {
    throw new Errors.NotFoundError(`No user with id ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  return res.status(StatusCodes.OK).json({ user });
};

module.exports = getSingleUser;
