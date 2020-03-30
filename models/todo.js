'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model {

  }

  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Todo',
    validate: {
      noNull() {
        if (this.title === "" || this.title == null || this.description === "" || this.description == null || this.status == null || this.due_date == null) {
          throw new Error('Input cannot be empty')
        }
      }
    }
  })
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};