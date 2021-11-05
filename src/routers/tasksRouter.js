const express = require('express');

const userAuthentication = require('../middlewares/userAuthetication');

const { create, update, remove, getAll } = require('../controllers/tasksController');

const router = express.Router();

router.get('/', userAuthentication, getAll);

router.post('/', userAuthentication, create)

router.put('/:id', userAuthentication, update)

router.delete('/:id', userAuthentication, remove)

module.exports = router;