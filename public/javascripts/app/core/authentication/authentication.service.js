'use strict';

angular.
  module('core.authentication').
  factory('Authentication', ['$http', '$rootScope', function($http, $rootScope) {
    return {
      isSignedIn() {
        return false;
        // return true;
      },
      signIn(data, success) {
        $http({
          method: 'POST',
          url: '/api2/authentication',
          data: data,
        }).then(success);
      },
      signOut() {
        // just take out the user information from cookie or localstorage in browser side
      },
      signUp(data, success) {
        $http({
          method: 'POST',
          url: '/api2/users',
          data: data,
        }).then(success);
        // console.log('signing up...');

      },
    };
  }]);