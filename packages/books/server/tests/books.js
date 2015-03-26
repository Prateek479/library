/* jshint -W079 */
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
  mongoose = require('mongoose');
var Author = mongoose.model('Author');
var Books = mongoose.model('Books');

/**
 * Globals
 */
var author;
var book;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Books:', function() {
    beforeEach(function(done) {
      author = new Author({
        name: 'Full name',
        age: 24,
        location: 'Author Location'
      });
      author.save(function() {
        book = new Books({
          name: 'Book Name',
          price: 45,
          releaseDate: "2015-03-26T19:40:20.695Z",
          belongTo: author,
          description: 'Book Description'
        });
        done();
      });
    });
    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return book.save(function(err, data) {
          expect(err).to.be(null);
          expect(data.name).to.equal('Book Name');
          expect(data.price).to.equal(45);
          expect(data.description).to.equal('Book Description');
          expect(data.belongTo.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        book.title = '';
        return book.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without description', function(done) {
        book.content = '';
        return book.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without author', function(done) {
        book.belongTo = {};
        return book.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });
      it('should be able to show an error when try to save without price', function(done) {
        book.price = '';
        return book.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      //retrive by id
      it("function #findOne", function(done) {
        Books.findOne({
          _id: book._id,
        }, function(err, data) {
          console.log('here is my data', data);
          console.log('here is my err', err);

          expect(err).to.be(null);
          expect(data.name).to.equal('Book Name');
          expect(data.price).to.equal(45);
          expect(data.description).to.equal('Book Description');
          expect(data.belongTo.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          done();
        });
      });

    });

    afterEach(function(done) {
      this.timeout(10000);
      book.remove(function() {
        author.remove(done);
      });
    });
  });
});