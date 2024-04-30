/* eslint-disable consistent-return */
const express = require('express');
const { validate } = require('../controllers/qr-controller');

const router = express.Router();

/* Get all employees */
router.get('/validate', validate);

module.exports = router;
