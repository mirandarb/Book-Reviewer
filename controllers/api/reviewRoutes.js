// Manages routes related to reviews (e.g., submitting a review, retrieving reviews)

const router = require('express').Router();
const { Review, User } = require('../../models');
const auth = require('../../utils/auth');

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
router.post('/', auth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id
    });
    // Fetch the newly created review with user information
    const reviewWithUser = await Review.findByPk(newReview.id, {
      include: [{ model: User, attributes: ['name'] }]
    });
    res.status(200).json(reviewWithUser);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(400).json(err);
  }
});

module.exports = router;
