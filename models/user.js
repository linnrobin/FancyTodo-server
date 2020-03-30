'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { encryptPass } = require('../helpers/bcrypt')

  class User extends Model {

  }

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate(user, options) {
        user.password = encryptPass(user.password)
      }
    }
  })
 
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};