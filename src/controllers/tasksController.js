const tasksService = require('../services/tasksService')

//---------------------------------------------/---------------------------------------------------------------//

const create = async (req, res) => {
  const { content } = req.body;
  const { user } = req;
  if (!content) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const { task } = await tasksService.create(user.id, content);
  return res.status(201).json({ task });
};

//---------------------------------------------/---------------------------------------------------------------//

const update = async (req, res) => {
  const { id: taskId } = req.params;
  const { content, status } = req.body;
  const { user } = req;
  const task = await tasksService.update(user.id, taskId,  content, status);
  return res.status(201).json({ task });
};

//---------------------------------------------/---------------------------------------------------------------//

const remove = async (req, res) => {
  const { id: taskId } = req.params;
  const { user } = req;
  await tasksService.remove(user._id, taskId);
  return res.status(200).send();
};

//---------------------------------------------/---------------------------------------------------------------//

const getAll = async (req, res) => {
  const tasks = await tasksService.getAll();
  return res.status(200).json(tasks);
};

//---------------------------------------------/---------------------------------------------------------------//

module.exports = { create, update, remove, getAll };