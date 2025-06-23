const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const featureRoutes = require('./feature.routes');
const teamRoutes = require('./team.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/features', featureRoutes);
router.use('/teams', teamRoutes);

module.exports = router;
