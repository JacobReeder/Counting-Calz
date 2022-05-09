const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
      type: DataTypes.STRING,
      allowNull: false,
    },
    // number of calories consumed with this meal
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // allows the calendar to put the date in
    // Cant figure out why this date section breaks everything!!!
    // date_time: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // references the user that posted this meal
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
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  },
);

module.exports = Post;
