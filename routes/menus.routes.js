const express = require('express')
const router = express.Router()

const { 
    getAllMenus,
    getMenuById,
    postMenu,
    putMenuById,
    patchMenuById,
    deleteMenuById
} = require('../controllers/menus.controller')

router.get('/', getAllMenus)
router.get('/:id', getMenuById)
router.post('/', postMenu)
router.put('/:id', putMenuById)
router.patch('/:id', patchMenuById)
router.delete('/:id', deleteMenuById)

module.exports = { menusRouter : router}