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
    },
    validate: {
      noNull() {
        if (this.email === "" || this.email == null || this.password === "" || this.password == null) {
          throw new Error('Input cannot be empty')
        }
      }
    }
  })
 
  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  return User;
};