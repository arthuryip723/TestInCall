'use strict';

angular.
  module('core.authentication').
  factory('Authentication', ['$resource', '$rootScope', function($resource, $rootScope) {
    return {
      isLoggedIn() {
        // return false;
        return true;
      },
    };
  }]);