'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Authors = mongoose.model('Author'),
  Books = mongoose.model('Books'),
  _ = require('lodash');


/**
 * Find book by id
 */
exports.book = function(req, res, next, id) {
  Books.load(id, function(err, book) {
    if (err) return next(err);
    if (!book) return next(new Error('Failed to load book ' + id));
    req.book = book;
    next();
  });
};

/**
 * Create an book
 */
exports.create = function(req, res, next) {
  var book = new Books(req.body);
  book.user = req.user;

  book.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the book'
      });
    }
    // next();
    req.book = book;
    next();
  });
};
exports.addAuthor = function(req, res) {
  console.log(req.book);
  Authors.update({
    _id: req.book.belongTo
  }, {
    $addToSet: {
      books: req.book._id
    }
  }, function(err) {
    if (!err)
      res.json(req.book);
  });
};
/**
 * Update an book
 */
exports.update = function(req, res) {
  var book = req.book;

  book = _.extend(book, req.body);

  book.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the book'
      });
    }
    res.json(book);

  });
};

/**
 * Delete an book
 */
exports.destroy = function(req, res) {
  var book = req.book;

  book.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the book'
      });
    }
    res.json(book);

  });
};

/**
 * Show an book
 */
exports.show = function(req, res) {
  res.json(req.book);
};

/**
 * List of Bookss
 */
exports.all = function(req, res) {
  Books.find().sort('-created').populate('belongTo', 'name').exec(function(err, books) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the books'
      });
    }
    res.json(books);

  });
};