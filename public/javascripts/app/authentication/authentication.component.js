'use strict';

angular.
  module('authentication').
  component('signUp', {
    templateUrl: '/javascripts/app/authentication/sign-up.template.html',
    controller: ['Authentication', function SignUpController(Authentication){
      var self = this;
      self.submit = function () {
        console.log('submitting...');
      };
    }],
  });