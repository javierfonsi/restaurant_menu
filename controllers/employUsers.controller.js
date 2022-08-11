const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/AppError');
const { Employed } = require('../models/employusers.models');

dotenv.config({path: './config.env'}) 

exports.getEmployUserById = catchAsync(async (req, res, next) => {
   const { id } = req.params;
   const employ = await Employed.findOne({ where: { id, status: 'unactive' } });
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
   //bcrypt use;
   const salt = await bcrypt.genSalt(12)
   const hashedPassword = await bcrypt.hash(password, salt) 

   const employed = await Employed.create({
      name,
      lastName,
      email,
      password: hashedPassword, 
      phone,
      role
   });
   //Without show password encrypted
   employed.password = undefined
   res.status(201).json({
      status: 'Success',
      data: { employed }
   });   
});


exports.loginEmployedUser = catchAsync (async (req, res, next) => {
   const {email, password} = req.body
   const employed = await Employed.findOne({where: {email, status:'unactive'}})
   if(!employed && (!await bcrypt.compare(password, employed.password))) {
      return next(new AppError('400', 'Credential are incorrect, please verify it.'))
   }

   //Add JWT
   const token = await jwt.sign({id: employed.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE_IN}) 

   res.status(200).json({ 
      status: 'Success',
      data: { token }
     })
})