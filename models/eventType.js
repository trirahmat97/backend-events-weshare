const { DataTypes } = require('sequelize');
const connection = require('../db/connection');

const EventType = connection.define('event_type', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter userId!'
            }
        }
    },
    type: {
        type: DataTypes.ENUM,
        values: ['online', 'offline']
    }
});

module.exports = EventType;