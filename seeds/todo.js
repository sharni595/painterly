const { Todo } = require('../models');
const sequelize = require('../config/connection');

const todoData = [
  {
    message: 'Feed Dog',
  },
];

sequelize
  .sync({ force: true })
  .then(() => {
    return Todo.bulkCreate(todoData);
  })
  .then(() => {
    console.log('Todos seeded!');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
