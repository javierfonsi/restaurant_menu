const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/AppError');
const { Employed } = require('../models/employusers.models');

exports.getEmployUserById = catchAsync(async (req, res, next) => {
   const { id } = req.params;
   const employ = await Employed.findOne({ where: { id, status: 'active' } });
   if (!employ) {
      return next(new AppError(404, 'Employ is not found.'));
   }
   res.status(200).json({
      status: 'Success',
      data: { employ }
   });
});

exports.createEmployedUser = catchAsync(async (req, res, next) => {
   const { name, lastName, email, password, phone, role } = req.body;
   if (
      !name ||
      !lastName ||
      !email ||
      !password ||
      !phone ||
      !role ||
      name.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      phone.length === 0 ||
      role.length === 0
   ) {
      return next(
         new AppError(400, 'Some properties and/or their values are incorrect.')
      );
   }
   console.log('ok');
   const employed = await Employed.create({
      name,
      lastName,
      email,
      password,
      phone,
      role
   });
   res.status(201).json({
      status: 'Success',
      data: { employed }
   });
});
