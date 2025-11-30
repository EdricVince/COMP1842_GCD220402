const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

exports.list_all_tasks = async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
};

exports.create_a_task = async (req, res) => {
  const newTask = new Task(req.body);
  const task = await newTask.save();
  res.json(task);
};
