const { StatusCodes } = require('http-status-codes');
const UserModel = require('../../models/User');
const Errors = require('../../errors');
const JWT = require('../../utils/jwt');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Errors.BadRequestError('Email or Password missing');
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Errors.UnauthenticatedError('Wrong credentials entered');
  }

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    throw new Errors.UnauthenticatedError('Wrong credentials entered');
  }

  const userPayload = { userId: user._id, name: user.name, role: user.role };
  JWT.createJWT(res, userPayload);

  return res.status(StatusCodes.OK).json({ user: userPayload });
};

module.exports = login;
