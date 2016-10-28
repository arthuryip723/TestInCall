'use strict';

angular.
  module('peopleList').
  component('peopleList', {
    templateUrl: '/javascripts/app/people-list/people-list.template.html',
    controller: ['$http', function PeopleListController($http) {
      var self = this;
      // $http.get('').then(function(response) {
      //   self.people = response.data;
      // });
    }],
  });