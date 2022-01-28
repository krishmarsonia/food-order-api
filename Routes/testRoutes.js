const express = require('express');

const testController = require('../controller/testController');

const router = express.Router();

router.post('/test', testController.datatest)

module.exports = router;