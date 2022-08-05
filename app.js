const express = require('express')

const { globalErrorHandler } = require('./controllers/globalErrorHandler')
const { menusRouter } = require('./routes/menus.routes')
const { adminUsersRouter } = require('./routes/adminusers.routes')
const { AppError } = require('./util/AppError')

const app = express()

app.use(express.json())
app.use('/api/v1/menus', menusRouter)
app.use('/api/v1/adminuser', adminUsersRouter)
app.use('*', (req,res,next) => {
    next(new AppError(404, "The `${req.originalUrl}` does not found in this server."))
})

app.use(globalErrorHandler)
//app.use((err, req, res, next) => {
//    res.status(err.statusCode).json({
//        status: err.status,
//        message: err.message,
//        stack: err.stack
//    })
//})

module.exports = { app }