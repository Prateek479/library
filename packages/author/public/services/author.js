'use strict';

//Author service used for authores REST endpoint
angular.module('mean.author').factory('Author', ['$resource',
  function($resource) {
    return $resource('authors/:authorId', {
      authorId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);