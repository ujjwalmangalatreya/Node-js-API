const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("This is the index page... Congratulations...") 
});


router.post('/v1/api/register', userController.registerUser);
router.post('/v1/api/login', userController.loginUser);

module.exports = {router}

