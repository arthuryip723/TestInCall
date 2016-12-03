'use strict';

angular.
  module('core.authentication').
  factory('Authentication', ['$resource', '$rootScope', function($resource) {
    return {
      isLoggedIn() {
        return false;
      },
    };
  }]);