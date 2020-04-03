'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model {

  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Title cannot be null"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Description cannot be null"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Status cannot be null"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: {
          args: new Date((new Date().getTime() - 86400000)).toISOString().slice(0,10),
          msg: "Todo must at least start from today onward"
        }, 
        notNull: {
          args: true,
          msg: "Due date cannot be null"
        } 
      }
    }
  }, {
    sequelize,
    modelName: 'Todo'
  })
  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};