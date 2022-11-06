const JWT = require('jsonwebtoken');

const createJWT = (res, payload) => {
  const token = JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: 'none',
  });
};

const verifyJWT = token => {
  return JWT.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  createJWT,
  verifyJWT,
};
