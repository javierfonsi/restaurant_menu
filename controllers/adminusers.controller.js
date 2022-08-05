const bcrypt = require('bcryptjs')

const { Adminuser } = require('../models/adminusers.models')
const { catchAsync} = require('../util/catchAsync')
const { AppError } = require('../util/AppError')
const { filterObject } = require('../util/filterObject')

exports.getAllAdminUser = async (req, res) =>{
    try {
        const allAdminUser = await Adminuser.findAll({where: { status: 'active'}})
        if(!allAdminUser) {
            res.status(204).json({
                status: 'Success',
                message: 'There are not adminUsers until.'
        })
        return
        }
        
        res.status(200).json({
            status: 'Success',
            data: {allAdminUser}
        })

        } catch (error) {
            console.log(error);
        }
} 

exports.getAdminUserById = async (req, res) => {
    const { id } = req. params
    const adminUser = await Adminuser.findOne({where: { id, status:'active'}})
    if(!adminUser){
        res.status(404).json({
            status: 'Error',
            message: 'The delivered Id was not found.'
        })
        return
    }
    adminUser.password = undefined
    res.status(201).json({
        status:'Success',
        data: { adminUser }
    })
}

exports.postAdminUser = async (req,res) => {
    try {
        const { name, email, password } = req.body
        if(!name || !email || !password || name.length===0 || email.length===0 || password.length===0){
            res.status(400).json({
                status: 'Error',
                message: 'Some properties and/or their values are inconrrect.'
            })
            return
        }

        const salt = await bcrypt.genSaltSync(12)
        const hashpassword = await bcrypt.hash(password, salt)
        
        const adminUser = await Adminuser.create({
            name,
            email,
            password: hashpassword
        })

        adminUser.password= undefined
        res.status(201).json({
            status: 'Success',
            data: { adminUser }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.patchAdminUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const adminuser = await Adminuser.findOne({ where: {id, status:'active'}})
    if(!adminuser){
        return next(new AppError(404, 'The delivered id was not found.'))
    }
    const data = filterObject(req.body, "name", "email")
    await adminuser.update({...data, ...req.Body})
    res.status(204).json({status:'Success'})
}) 




















































exports.deleteAdminUserById = catchAsync(async(req, res, next) => {
    const { id } = req.params
    const adminUser = await Adminuser.findOne({ where: {id, status:'active'}})
    if(!adminUser){
        return next(new AppError(404, 'Delivered ID was not found'))
    }

    await adminUser.update({status:'deleted'})
    res.status(204).json({ status:'Success'})



})










