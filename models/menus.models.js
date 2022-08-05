const { sequelize } = require('../util/database')
const { DataTypes } = require('sequelize')

const Menu = sequelize.define('menu', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    price:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    status:{
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active'
    }
})

module.exports = { Menu }