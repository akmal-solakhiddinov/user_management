const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('user_management', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastLogin: {
        type: DataTypes.DATE
    },
    regestrationTime: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: DataTypes.ENUM('active', 'blocked'),
        defaultValue: 'active'
    }
});

User.sync();

module.exports = User;
