const { catchAsync } = require('../util/catchAsync')
const { AppError } = require('../util/AppError')
const { Menu } = require('../models/menus.models')

//const menus = [ 
//    {id: 1, name: "Estofado de pollo", description: "Delicioso pollo a las finas hiervas", price: "3 Us" },
//    {id: 2, name: "Ceviche de camarón", description: "15 unidades en salsa de la casa", price: "5 Us"},
//    {id: 3, name: "Tamales", description: "Tamales de pollo en salsa esmeralda", price: "0,5 Us"},
//    {id: 4, name: "Cazuela de camarones", description: "Bañados en salsa al ajillo con base de queso", price: "4 Us"},
//    {id: 5, name: "Platanos al vapor", description: "Ricos platanos en salsa preferida de Roberto", price: "3 Us", status: "active" }
//]

exports.getAllMenus = catchAsync( async ( req, res, next) => {
    const menu = await Menu.findAll({where:{status:'active'}})
    res.status(200).json({
        status: 'Success',
        data: {
            menu
        }
    })    
}) 

exports.getMenuById = catchAsync( async (req, res, next) => {
    const { id } = req.params
    const menu = await Menu.findOne({where: {id:id, status:'active'}})
    if(!menu){
        return next (new AppError(404, 'The delivered id was not found'))
    }
    res.status(201).json({
        status: 'Success',
        data:{
            menu
        }
    })
})


exports.postMenu = catchAsync( async (req, res, next) => {
    const { name, description, price } = req.body
    if(!name || !description || !price || name.length===0 || description.length===0 || price.length===0){
        return next (new AppError(400, 'Some properties and/or their values are incorrect, please verify it.'))
    }
    const menu = await Menu.create({
        name,
        description,
        price
    })
    res.status(204).json({ status: 'Success' })
    

})

exports.putMenuById = catchAsync( async (req, res, next) => {
    const { id } = req.params
    const { name, description, price } = req.body
    const menu = await Menu.findOne({where: { id:id, status:'active'}})
    if(!menu){
        return next( new AppError(404, 'The delivered id was not found.'))
    }
    if(!name || !description || !price || name.length===0 ||description.length === 0 || price.length === 0){
        return next( new AppError(400, 'Some properties and/or their are incorrect, please verify it.'))
    }
    res.status(204).json({ status:'Success'})
})

exports.patchMenuById = catchAsync( async (req, res, next) => {
        const { id } = req.params
        const menu = await Menu.findOne({where: {id, status:'active'}})
        if(!menu){
            return next( new AppError(404, 'The delivered id was not found.'))
        }
        await menu.update({...menu, ...req.body})
        res.status(204).json({ status:'Success'})
})

exports.deleteMenuById = catchAsync( async (req, res, next) => {
    const { id } = req.params
    const menu = await Menu.findOne({where:{id, status:'active'}})
    if(!menu){
        return next(new AppError(404, 'The delivered Id was not found.'))
    }
    await menu.update({status: 'deleted'})
    res.status(204).json({
        status:'Success'
    })
}) 