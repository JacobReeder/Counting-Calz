const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const goalRoutes = require('./goal-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/goals', goalRoutes);

module.exports = router;
