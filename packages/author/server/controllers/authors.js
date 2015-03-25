'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Authors = mongoose.model('Author'),
  _ = require('lodash');


/**
 * Find author by id
 */
exports.author = function(req, res, next, id) {
  Authors.load(id, function(err, author) {
    if (err) return next(err);
    if (!author) return next(new Error('Failed to load author ' + id));
    req.author = author;
    next();
  });
};

/**
 * Create an author
 */
exports.create = function(req, res) {
  var author = new Authors(req.body);
  author.user = req.user;
  author.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the author'
      });
    }
    res.json(author);
  });
};

/**
 * Update an author
 */
exports.update = function(req, res) {
  var author = req.author;
  author = _.extend(author, req.body);
  author.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the author'
      });
    }
    res.json(author);
  });
};

exports.booksAuthor = function(req, res) {
  Authors.find({
    name: new RegExp('^' + req.query.term + '(.)*', 'i')
  }).limit(5).exec(function(err, users) {
    res.json(users);
  });
};

/**
 * Delete an author
 */
exports.destroy = function(req, res) {
  var author = req.author;
  author.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the author'
      });
    }
    res.json(author);
  });
};

/**
 * Show an author
 */
exports.show = function(req, res) {
  res.json(req.author);
};

/**
 * List of Authorss
 */
exports.all = function(req, res) {
  Authors.find().sort('-created').exec(function(err, authors) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the authors'
      });
    }
    res.json(authors);
  });
};