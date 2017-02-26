'use strict';

angular.
  module('header').
  directive('header', function() {
    return {
      restrict: 'A',
      // template: '<h1>I am the header!</h1>',
      templateUrl: '/javascripts/app/header/header.directive.html',
      controllerAs: 'headerCtrl',
      controller: ['Authentication', function HeaderController(Authentication) {
        var self = this;
        self.isSignedIn = Authentication.isSignedIn;
        self.getUserName = Authentication.getUserName;
        self.submit = function() {
          Authentication.signIn({name: self.name, password: self.password});
        };
        self.signOut = Authentication.signOut;
        self.isSeller = Authentication.isSeller;
        // self.isLoggedIn = function(){
        //   console.log('hello');
        //   return true;
        // };
      }],
    };
  });
