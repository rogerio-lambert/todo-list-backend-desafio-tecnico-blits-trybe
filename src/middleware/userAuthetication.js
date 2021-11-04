const { validateToken } = require('../services/usersService');
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  const dataToken = validateToken(token);
  if (!dataToken.isValid) {
   return res.status(401).json({ message: 'jwt malformed' });
  }
  req.user = dataToken.user;
  next();
};
