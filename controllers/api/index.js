const router = require('express').Router();

const userRoutes = require('./user-routes');
const paintingRoutes = require('./painting-routes');
const commentRoutes = require('./comment-routes');

router.use('/comments', commentRoutes);
router.use('/painting', paintingRoutes);
router.use('/users', userRoutes);

module.exports = router;