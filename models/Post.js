const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

// create our Post model
class Post extends Model {}

Post.init(
  {
    // id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // description of the meal the user is posting
    meal_desc: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    // number of calories consumed with this meal
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // references the user that posted this meal
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  },
);

module.exports = User;
