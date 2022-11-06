const UserModel = require('../../models/User');
const Errors = require('../../errors');
const { StatusCodes } = require('http-status-codes');

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new Errors.BadRequestError(
      'Please provide both the old and new passwords'
    );
  }
  const user = await UserModel.findOne({ _id: req.user.userId });
  const passwordMatch = await user.comparePassword(oldPassword);
  if (!passwordMatch) {
    throw new Errors.UnauthenticatedError('Invalid password');
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).send();
};

module.exports = updateUserPassword;
