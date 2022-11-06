const UserModel = require('../../models/User');
const Errors = require('../../errors');
const JWT = require('../../utils/jwt');
const { StatusCodes } = require('http-status-codes');

const updateUser = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    throw new Errors.BadRequestError('Please provide both the values');
  }
  const user = await UserModel.findOne({ _id: req.user.userId });
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    throw new Errors.UnauthenticatedError('Invalid password');
  }
  user.name = name;
  await user.save();
  const userPayload = { userId: user._id, name: user.name, role: user.role };
  JWT.createJWT(res, userPayload);
  res.status(StatusCodes.OK).send();
};

module.exports = updateUser;
