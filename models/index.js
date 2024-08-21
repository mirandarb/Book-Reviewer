// Combines all models and sets up associati
const Book = require('./Book');
const Review = require('./Review');
const User = require('./User');

// this is my user + review
User.hasMany(Review)
  
Review.belongsTo(User)

// this is my book + review
Book.hasMany(Review)

Review.belongsTo(Book)

module.exports = { Book, Review, User };