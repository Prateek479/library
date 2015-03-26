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
      this.timeout(10000);
      author = new Author({
        name: 'Full name',
        age: '24',
        location: 'Author Location'
      });
      author.save(function() {
        book = new Books({
          name: 'Book Name',
          price: 'Book Price',
          belongTo: author,
          description: 'Book Description'
        });
        done();
      });
    });
    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        this.timeout(10000);
        return book.save(function(err, data) {
          expect(err).to.be.a(null);
          expect(data.name).to.equal('Book Name');
          expect(data.price).to.equal('Book Price');
          expect(data.description).to.equal('Book Description');
          expect(data.belongTo.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        this.timeout(10000);
        book.title = '';

        return book.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without description', function(done) {
        this.timeout(10000);
        book.content = '';

        return book.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without author', function(done) {
        this.timeout(10000);
        book.belongTo = {};

        return book.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });
      it('should be able to show an error when try to save without price', function(done) {
        this.timeout(10000);
        book.price = '';

        return book.save(function(err) {
          expect(err).to.not.be(undefined);
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