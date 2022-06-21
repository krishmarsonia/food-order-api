const express = require('express');

const foodController = require('../controller/foodController');
const authMiddleware = require('../Middlewares/is-auth');
const validatorMiddleware = require('../Middlewares/validator-middleware');
const { postAddFood } = require('../validations/Food-validators');

const router = express.Router();

router.post( '/submitfood',authMiddleware, validatorMiddleware(postAddFood) ,foodController.postFoodData);

router.get('/getFood', foodController.getFoodData);

router.get('/testFood', foodController.testFood)

module.exports = router;