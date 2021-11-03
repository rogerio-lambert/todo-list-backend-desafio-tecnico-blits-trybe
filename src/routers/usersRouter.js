const express = require('express');

const { create, login } = require('../controllers/usersController');

const router = express.Router();

router.post('/login', login);

router.post('/register', create)

module.exports = router;