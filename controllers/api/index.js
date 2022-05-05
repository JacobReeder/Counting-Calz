const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
///Mental note: Leave post-routes.js blank until we merge the feature branch

module.exports = router;