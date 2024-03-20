const { Sequelize } = require("sequelize");
const { sequelize } = require("../db/db_connection.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const Profile = require("../models/profile.models")(sequelize);


module.exports = {
     profileLists: async (req, res) => {
          try {
               const profiles = await Profile.findAll();
               if (profiles.length === 0) {
                    return res.status(204).send(new ApiResponse(204, profiles, "No Profile Found"));
               }
               return res.status(200).send(new ApiResponse(200,profiles,"Success"));
          } catch (error) {
               console.log(error);
               return res.status(500).json({ error: 'Internal Server Error' });
          }
     }
}