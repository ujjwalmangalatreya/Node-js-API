const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const profileController = require("../controllers/profile.controller.js");
const authClientRequest =  require("../middleware/authMiddleware.js")


/* GET home page. */
router.get("/", function(req, res) {
  res.send("This is the index page... Congratulations...");
});
/** Authenticaion Routes */
router.post("/v1/api/register", userController.registerUser);
router.post("/v1/api/login", userController.loginUser);
router.post("/v1/api/logout", userController.logOut);

/** Profile Routes */
router.get("/v1/api/profiles", authClientRequest.authClientToken, profileController.profileLists);
router.get("/v1/api/profile", authClientRequest.authClientToken, profileController.profileByUserId);



module.exports = { router };
