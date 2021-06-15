const router = require('express').Router();
const todoRoutes = require('./todo.routes');
const viewRoutes = require('./view.routes');

// API
router
  .post('/api/todos/', todoRoutes.create)
  .delete('/api/todos/', todoRoutes.delete);

// VIEWS
router
  .get('/', viewRoutes.renderHome)
  .get('/todos', viewRoutes.renderTodos);

module.exports = router;
