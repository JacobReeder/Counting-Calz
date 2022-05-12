const seedGoals = require('./goal-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('------------');
  await seedGoals();
  console.log('------------');

  process.exit(0);
};

seedAll();
