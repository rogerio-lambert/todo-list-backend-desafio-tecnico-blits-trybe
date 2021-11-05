require('dotenv');

const usersModel = require('../models/usersModel');

const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

//---------------------------------------------/---------------------------------------------------------------//

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, secret);
    return { 
      user: data,
      isValid: true,
     };
  } catch (error) {
    return {
      errorMessage: error.message,
      isValid: false,
    };
  }
};

//---------------------------------------------/---------------------------------------------------------------//

const createToken = (user) => {
  const { name, id, email } = user
  const token = jwt.sign({ data: { name, id, email } }, secret, jwtConfig);
  return token;
};

//---------------------------------------------/---------------------------------------------------------------//

const userValidate = (user, passwordLogin ) => {
  if (!user) {
    return { error: 'not find', check: false };
  }
  const { password } = user;
  if (password !== passwordLogin) {
    return { error: 'not allowed', check: false };
  }
  return { check:true };
};

//---------------------------------------------/---------------------------------------------------------------//

const login = async (email, passwordLogin) => {
  const user = await usersModel.findByEmail(email);
  const { error, check } = userValidate(user, passwordLogin)
  if (!check) {
    return { error };
  }
  const token = createToken(user);
  const { name, id } = user
  return { token, user: { email, name, id } };
};

//---------------------------------------------/---------------------------------------------------------------//

const create = async (name, email, password) => {
  const newUser = await usersModel.create(name, email, password);
  return newUser;
};

//---------------------------------------------/---------------------------------------------------------------//

module.exports = { login, create, validateToken };