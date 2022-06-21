const express = require("express");

const {check} = require('express-validator/check');

const userController = require("../controller/userController");
const authMiddleware = require("../Middlewares/is-auth");

const router = express.Router();

router.post("/signup", userController.signup);

router.post("/sign" ,userController.signin);

// router.post("/cartAdd", userController.PostCartAdd);

router.post("/cartAdd",authMiddleware, userController.postCartAdd);

router.get("/findcart", authMiddleware, userController.existingCart);

router.get("/findcount", authMiddleware, userController.existingCartCount);

module.exports = router;
