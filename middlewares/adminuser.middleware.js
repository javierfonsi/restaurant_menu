// Models
const { Adminuser } = require('../models/adminusers.models');
// Utils
const { AppError } = require('../util/AppError');
const { catchAsync } = require('../util/catchAsync');

exports.adminUserExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const adminUser = await Adminuser.findOne({
    attributes: { exclude: ['password'] },
    where: { id, status: 'active' }
  });

  if (!adminUser) {
    return next(new AppError(404, `The id ${id} selected was not found`));
  }

  req.user = adminUser;
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;

  if (currentUser.id !== +id) {
    return next(new AppError(403, `You can't update or delete other users accounts`));
  }

  next();
});