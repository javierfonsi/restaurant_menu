const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')

const { globalErrorHandler } = require('./controllers/globalErrorHandler')
const { AppError } = require('./util/AppError')
const { menusRouter } = require('./routes/menus.routes')
const { adminUsersRouter } = require('./routes/adminusers.routes')
const { employedUsersRouter} = require('./routes/employusers.routes')

//swagger
const swaggerSpec = {
    definition:{
        openapi: '3.0.3',
        info: {
            title: "Your fastMenu API",
            description: "This is a simple  orders delivery  restaurant store server, based on the OpenAPI 3.0 specification.  The user select a menu and perform their pay, then the order is maken in the kitchen and finally the menu is delivered.", 
            contact: {
                "name": "Javier Rodrigo Fonseca Leal",
                "url": "https://portafolio-javierfonseca.netlify.app/",
                "email": "javierrfl1985@gmail.com"
              },
            version: "1.0.0"
        },
        servers: [
            {
                url:"http://localhost:4000"
            }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`]
}
const app = express()

app.use(express.json())
app.use('/api/v1/menus', menusRouter)
app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use('/api/v1/adminuser', adminUsersRouter)
app.use('/api/v1/employed', employedUsersRouter)
app.use('*', (req, res, next) => {
    next(new AppError(404, "The `${req.originalUrl}` does not found in this server."))
})

app.use(globalErrorHandler)


module.exports = { app }






