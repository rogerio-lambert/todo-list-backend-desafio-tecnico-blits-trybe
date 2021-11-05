const { ObjectId } = require('mongodb');

const connection = require('./connection');

const collectionName = 'tasks';

//---------------------------------------------/---------------------------------------------------------------//

const renameIdKey = (tasks) => {
  return tasks.map((task) => {
    const { _id, userId, content, status, timeStamp } = task;
    return { id: _id, userId, content, status, timeStamp }
  })
};

//---------------------------------------------/---------------------------------------------------------------//

const getAll = async (userId) => {
  const tasks = await connection()
    .then((db) => db.collection(collectionName).find({ userId: { $eq: userId } }).toArray())
    .then((tasks) => renameIdKey(tasks))
    .catch((err) => console.log(err));
  return tasks;
};

//---------------------------------------------/---------------------------------------------------------------//

const findById = async (id) => {
  const task = await connection()
    .then((db) => db.collection(collectionName).findOne({ _id: { $eq: ObjectId(id) } }))
    .catch((err) => console.log(err));
  return task;
};

//---------------------------------------------/---------------------------------------------------------------//

const remove = async (id) => {
  await connection()
    .then((db) => db.collection(collectionName).deleteOne({ _id: { $eq: ObjectId(id) } }))
    .catch((err) => console.log(err));
};

//---------------------------------------------/---------------------------------------------------------------//

const create = async (taskInfo) => {
  const { userId, content, status, timeStamp } = taskInfo
  const db = await connection();
  const createdTask = await db.collection(collectionName)
    .insertOne({  userId, content, status, timeStamp })
    .then((result) => ({ id: result.insertedId, userId, content, status, timeStamp }))
    .catch((err) => console.log(err));
  return createdTask;
};

//---------------------------------------------/---------------------------------------------------------------//

const update = async (taskInfo) => {
  const { taskId: id,  content, status } = taskInfo;
  const db = await connection();
  await db.collection(collectionName).updateOne({ _id: ObjectId(id) }, { $set: { content, status } })
    .catch((err) => console.log(err));
  return await findById(id)
    .then((task) => renameIdKey([task]));
};

//---------------------------------------------/---------------------------------------------------------------//

module.exports = { getAll, findById, remove, create, update }; 