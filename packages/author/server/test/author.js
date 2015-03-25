'use strict';
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  Author = mongoose.model('Author');

/**
 * Globals
 */
var author;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Author:', function() {

    before(function(done) {
      author = {
        name: 'Full name',
        age: 'Author age',
        location: 'Author Location'
      };
      done();
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        var _author = new Author(author);
        _author.save(function(err) {
          expect(err).to.be(null);
          _author.remove();
          done();
        });

      });

      it('should be able to create author and save author for updates without problems', function(done) {
        var _user = new Author(author);
        _user.save(function(err) {
          expect(err).to.be(null);
          _user.name = 'Full name2';
          _user.save(function(err) {
            expect(err).to.be(null);
            expect(_user.name).to.equal('Full name2');
            _user.remove(function() {
              done();
            });
          });
        });
      });

      it('should show an error when try to save without name', function(done) {
        var _user = new Author(author);
        _user.name = '';
        return _user.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should show an error when try to save without age', function(done) {
        var _user = new Author(author);
        _user.username = '';
        return _user.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should show an error when try to save without location', function(done) {
        var _user = new Author(author);
        _user.location = '';
        return _user.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });
    });
    after(function(done) {
      this.timeout(10000);
      author.remove(function() {
        done();
      });
    });
  });
});