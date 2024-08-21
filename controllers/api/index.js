// Combines and organizes all API routes

const router = require('express').Router();
const bookRoutes = require('./bookRoutes');
const reviewRoutes = require('./reviewRoutes');
const userRoutes = require('./userRoutes');

router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);

module.exports = router;
