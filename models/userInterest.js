const { DataTypes } = require('sequelize');
const connection = require('../db/connection');
const EventCategory = require('./eventCategory');

const UserInterest = connection.define('user_interest', {
    userId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        foreignKey: 'parent_id',
        validate: {
            notEmpty: {
                msg: 'Please enter userId!'
            }
        }
    },
});

UserInterest.belongsTo(EventCategory);

module.exports = UserInterest;