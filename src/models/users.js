'use strict';
const bcrypt = require("bcrypt")
const { Model,DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false
    }
  },
    {
    sequelize,
    modelName: 'Users',
  });
 Users.beforeSave((user,options)=>{
   if(user.changed("password")){
     const salt = bcrypt.genSaltSync(10);
     user.password = bcrypt.hashSync(user.password,salt);
   }
 });


  return Users;

};