// Models
//const { Adminuser } = require('../models/adminusers.models');
const { Menu } = require('../models/menus.models');
// Utils
const { AppError } = require('../util/AppError');
const { catchAsync } = require('../util/catchAsync');

exports.menuExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const menu = await Menu.findOne({
    //attributes: { exclude: ['password'] },
    where: { id, status: 'active' }
  });

  if (!menu) {
    return next(new AppError(404, `The selected menu id ${id} was not found`));
  }

  req.menu = menu;
  next();
});
