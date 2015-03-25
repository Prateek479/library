'use strict';

var authors = require('../controllers/authors');

// Author authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Authors, app, auth) {

  app.route('/authors')
    .get(authors.all)
    .post(authors.create);
  app.route('/authors/:authorId')
    .get(auth.isMongoId, authors.show)
    .put(auth.isMongoId, hasAuthorization, authors.update)
    .delete(auth.isMongoId, hasAuthorization, authors.destroy);
  //fetch Authors
  app.get('/fetch/author', authors.booksAuthor);
  // Finish with setting up the authorId param
  app.param('authorId', authors.author);
};