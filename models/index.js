const User = require('./User');
const Post = require('./Post');
const Goal = require('./Goal');

User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasOne(Goal, {
  foreignKey: 'user_id',
});

Goal.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Post, Goal };
