'use strict';
const bcrypt = require("bcrypt");
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
     class Profile extends Model {
          static associate(models) {
               // Define association with User model
               Profile.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
          }
     }

     Profile.init({
          id: {
               primaryKey: true,
               type: DataTypes.UUID,
               defaultValue: DataTypes.UUIDV4,
          },
          userId: {
               type: DataTypes.UUID,
               allowNull: false,
               unique: true,
               references: {
                    model: 'Users',
                    key: 'id',
               },
          },
          profileImage: {
               allowNull: true,
               type: DataTypes.STRING,
          },
          bio: {
               allowNull: true,
               defaultValue: "No Bio",
               type: DataTypes.TEXT,
          },
          genre: {
               allowNull: true,
               defaultValue: "Musician",
               type: DataTypes.STRING,
          },
          band: {
               allowNull: true,
               defaultValue: ["N/A"],
               type: DataTypes.ARRAY(DataTypes.STRING), // Specify the data type of the elements within the array
          },
     }, {
          sequelize,
          modelName: 'Profile',
     });

     return Profile;
};
