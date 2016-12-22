'use strict';

angular.
  module('core.flash').
  factory('Flash', ['$rootScope', function($rootScope) {
    var queue = [];
    var currentMessage = "";

    $rootScope.$on('$routeChangeSuccess', function() {
      // currentMessage = queue.shift() || "";
      currentMessage = '';
    });

    return {
      setMessage: function(message) {
        // queue.push(message);
        currentMessage = message;
      },
      getMessage: function() {
        return currentMessage;
      },
      dismiss: function() {
        currentMessage = '';
      } 
    };
  }]);