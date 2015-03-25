'use strict';

angular.module('mean.books').controller('BooksController', ['$scope', '$location', '$http', '$stateParams', 'Global', 'Books',
  function($scope, $location, $http, $stateParams, Global, Books) {
    $scope.global = Global;
    $scope.package = {
      name: 'books'
    };
    // According Listing

    $scope.oneAtATime = true;
    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
    var fetchAuthor = function(query) {
      $http.get('/fetch/author', {
        params: {
          term: query.term
        }
      }).success(function(data, status, headers, config) {
        var items = {
          results: []
        };
        angular.forEach(data, function(datum) {
          items.results.push({
            text: datum.name,
            id: datum._id
          });
        });
        query.callback(items);
      })
        .error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };

    $scope.authorOptions = {
      multiple: false,
      allowClear: true,
      minimumInputLength: 2,
      quietMillis: 500,
      query: fetchAuthor
    };
    $scope.book = {};
    $scope.findAll = function() {
      Books.query(function(books) {
        $scope.books = books;
      });
    };

    $scope.create = function(book, author) {
      book.belongTo = author.id;
      var newBook = new Books(book);
      newBook.$save(function(res) {
        window.location.reload();
      }, function(err) {

      });
    };

    $scope.remove = function(book) {
      if (book) {
        book.$remove(function(response) {
          for (var i in $scope.books) {
            if ($scope.books[i] === book) {
              $scope.books.splice(i, 1);
            }
          }
        });
      }
    };

    $scope.update = function(isValid) {

    };

    $scope.findOne = function() {
      Books.get({
        bookId: $stateParams.bookId
      }, function(book) {
        $scope.book = book;
      });
    };
  }
]);