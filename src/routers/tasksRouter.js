const express = require('express');

const userAuthentication = require('../middlewares/userAuthetication');

const { create, update, remove, getAll } = require('../controllers/usersController');

const router = express.Router();

router.get('/', userAuthentication, getAll);

router.post('/', userAuthentication, create)

router.put('/', userAuthentication, update)

router.delete('/', userAuthentication, remove)

module.exports = router;