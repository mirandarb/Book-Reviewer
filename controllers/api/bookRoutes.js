// Handles routes for book-related data (e.g., retrieving book details, adding new books).

const router = require('express').Router();
const { Book } = require('../../models');
const auth = require('../../utils/auth');

// Get all books
router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll();
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single book by id
router.get('/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id);
    if (!bookData) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new book
router.post('/', auth, async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/search/:term', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      where: {
        title: {
          [Op.iLike]: `%${req.params.term}%`
        }
      },
      limit: 5
    });
    res.json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/title/:title', async (req, res) => {
  try {
    const bookData = await Book.findOne({
      where: {
        title: req.params.title
      }
    });
    if (bookData) {
      res.json(bookData);
    } else {
      res.status(404).json({ message: 'No book found with this title' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
