'use strict';

angular.module('mean.books').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('books create page', {
      url: '/books/create',
      templateUrl: 'books/views/create.html'
    });
  }
]);