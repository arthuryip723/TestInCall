'use strict';

angular.
  module('personDetail').
  component('personDetail', {
    templateUrl: '/javascripts/app/person-detail/person-detail.template.html',
    controller: ['$routeParams', function PersonDetailController($routeParams) {
      this.personId = $routeParams.personId;
    }],
  });