const { Goal } = require('../models');

const goalData = [
  {
    calorie_goal: 3500,
    user_id: '1',
  },
];

const seedGoals = () => Goal.bulkCreate(goalData);

module.exports = seedGoals;
