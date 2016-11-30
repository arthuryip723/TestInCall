'use strict';

angular.
  module('header').
  directive('header', function() {
    return {
      restrict: 'A',
      template: '<h1>I am the header!</h1>',
    };
  });