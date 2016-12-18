'use strict';

angular.
  module('core.comment').
  factory('Comment', ['$resource',
    function($resource){
      // The second argument is for paramDefaults
      // return $resource('api2/people/:id/comments', {}, {
      return $resource('api2/people/:id/reviews/:reviewId/comments', {}, {
        query: {
          method: 'GET',
          isArray: true,
        }
      });
    }
  ]).
  factory('Review', ['$resource',
    function($resource) {
      return $resource('api2/people/:id/reviews', {}, {
        query: {
          method: 'GET',
          isArray: true,
        }
      })
  }]);