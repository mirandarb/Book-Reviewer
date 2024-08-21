// Manages routes for static pages like the homepage or other general routes

const router = require('express').Router();
const { Book, Review, User } = require('../models');
const auth = require('../utils/auth');

// Homepage route - shows all books
router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll();
    const books = bookData.map((book) => book.get({ plain: true }));

    res.render('homepage', { 
      books, 
      logged_in: req.session.logged_in || false
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Book detail route - shows a single book and its reviews
router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [{ model: Review, include: [User] }]
    });

    if (!bookData) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }

    const book = bookData.get({ plain: true });

    res.render('book', {
      ...book,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Profile route - shows the user's profile and reviews
router.get('/profile', auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review, include: [Book] }]
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// Test route
router.get('/test', (req, res) => {
  res.send('Test route works!');
});


module.exports = router;
