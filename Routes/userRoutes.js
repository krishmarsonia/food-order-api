const express = require("express");

const {check} = require('express-validator/check');

const userController = require("../controller/userController");
const authMiddleware = require("../Middlewares/is-auth");
const validationMiddleware = require('../Middlewares/validator-middleware');
const {postAddcart, postUserSignup} = require('../validations/User-validators');

const router = express.Router();

router.post("/signup", validationMiddleware(postUserSignup) , userController.signup);

router.post("/sign" ,userController.signin);

// router.post("/cartAdd", userController.PostCartAdd);

router.post("/cartAdd",authMiddleware, validationMiddleware(postAddcart) ,userController.postCartAdd);

router.get("/findcart", authMiddleware, userController.existingCart);

router.get("/findcount", authMiddleware, userController.existingCartCount);

module.exports = router;
