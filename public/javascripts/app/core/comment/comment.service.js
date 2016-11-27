'use strict';

angular.
  module('core.comment').
  factory('Comment', ['$resource',
    function($resource){
      // The second argument is for paramDefaults
      return $resource('api2/people/:id/comments', {}, {
        query: {
          method: 'GET',
          isArray: true,
        }
      });
    }
  ]);