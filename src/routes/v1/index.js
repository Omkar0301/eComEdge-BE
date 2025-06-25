const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const featureRoutes = require('./feature.routes');
const teamRoutes = require('./team.routes');
const portfolioRoutes = require('./portfolio.routes');
const testimonialRoutes = require('./testimonial.routes');
const pricingRoutes = require('./pricing.routes');
const supportRoutes = require('./support.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/features', featureRoutes);
router.use('/teams', teamRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/testimonial', testimonialRoutes);
router.use('/pricing', pricingRoutes);
router.use('/support', supportRoutes);

module.exports = router;
