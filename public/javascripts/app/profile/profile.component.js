'use strict';

angular.
  module('profile').
  component('profile', {
    templateUrl: '/javascripts/app/profile/profile.template.html',
    controller: [function ProfileController() {
      var self = this;

      self.submit = function () {
        alert('hello!');
      };
    }],
  });
