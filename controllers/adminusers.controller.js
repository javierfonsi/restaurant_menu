const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { Adminuser } = require('../models/adminusers.models');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/AppError');
const { filterObject } = require('../util/filterObject');

dotenv.config({ path: './config.env' });

exports.postAdminUser = catchAsync(async (req, res, next) => {
  const { name, lastName, email, password } = req.body;
  if (
    !name ||
    !lastName ||
    !email ||
    !password ||
    name.length === 0 ||
    lastName.length === 0 ||
    email.length === 0 ||
    password.length === 0
  ) {
    return next(
      new AppError(400, 'Some properties and/or their values are inconrrect.')
    );
  }

  const salt = await bcrypt.genSaltSync(12);
  const hashpassword = await bcrypt.hash(password, salt);

  const adminUser = await Adminuser.create({
    name,
    lastName,
    email,
    password: hashpassword
  });

  adminUser.password = undefined;
  res.status(201).json({
    status: 'Success',
    data: { adminUser }
  });
});

exports.loginAdminUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const adminUser = await Adminuser.findOne({
    where: { email, status: 'active' }
  });
  if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
    return next(
      new AppError('400', 'Credential are incorrect, please verify it.')
    );
  }

  //Add JWT
  const token = await jwt.sign({ id: adminUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN
  });

  res.status(200).json({
    status: 'Success',
    data: { token }
  });
});

exports.getAllAdminUser = catchAsync(async (req, res, next) => {
  const allAdminUser = await Adminuser.findAll({ 
    attributes: { exclude: ['password']},
    where: { status: 'active' } 
  });
//  if (!allAdminUser) {
//    return next(new AppError(404, 'There are not adminUsers until.'));
//  }
  res.status(200).json({
    status: 'Success',
    data: { allAdminUser }
  });
});

exports.getAdminUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  //  const { id } = req.params;
  //  const adminUser = await Adminuser.findOne({
  //    where: { id, status: 'active' }
  //  });
  //  if (!adminUser) {
  //    return next(new AppError(404, 'The delivered adminUser Id was not found.'));
  //  }
  user.password = undefined;
  res.status(200).json({
    status: 'Success',
    data: { user }
  });
});

exports.patchAdminUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  //  const { id } = req.params;
  //  const adminuser = await Adminuser.findOne({
  //    where: { id, status: 'active' }
  //  });
  //  if (!adminuser) {
  //    return next(new AppError(404, 'The delivered adminUser id was not found.'));
  //  }
  const data = filterObject(req.body, 'name', 'lastName', 'email', 'password');
  await user.update({ ...data, ...req.Body });
  res.status(201).json({
    status: 'Success',
    message: `The data user with ${user.id} was modified correctly`
  });
});

exports.deleteAdminUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  //  const { id } = req.params;
  //  const adminUser = await Adminuser.findOne({
  //    where: { id, status: 'active' }
  //  });
  //  if (!adminUser) {
  //    return next(new AppError(404, 'Delivered ID was not found'));
  //  }

  await user.update({ status: 'deleted' });
  res.status(201).json({
    status: 'Success',
    message: `The Id ${user.id} was delete correctly`
  });
});
