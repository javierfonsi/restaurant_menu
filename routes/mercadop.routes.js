const express = require('express');

const { mercadoPagoF } = require('../controllers/mercadopago');


const router = express.Router();

router.post('/checkout', mercadoPagoF)

module.exports = {mercadoPRouter: router}