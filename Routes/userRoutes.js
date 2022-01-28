const express = require("express");

const userController = require("../controller/userController");
const authMiddleware = require("../Middleware/is-auth");

const router = express.Router();

router.post("/signup", userController.signup);

router.post("/sign", userController.signin);

// router.post("/cartAdd", userController.PostCartAdd);

router.post("/cartAdd", userController.postCartAdd);

router.post("/findcart", authMiddleware, userController.existingCart);

router.post("/findcount", authMiddleware, userController.existingCartCount);

module.exports = router;
