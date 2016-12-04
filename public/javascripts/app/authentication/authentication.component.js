'use strict';

angular.
  module('authentication').
  component('signUp', {
    templateUrl: '/javascripts/app/authentication/sign-up.template.html',
    controller: ['$location', 'Authentication', function SignUpController($location, Authentication){
      var self = this;
      // here i'll need to use promise to go to next page.
      // work on promise here until i am very familiar with promise
      // I should use a success function here.
      self.submit = function () {
        Authentication.signUp({name: self.name, password: self.password}, function(user) {
          // launch a request for authentication
          $location.path('/');
          // Authentication.signIn(user, function(data) {
          //   console.log(data);  
          //   // $window.location.href = '/';
          // })
        });
        // console.log('submitting...');
      };
    }],
  }).
  component('signUpSeller', {
    templateUrl: '/javascripts/app/authentication/sign-up-seller.template.html',
    controller: ['$location', 'Authentication', function SignUpController($location, Authentication){
      var self = this;
      self.submit = function () {
        Authentication.signUpSeller({name: self.name, password: self.password}, function(resp) {
          $location.path('/');
        });
      };
    }],
  }).
  component('signIn', {
    templateUrl: '/javascripts/app/authentication/sign-in.template.html',
    controller: ['$location', 'Authentication', function SignInController($location, Authentication) {
      var self = this;
      self.submit = function () {
        Authentication.signIn({name: self.name, password: self.password}, function(resp) {
          $location.path('/');
        })
      }
    }],
  });