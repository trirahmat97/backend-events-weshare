const Sequelize = require('sequelize');
require('sequelize-hierarchy')(Sequelize);
const config = require('../utils/config');
const connection = new Sequelize(config.dbname, config.dbusername, config.dbpassword, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = connection;