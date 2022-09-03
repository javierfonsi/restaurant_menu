// Models
const { Adminuser } = require('../models/adminusers.models');
// Utils
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.adminUserExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const adminuser = await Adminuser.findOne({
    attributes: { exclude: ['password'] },
    where: { id, status: 'active' }
  });

  if (!adminuser) {
    return next(new AppError(404, `The id ${id} selected was not found`));
  }

  req.user = adminuser;
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