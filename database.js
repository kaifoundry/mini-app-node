const { Sequelize } = require("sequelize");

// mainnet
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: "DDateoiyys2331Z&hh",
    database: 'mini'
  });

  // local

  // const sequelize = new Sequelize({
  //   dialect: 'postgres',
  //   host: 'localhost',
  //   port: '5432',
  //   username: 'postgres',
  //   password: "pg123",
  //   database: 'mini'
  // });
  
  
  module.exports = sequelize;