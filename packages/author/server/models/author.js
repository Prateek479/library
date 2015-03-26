'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Aurthor Schema
 */
var AurthorSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  books: [{
    type: Schema.ObjectId,
    ref: 'Books'
  }]
});

/**
 * Validations
 */
AurthorSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
AurthorSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};
mongoose.model('Author', AurthorSchema);