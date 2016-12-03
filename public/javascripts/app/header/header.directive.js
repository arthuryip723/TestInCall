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
        self.isLoggedIn = Authentication.isLoggedIn;
        // self.isLoggedIn = function(){
        //   console.log('hello');
        //   return true;
        // };
      }],
    };
  });