const sequelize = require('../config/connection');
const { Book, Review, User } = require('../models');

const bookData = require('./bookData.json');
const reviewData = require('./reviewData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const books = await Book.bulkCreate(bookData, {
    returning: true,
  });

  for (const review of reviewData) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      book_id: books[Math.floor(Math.random() * books.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
