'use strict';

angular.
  module('personDetail').
  component('personDetail', {
    templateUrl: '/javascripts/app/person-detail/person-detail.template.html',
    controller: ['$routeParams', 'People', function PersonDetailController($routeParams, People) {
      var self = this;
      // this.personId = $routeParams.personId;

      self.person = People.get({id: $routeParams.personId}, function(person) {

      });

      self.submit = function() {
        console.log("submitting...");
        console.log(self.content);
        // submit the comment to server
        self.content = '';
      };
    }],
  });