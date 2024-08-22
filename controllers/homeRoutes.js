const router = require('express').Router();
const { Book, Review, User } = require('../models');
const auth = require('../utils/auth');
const { Op } = require('sequelize');

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
    console.error('Error fetching all books:', err);
    res.status(500).json(err);
  }
});

// Book search
router.get('/book/:title', async (req, res) => {
  try {
    console.log('Searching for book:', req.params.title);

    const bookData = await Book.findOne({
      where: {
        title: {
          [Op.iLike]: `%${req.params.title}%`
        }
      },
      include: [
        {
          model: Review,
          include: [User]
        }
      ]
    });

    console.log('Book data:', bookData);

    if (bookData) {
      const book = bookData.get({ plain: true });
      res.render('book', {
        ...book,
        logged_in: req.session.logged_in
      });
    } else {
      console.log('No book found for title:', req.params.title);
      res.render('no-results', { 
        searchTerm: req.params.title,
        logged_in: req.session.logged_in
      });
    }
  } catch (err) {
    console.error('Error in book search:', err);
    res.status(500).json(err);
  }
});

// API route to get all books
router.get('/api/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json(err);
  }
});

// View all books 
router.get('/allbooks', async (req, res) => {
  try {
    const bookData = await Book.findAll();
    res.json(bookData);
  } catch (err) {
    console.error('Error fetching all books:', err);
    res.status(500).json(err);
  }
});

// Profile route - shows the user's profile and reviews
router.get('/profile', auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ 
        model: Review,
        include: [{ model: Book, attributes: ['title'] }]
      }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
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