const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const sequelize = new Sequelize({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    port: 5432,
    dialect: 'postgres',
    logging: false,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
})

module.exports = {sequelize}

//DB local
//const sequelize = new Sequelize({
//    host: 'localhost',
//    database: 'RestaurantMenu',
//    username: 'postgres',
//    password: '1234',
//    dialect: 'postgres',
//    port: 5432
//})

//Config var locals
//DB_HOST=localhost
//DB_NAME=RestaurantMenu
//DB_USERNAME=postgres
//DB_PASSWORD=1234