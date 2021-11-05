const express = require('express');
const bodyParser = require('body-parser');
const usersRouters = require('../routers/usersRouter');
const tasksRouters = require('../routers/tasksRouter');
const cors = require('cors');

const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use('/tasks', tasksRouters);
app.use('/users', usersRouters);


module.exports = app;