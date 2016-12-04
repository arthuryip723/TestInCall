'use strict';

angular.
  module('core.authentication').
  factory('Authentication', ['$resource', '$rootScope', function($resource, $rootScope) {
    return {
      isSignedIn() {
        return false;
        // return true;
      },
      signIn() {},
      signOut() {},
      signUp() {},
    };
  }]);