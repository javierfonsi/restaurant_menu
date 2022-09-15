const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors');
const path = require('path')

const bodyParser = require('body-parser');

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');


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
                "url":"https://restaurant-jrfl.herokuapp.com/",
                "description": "Production server pruebas"
            }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`]
}

//init server
const app = express()

//import json to receive requirements in json format
app.use(express.json())

//enable multipart form/data incoming data (to receive file)
express.urlencoded({ extended: true });

//Enable cors
app.use('*', cors());


//enable bodyParser Jorge start here
app.use(bodyParser.urlencoded({ extended: false }))

// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-35012339454778-091508-bd62a0a4030da7d9b01193138f772ede-1198841254'
  });

//routes
app.post('/checkout', (req, res) => {
// Crea un objeto de preferencia
let preference = {
    items: [
      {
        title:req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      }
    ]
  };
  
  mercadopago.preferences.create(preference)
  .then(function(response){
  
    res.redirect(response.body.init_point);
   
  }).catch(function(error){
    console.log(error);
  });
});

//end Jorge

app.use('/api/v1/menus', menusRouter)
//app.post('/api/v1/checkout', checkout)
app.use('/api/v1/adminuser', adminUsersRouter)
app.use('/api/v1/employed', employedUsersRouter)
app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use('*', (req, res, next) => {
    next(new AppError(404, "The `${req.originalUrl}` does not found in this server."))
})

app.use(globalErrorHandler)

module.exports = { app }

//viejos
//DB_HOSTNAME=ec2-54-225-234-165.compute-1.amazonaws.com
//DB_NAME=d4umd3kcelodj4
//DB_USERNAME=jjrmwaqcfihpvs
//DB_PASSWORD=8e916500305e8862a0e4401fca65cc1e7aaea3c28d163c9d2f10579d8bcb7c70

//----JWT
//JWT_SECRET=desaRRolloEJJJ
//JWT_EXPIRE_IN=12h

// servidor nuevo prueba no sirve por ahora
//DB_HOSTNAME=ec2-44-194-92-192.compute-1.amazonaws.com
//DB_NAME=dekdq3l68uociq
//DB_USERNAME=ggxyfaqaibbyaa
//DB_PASSWORD=e77f9748d7b750647df7c4368dc3d0ae7017bebac17d4398cc896a2ad0e260be

//----JWT
//JWT_SECRET=desaRRolloEJJJ
//JWT_EXPIRE_IN=12h


//Firebase credential last work ok
//FIREBASE_API_KEY=AIzaSyBShLh051G1x8y5OeTpyLX40O6TyXh0-50
//FIREBASE_AUTH_DOMAIN=example-a6b4e.firebaseapp.com
//FIREBASE_PROJECT_ID=example-a6b4e
//FIREBASE_STORAGE_BUCKET=example-a6b4e.appspot.com
//FIREBASE_MESSAGING_SENDER_ID=408231399471
//FIREBASE_APP_ID=1:408231399471:web:59b3fc781c8a5b097ff6da


//Proyecto Jorge No Tocar branch main
//DB_HOSTNAME=ec2-18-208-55-135.compute-1.amazonaws.com
//DB_NAME=df00ps5ovi2jmr
//DB_USERNAME=chgxtaivjlfsrk
//DB_PASSWORD=0f2425c905c1cf83e4eea839652e283158b9404e27b75e19eb9bd636dab696eb
