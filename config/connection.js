const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize('todo_app', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    query: {
      raw: true
    }
  });

module.exports = sequelize;
