const { Todo } = require('../models');

module.exports = {

  get: async function () {
    return await Todo.findAll({});
  },

  create: async function (data) {
    return await Todo.create({
      message: data.message,
      completed: false,
    });
  },

  delete: async function (id) {
    return await Todo.destroy({
      where: {
        id: id
      }
    });
  },

};
