const { DataTypes } = require('sequelize');
const connection = require('../db/connection');
const Event = connection.define('event', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter userId'
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter name'
            }
        }
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter location'
            }
        }
    },
    lat: DataTypes.STRING,
    long: DataTypes.STRING
}, {
    timestamps: true
});


module.exports = Event;