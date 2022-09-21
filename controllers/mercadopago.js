// SDK de Mercado Pago
//const express = require('express')
const mercadopago = require ('mercadopago');
//const bodyParser = require('body-parser');


//init server
//const app = express()
// agrego Jorge MercadoPago
//app.use(bodyParser.urlencoded({ extended: false }))
// fin Jorge MercadoPago

// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-35012339454778-091508-bd62a0a4030da7d9b01193138f772ede-1198841254'
  });

exports.mercadoPagoF = ((req, res) => {  // Crea un objeto de preferencia

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

