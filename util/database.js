const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("krirea", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  logging: false
});

module.exports = sequelize;
