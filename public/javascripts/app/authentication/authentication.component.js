'use strict';

angular.
  module('authentication').
  component('signUp', {
    templateUrl: '/javascripts/app/authentication/sign-up.template.html',
    controller: ['$window', 'Authentication', function SignUpController($window, Authentication){
      var self = this;
      // here i'll need to use promise to go to next page.
      // work on promise here until i am very familiar with promise
      // I should use a success function here.
      self.submit = function () {
        Authentication.signUp({name: self.name, password: self.password}, function(user) {
          // launch a request for authentication
          Authentication.signIn(user, function(data) {
            console.log(data);
            $window.location.href = '/';
          })
        });
        // console.log('submitting...');
      };
    }],
  });