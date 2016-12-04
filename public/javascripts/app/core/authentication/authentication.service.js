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

      isSeller() {
        // console.log($cookies.get('role'));
        return $cookies.get('role') === 'seller';
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
          $cookies.put('role', resp.data.user.role);
          return resp;
        }).
        then(success);
      },
      signOut() {
        // just take out the user information from cookie or localstorage in browser side
        $cookies.remove('user');
        $cookies.remove('token');
        $cookies.remove('role');
      },
      signUp(data, success) {
        $http({
          method: 'POST',
          url: '/api/users',
          data: data,
        }).
        then(function (resp) {
          // store the token and user in browser
          $cookies.put('user', resp.data.user.name);
          $cookies.put('token', resp.data.token);
          $cookies.put('role', resp.data.user.role);
          return resp;
        }).
        then(success);
        // console.log('signing up...');

      },
      signUpSeller(data, success) {
        $http({
          method: 'POST',
          url: '/api/users',
          data: Object.assign(data, {role: 'seller'}),
        }).
        then(function (resp) {
          // store the token and user in browser
          $cookies.put('user', resp.data.user.name);
          $cookies.put('token', resp.data.token);
          $cookies.put('role', resp.data.user.role);
          return resp;
        }).
        then(success);
      },
    };
  }]);