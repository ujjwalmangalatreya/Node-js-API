const { Sequelize } = require("sequelize");
const { sequelize } = require("../db/db_connection.js");
const {
  checkUserNameEmpty,
  checkPasswordEmpty,
  checkPasswordValidations,
  checkUserNameValidation,
} = require("../services/user.service.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { ApiError } = require("../utils/ApiError.js");

const Users = require("../models/users.models.js")(sequelize);
const Profile = require("../models/profile.models")(sequelize);
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


module.exports = {
  registerUser: async (req, res) => {
    try {
      if (
        !checkUserNameEmpty(req.body.username) ||
        !checkPasswordEmpty(req.body.password)
      ) {
        return res.status(400).send(new ApiError(400, "Username and Password should not be empty"));
      } else {
        const validatePassword = checkPasswordValidations(req.body.password);
        const validateUsername = checkUserNameValidation(req.body.username);

        if (validatePassword && validateUsername) {
          const user = await Users.create({
            username: req.body.username,
            password: req.body.password,
          });
          const profile = await Profile.create({
            userId: user.id,
          });
          return res.status(201).send(new ApiResponse(
              201,
              [{ username: req.body.username, id: Sequelize.id }],
              "Username Password registered successfully",
            ),
          );

        } else {
          return res.status(400).send(
            new ApiError(400, "Username Password cannot be validated", [
              {
                UserNameLength: "Username length must be at least 3 and not greater than 15 char",
                PasswordLength: "Password length must be at least 7 and not greater than 15 char",
                PasswordUpperCase: "Password must have at least one uppercase character",
                PasswordLowerCase: "Password must have at least one lowercase character",
                PasswordNumber: "Password must have at least one number",
                PasswordSpecialChar: "Password must have at least one special character",
              },
            ]),
          );
        }
      }
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ error: "Username is already taken." });
      } else {
        res.status(500).send(new ApiError(500, "Internal Server Error", "" + error.toString()),
        );
      }
    }
  },
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await Users.findOne({
        where: { username: username },
      });
      if (!user) {
        return res.status(400).send(new ApiError(400, "Username did not match.."));
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send(new ApiError(400, "Password did not match.."));
      }
      const token = jwt.sign({ username: user.username }, "nodeauthsecret", {
        expiresIn: "1h",
      });
      return res.status(200).send(new ApiResponse(200, [
        {
          id: user.id,
          username: user.username,
          token: token,
        }], "Login Successful"));
    } catch (error) {
      return res.status(500).send(new ApiError(500, "Internal Server Error", "" + error.toString()),
      );
    }
  },
  logOut: async (req, res) => {
    res.status(200).send(new ApiResponse(200, [], "Logout Successful"));
  },
};
