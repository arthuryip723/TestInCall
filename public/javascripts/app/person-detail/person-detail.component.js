'use strict';

angular.
  module('personDetail').
  component('personDetail', {
    templateUrl: 'person-detail/person-detail.template.html',
    controller: ['$http', function PersonDetailController($http) {
      this.personId = $routParams.personId;
    }],
  });