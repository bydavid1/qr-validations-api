/* eslint-disable consistent-return */
const express = require('express');
const { login } = require('../controllers/auth-controller');

const router = express.Router();

/* Get all employees */
router.get('/login', login);

module.exports = router;
