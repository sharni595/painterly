const router = require('express').Router();
const todoController = require('../controllers/todo.controller');

const viewRoutes = {

  renderTodos: async function (req, res) {
    try {
      // fetch todos from DB
      let todos = await todoController.get();

      // render todos page w/ todos
      res.render('todos', { todos });
    } catch (error) {
      console.log(error);
    }
  },

  renderHome: function(req, res) {
    try {
      res.render('home');
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = viewRoutes;
