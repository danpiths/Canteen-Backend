const { StatusCodes } = require('http-status-codes');

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 10),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
  return res.status(StatusCodes.OK).send();
};

module.exports = logout;
