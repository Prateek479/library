'use strict';

angular.module('mean.author').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('author create page', {
      url: '/author/create',
      templateUrl: 'author/views/create.html'
    });
  }
]);