const router = require('express').Router();
const todoController = require('../controllers/todo.controller');

const todoRoutes = {
 
  create: function (req, res) {
    try {
      todoController.create({
        message: req.body.message,
      });

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  delete: function (req, res) {
    try {
      todoController.delete(req.body.id);

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
};

module.exports = todoRoutes;
