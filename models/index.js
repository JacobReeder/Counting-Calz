const User = require('./User');
const Post = require('./Post');
const Goal = require('./Goal');

User.hasMany(Post);

Post.belongsTo(User);

User.hasOne(Goal);

Goal.belongsTo(User);

module.exports = { User, Post, Goal };
