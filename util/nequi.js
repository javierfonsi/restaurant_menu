//var nequiClient = require('nequi')('Your Access Key', 'Your Secret Key', 'Your API Key');

dotenv.config({ path: './config.env' });

//ACCESS_KEY
//SECRET_KEY
//API_KEY

let nequiClient = require('nequi')(process.env.ACCESS_KEY, process.env.SECRET_KEY, process.env.API_KEY);

let payment = await nequiClient.pushPayments.create({
  phoneNumber: '3009871234',
  code: '1',
  value: '5000'
});