const Errors = require('../errors');

const checkPermissions = (reqUser, resourceId) => {
  if (reqUser.role === 'admin') return;
  if (reqUser.userId === resourceId.toString()) return;
  throw new Errors.ForbiddenError('Access Restricted');
};

module.exports = checkPermissions;
