'use strict';

angular.module('mean.author').controller('AuthorController', ['$scope', 'Global', 'Author',
  function($scope, Global, Author) {
    $scope.global = Global;
    $scope.package = {
      name: 'author'
    };
    $scope.author = {};
    $scope.create = function(author) {
      var reg = /^\d+$/;
      if (reg.test(author.age)) {
        var newAuthor = new Author(author);
        newAuthor.$save(function(res) {
          window.location.reload();
        }, function() {
          // Error handling gose here
        });
      } else {
        alert('Age should be a number');
      }
    };
  }
]);