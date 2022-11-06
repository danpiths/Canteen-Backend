const { StatusCodes } = require('http-status-codes');
const UserModel = require('../../models/User');
const JWT = require('../../utils/jwt');
const createCart = require('../cart/createCart');
const Errors = require('../../errors');

const register = async (req, res) => {
  const isFirstAccount = (await UserModel.countDocuments({})) === 0;
  let user;
  let cart;

  if (isFirstAccount) {
    user = await UserModel.create({ ...req.body, role: 'admin' });
  } else {
    const emailAlreadyExists = await UserModel.findOne({
      email: req.body.email,
    });
    if (emailAlreadyExists) {
      throw new Errors.BadRequestError('Email already exists');
    }

    user = await UserModel.create({ ...req.body, role: 'user' });
    cart = await createCart(req, res, user._id);
  }

  const userPayload = { userId: user._id, name: user.name, role: user.role };
  JWT.createJWT(res, userPayload);

  return res.status(StatusCodes.CREATED).json({ user: userPayload, cart });
};

module.exports = register;
