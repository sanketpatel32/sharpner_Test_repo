const Sequelize = require('sequelize');

const sequelize = new Sequelize('sharpner', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
