'use strict';

angular.
  module('core.user').
  factory('User', ['$resource',
    function($resource) {
      return $resource('api/user', {}, {});
    }
  ]);