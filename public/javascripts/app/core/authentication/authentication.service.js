'use strict';

angular.
  module('core.authentication').
  factory('Authentication', ['$http', '$cookies', '$rootScope', function($http, $cookies, $rootScope) {
    return {
      isSignedIn() {
        // return false;
        // return true;
        return !!$cookies.get('user');
      },

      getUserName() {
        return $cookies.get('user');
      },

      signIn(data, success) {
        $http({
          method: 'POST',
          url: '/api/authenticate',
          data: data,
        }).
        then(function (resp) {
          // store the token and user in browser
          $cookies.put('user', resp.data.user.name);
          $cookies.put('token', resp.data.token);
          return resp;
        }).
        then(success);
      },
      signOut() {
        // just take out the user information from cookie or localstorage in browser side
        $cookies.remove('user');
        $cookies.remove('token');
      },
      signUp(data, success) {
        $http({
          method: 'POST',
          url: '/api/users',
          data: data,
        }).then(success);
        // console.log('signing up...');

      },
    };
  }]);