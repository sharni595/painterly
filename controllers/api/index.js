const router = require('express').Router();

const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');
const paintingRoutes = require('./painting-routes');

router.use('/painting', paintingRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;