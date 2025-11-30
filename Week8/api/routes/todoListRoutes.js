module.exports = function(app) {
  const todoList = require('../controllers/todoListController');

  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);
};
