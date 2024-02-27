const {sequelize} = require("../db/db_connection.js")
const { checkUserNameEmpty, checkPasswordEmpty } = require("../services/user.service");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");
const Users = require("../models/users.js")(sequelize)

module.exports = {
  add: async (req, res) => {
    try {
      //Check if username and password empty and null
      if(!checkUserNameEmpty(req.body.username) ||
        !checkPasswordEmpty(req.body.password)){
            return res.status(400).send(new ApiError(
              400,
              "Username and Password should not be empty",
            ));
      }else {
        // add username and password to database Users table
        const user = await Users.create({
          //validateUserName
          //validatePassword
          username: req.body.username,
          password: req.body.password
        });
        // Send status code and json response
        res.status(201).send(new ApiResponse(201,[
          {username : req.body.username}],
          "Username Password registered successfully",));
      }
    } catch (error) {
      // send if error message
      res.status(500).send(new ApiError(
        500,
        "Internal Server Error",
        ""+error.toString()
      ));
    }
  }
};
