'use strict';

var books = require('../controllers/books');

// Book authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.book.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Books, app, auth) {

  app.route('/books')
    .get(books.all)
    .post(books.create);
  app.route('/books/:bookId')
    .get(auth.isMongoId, books.show)
    .put(auth.isMongoId, hasAuthorization, books.update)
    .delete(auth.isMongoId, hasAuthorization, books.destroy);

  // Finish with setting up the bookId param
  app.param('bookId', books.book);
};