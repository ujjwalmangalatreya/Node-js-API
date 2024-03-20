const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const profileController = require("../controllers/profile.controller.js");


/* GET home page. */
router.get("/", function(req, res) {
  res.send("This is the index page... Congratulations...");
});

router.post("/v1/api/register", userController.registerUser);
router.post("/v1/api/login", userController.loginUser);
router.post("/v1/api/logout", userController.logOut);

router.get("/v1/api/profile", profileController.profileLists);



module.exports = { router };
