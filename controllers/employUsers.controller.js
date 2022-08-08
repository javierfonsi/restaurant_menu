const { catchAsync } = require('../util/catchAsync')
const { AppError } = require('../util/AppError')
const { Employ } = require('../models/employusers.models')



exports.getEmployUserById = ( catchAsync (async (req, res, next) =>{
    const { id } = req.params
    const employ = await Employ.findOne({where: { id, status:'active'}})
    if(!employ){
        return next(new AppError(404, 'Employ is not found.'))
    }
    res.status(200).json({
        status: 'Success',
        data: { employ }
    })
}))