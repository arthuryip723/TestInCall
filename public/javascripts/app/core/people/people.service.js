'use strict';

angular.
  module('core.people').
  factory('People', ['$resource',
    function($resource){
      // The second argument is for paramDefaults
      return $resource('api2/people/:id', {}, {
        query: {
          method: 'GET',
          // params: {phoneId: 'phones'},
          isArray: true,
        }
      });
    }
  ]);