const { sequelize } = require('../util/database')
const { DataTypes } = require('sequelize')

const Employed = sequelize.define('employed', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active'
    }
})

module.exports = { Employed }