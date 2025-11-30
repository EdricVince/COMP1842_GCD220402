const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Register model
require('./api/models/todoListModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register routes
const routes = require('./api/routes/todoListRoutes');
routes(app);

// Start server
app.listen(port, () => {
  console.log(`todo list RESTful API server started on: ${port}`);
});
