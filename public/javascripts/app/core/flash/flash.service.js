'use strict';

angular.
  module('core.flash').
  factory('Flash', ['$rootScope', function($rootScope) {
    var queue = [];
    var currentMessage = "";

    function dismiss() {
      currentMessage = '';
    }

    // $rootScope.$on('$routeChangeSuccess', function() {
    //   // currentMessage = queue.shift() || "";
    //   currentMessage = '';
    // });
    $rootScope.$on('$routeChangeSuccess', dismiss);
    // angular.forEach(['$routeChangeSuccess', 'refreshFlash'], function(el) {
    //   $rootScope.$on(el, function(event) {
    //     currentMessage = '';
    //   });
    // });

    return {
      setMessage: function(message) {
        // queue.push(message);
        currentMessage = message;
      },
      getMessage: function() {
        return currentMessage;
      },
      // dismiss: function() {
      //   currentMessage = '';
      // }
      dismiss
    };
  }]);
