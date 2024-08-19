// Manages routes related to reviews (e.g., submitting a review, retrieving reviews)

const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all reviews for a specific book
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        book_id: req.params.bookId
      }
    });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new review
router.post('/', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
