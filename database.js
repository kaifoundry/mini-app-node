const { Sequelize } = require("sequelize");


const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: "pg123",
    database: 'mini'
  });
  
  module.exports = sequelize;