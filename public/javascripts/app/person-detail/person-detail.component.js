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
    }],
  });