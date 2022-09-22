const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors")

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

app.use("*", cors())
//middleware

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




//server

app.listen(3000, () => {
    console.log("Server on port 3000");
});
