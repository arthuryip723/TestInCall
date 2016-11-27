'use strict';

angular.
  module('peopleList').
  component('peopleList', {
    templateUrl: '/javascripts/app/people-list/people-list.template.html',
    controller: ['$http', 'People', function PeopleListController($http, People) {
    // controller: ['$http', function PeopleListController($http) {
      var self = this;
      // $http.get('api2/people/').then(function(response) {
      //   self.people = response.data;
      // });
      self.people = People.query();
    }],
  });