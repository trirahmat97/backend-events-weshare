const { DataTypes } = require('sequelize');
const connection = require('../db/connection');

const Tag = connection.define('tag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter name'
            }
        }
    },
    description: DataTypes.TEXT
});
module.exports = Tag;