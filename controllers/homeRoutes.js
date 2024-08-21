// Manages routes for static pages like the homepage or other general routes

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

// Book search
router.get('/book/:title', async (req, res) => {
  try {
    console.log('Searching for book:', req.params.title); // Logging the search term

    const bookData = await Book.findOne({
      where: {
        title: {
          [Op.iLike]: `%${req.params.title}%` // Case-insensitive, partial match
        }
      },
      include: [
        {
          model: Review,
          include: [User]
        }
      ]
    });

    console.log('Book data:', bookData); // Logging the result

    if (bookData) {
      const book = bookData.get({ plain: true });
      res.render('book', {
        ...book,
        logged_in: req.session.logged_in
      });
    } else {
      console.log('No book found'); // Logging when no book is found
      res.status(404).json({ message: 'No book found with this title' });
    }
  } catch (err) {
    console.error('Error in book search:', err); // Logging any errors
    res.status(500).json(err);
  }
});

// View all books 
router.get('/allbooks', async (req, res) => {
  try {
    const bookData = await Book.findAll();
    res.json(bookData);
  } catch (err) {
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
