const tasksService = require('../services/tasksService')

//---------------------------------------------/---------------------------------------------------------------//

const create = async (req, res) => {
  const { content } = req.body;
  const { user } = req;
  // if (!name || !ingredients || !preparation) {
  //   return res.status(400).json({ message: 'Invalid entries. Try again.' });
  // }
  const task = await tasksService.create(user.id, content);
  return res.status(201).json({ task });
};

//---------------------------------------------/---------------------------------------------------------------//

const update = async (req, res) => {
  const { taskId, content, status } = req.body;
  const { user } = req;
  const task = await tasksService.update(user.id, taskId,  content, status);
  return res.status(201).json({ task });
};

//---------------------------------------------/---------------------------------------------------------------//

const remove = async (req, res) => {
  const { taskId } = req.body;
  const { user } = req;
  const task = await tasksService.remove(user.id, taskId);
  return res.status(200).send();
};

//---------------------------------------------/---------------------------------------------------------------//

const getAll = async (req, res) => {
  const tasks = await tasksService.getAll();
  return res.status(200).json(tasks);
};

//---------------------------------------------/---------------------------------------------------------------//

module.exports = { create, update, remove, getAll };