const Errors = require('../errors');
const JWT = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    console.log('no token')
    throw new Errors.UnauthenticatedError(
      'Not allowed to access authenticated route'
    );
  }
  try {
    const { iat, exp, ...payload } = JWT.verifyJWT(token);
    req.user = payload;
    next();
  } catch (error) {
    console.log('invalid jwt')
    throw new Errors.UnauthenticatedError(
      'Not allowed to access authenticated route'
    );
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Errors.ForbiddenError('Access Restricted');
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
