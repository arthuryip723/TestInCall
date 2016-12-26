'use strict';

angular.
  module('core.people').
  factory('People', ['$resource',
    function($resource){
      // The second argument is for paramDefaults
      return $resource('api/people/:id', {}, {
        query: {
          method: 'GET',
          isArray: true,
        }
      });
    }
  ]);