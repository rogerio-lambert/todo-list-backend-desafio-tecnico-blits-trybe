const usersService = require('../services/usersService.js')

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  const { status, response } = await userService.login(email, password);
  return res.status(status).json(response);
};

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await usersService.create(name, email, password);
  return res.status(result.status).json(result.response);
};

module.exports = { login, create };