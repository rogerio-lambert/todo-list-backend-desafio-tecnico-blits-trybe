const usersService = require('../services/usersService.js')

//---------------------------------------------/---------------------------------------------------------------//

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  const { token, user, error } = await usersService.login(email, password);
  return res.status(200).json({ token, user, error });
};

//---------------------------------------------/---------------------------------------------------------------//

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await usersService.create(name, email, password);
  return res.status(201).json(user);
};

module.exports = { login, create };