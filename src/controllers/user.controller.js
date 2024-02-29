const { sequelize } = require("../db/db_connection.js");
const {
  checkUserNameEmpty,
  checkPasswordEmpty,
  checkPasswordValidations,
  checkUserNameValidation
} = require("../services/user.service.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { ApiError } = require("../utils/ApiError.js");
const { Sequelize } = require("sequelize");
const Users = require("../models/users.models.js")(sequelize);

module.exports = {
  add: async (req, res) => {
    try {
      //Check if username and password empty and null
      if (
        !checkUserNameEmpty(req.body.username) ||
        !checkPasswordEmpty(req.body.password)
      ) {
        return res
          .status(400)
          .send(new ApiError(400, "Username and Password should not be empty"));
      } else {
        // add username and password to database Users table
        const validatePassword = await checkPasswordValidations(
          req.body.password
        );
        const validateUsername = await checkUserNameValidation(req.body.username);

        if (validatePassword && validateUsername) {
          const user = await Users.create({
            username: req.body.username,
            password: req.body.password,
          });

          // Send status code and json response
          res
            .status(201)
            .send(
              new ApiResponse(
                201,
                [{ username: req.body.username, id: Sequelize.id }],
                "Username Password registered successfully"
              )
            );
        } else {
          res.status(400).send(
            new ApiError(400, "Username Password cannot be validated", [
              {
                UserNameLength : "Username length must be atleast 3 and not greater than 15 char",
                PasswordLength:
                  "Password length must be atleast 7 and not greater than 15 char",
                PasswordUpperCase:
                  "Password must have atleast one uppercase character",
                PasswordLowerCase:
                  "Password must have atleast one lowercase character",
                PasswordNumber: "Password must have atleast one number",
                PasswordSpecialChar:
                  "Password must have atleast one special character",
              },
            ])
          );
          return;
        }
      }
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        // Handle unique constraint violation error
        res.status(400).json({ error: "Username is already taken." });
      } else {
        res
          .status(500)
          .send(
            new ApiError(500, "Internal Server Error", "" + error.toString())
          );
      }
    }
  },
};
