'use strict';

angular.module('mean.author').controller('AuthorController', ['$scope', 'Global', 'Author',
  function($scope, Global, Author) {
    $scope.global = Global;
    $scope.package = {
      name: 'author'
    };
    $scope.author = {};
    $scope.create = function(author) {
      var newAuthor = new Author(author);
      newAuthor.$save(function(res) {
        window.location.reload();
      }, function() {

      });
    };
  }
]);