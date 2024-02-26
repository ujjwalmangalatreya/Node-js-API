const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("This is the index page... Congratulations...")
});


router.post('/api/user', userController.add);


module.exports = {router}
