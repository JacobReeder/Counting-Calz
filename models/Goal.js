const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our goal model
// this will be a one-to-many relationship
// many users can create a goal but there is one goal to a user
class Goal extends Model { }

Goal.init(
  {
    // creates an id column
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // creates a column for the calorie goal
    calorie_goal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // connects the goal to the specific user
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'goal',
  },
);

module.exports = Goal;
