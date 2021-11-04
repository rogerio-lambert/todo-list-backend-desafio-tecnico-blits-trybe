const moment = require('moment');

const tasksModel = require('../models/tasksModel');

const validateTaskChange = async (userId, taskId) => {
  const task = await tasksModel.findById(taskId);
  if (!task) {
    return { error: 'not find', check: false };
  }
  const { userId: id } = task;
  if (userId !== id) {
    return { error: 'not allowed', check: false };
  }
  return { check:true };
}

//---------------------------------------------/---------------------------------------------------------------//

const create = async (userId, content) => {
  const timeStamp = moment().format('DD-MM-YY HH:mm:ss');
  const status = 'pendente';
  const task = await tasksModel.create({ userId, content, status, timeStamp })
  return { task };
};

//---------------------------------------------/---------------------------------------------------------------//

const update = async (userId, taskId,  content, status) => {
  const { error, check } = await validateTaskChange(userId, taskId);
  if (!check) {
    return { error };
  }
  const updatedTask = await tasksModel.update({ taskId,  content, status });
  return { task: updatedTask };
};

//---------------------------------------------/---------------------------------------------------------------//

const remove = async (userId, taskId) => {
  const { error, check } = await validateTaskChange(userId, taskId);
  if (!check) {
    return { error };
  }
  await tasksModel.remove({ taskId });
  return { check: true };
};

//---------------------------------------------/---------------------------------------------------------------//

const getAll = async () => {
  const tasks = await tasksModel.getAll();
  return { tasks };
};

module.exports = { create, update, remove, getAll };