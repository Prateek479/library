'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Book Schema
 */
var BookSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date
  },
  belongTo: {
    type: Schema.ObjectId,
    ref: 'Author'
  },
  description: {
    type: String,
    required: true,
  }
});

/**
 * Validations
 */
BookSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

BookSchema.path('price').validate(function(price) {
  return !!price;
}, 'Price cannot be blank');

/**
 * Statics
 */
BookSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('belongTo').exec(cb);
};

mongoose.model('Books', BookSchema);