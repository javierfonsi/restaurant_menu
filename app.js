const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors');
const path = require('path')

//controller
const { globalErrorHandler } = require('./controllers/error.controller')

//router
const { menusRouter } = require('./routes/menus.routes')
const { adminUsersRouter } = require('./routes/adminusers.routes')
const { employedUsersRouter} = require('./routes/employusers.routes')

//util
const { AppError } = require('./util/AppError')

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
                "url":"http://localhost:4000",
                "description": "Development server"
            },
            {
                "url":"https://apprestaurantapijr.herokuapp.com/",
                "description": "Production server"
            }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`]
}

//init server
const app = express()

//import json to receive requirements in json format
app.use(express.json())

//Enable cors
app.use('*', cors());

app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use('/api/v1/menus', menusRouter)
app.use('/api/v1/adminuser', adminUsersRouter)
app.use('/api/v1/employed', employedUsersRouter)
app.use('*', (req, res, next) => {
    next(new AppError(404, "The `${req.originalUrl}` does not found in this server."))
})

app.use(globalErrorHandler)

module.exports = { app }



//DB_HOSTNAME=ec2-44-194-92-192.compute-1.amazonaws.com
//DB_NAME=dekdq3l68uociq
//DB_USERNAME=ggxyfaqaibbyaa
//DB_PASSWORD=e77f9748d7b750647df7c4368dc3d0ae7017bebac17d4398cc896a2ad0e260be

//----JWT
//JWT_SECRET=desaRRolloEJJJ
//JWT_EXPIRE_IN=12h