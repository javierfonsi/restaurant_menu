const express = require('express')

const { 
    getAllAdminUser,
    getAdminUserById,
    postAdminUser, 
    patchAdminUserById,
    deleteAdminUserById
} = require('../controllers/adminusers.controller')


const router = express.Router()

router.get('/', getAllAdminUser)

router.get('/:id', getAdminUserById)

router.post('/', postAdminUser)

router.patch('/:id', patchAdminUserById)

router.delete('/:id', deleteAdminUserById)

module.exports = { adminUsersRouter : router}