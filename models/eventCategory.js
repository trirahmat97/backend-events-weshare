const { DataTypes } = require('sequelize');
const connection = require('../db/connection');

const EventCategory = connection.define('event_category', {
    name: {
        type: DataTypes.STRING(125),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter name!'
            }
        }
    },
    icon: DataTypes.STRING(125),
    pathIcon: DataTypes.STRING(125),
    description: DataTypes.TEXT,
    parent_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    }
});

EventCategory.hasMany(EventCategory, {
    foreignKey: 'parent_id',
    as: 'Child'
});
EventCategory.hasMany(EventCategory, {
    foreignKey: 'parent_id',
    as: 'Child2'
});

module.exports = EventCategory;