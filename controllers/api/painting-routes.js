const { Todo } = require('../../models');
//code needs to be changed to be painting instead of todo.
//alex created this with syntax im not familiar with, if you wanna change it to have the methods separate from the module.exports, feel free. 
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
