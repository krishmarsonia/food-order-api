const express = require('express');

const foodController = require('../controller/foodController');

const authMiddleware = require('../Middlewares/is-auth')

const router = express.Router();

router.post( '/submitfood',authMiddleware, foodController.postFoodData);

router.get('/getFood', foodController.getFoodData);

module.exports = router;