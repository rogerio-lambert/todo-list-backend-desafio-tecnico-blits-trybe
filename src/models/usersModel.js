const connection = require('./connection');

const collectionName = 'users';

//---------------------------------------------/---------------------------------------------------------------//
const findByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection(collectionName).findOne({ email: { $eq: email } }))
    .then((result) => ({ id: result._id, name: result.name, email, password: result.password }))
    .catch((err) => console.log(err));
  return user;
};

//---------------------------------------------/---------------------------------------------------------------//

const create = async (name, email, password) => {
  const db = await connection();
  const userCreated = await db.collection(collectionName)
    .insertOne({ name, email, password })
    .then((result) => ({ id: result.insertedId, name, email }))
    .catch((err) => console.log(err));
  return userCreated;
};

//---------------------------------------------/---------------------------------------------------------------//

module.exports = { create, findByEmail }; 