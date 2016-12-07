'use strict';
angular.module('inCallApp').directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});

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
  }).
  component('personNew', {
    templateUrl: '/javascripts/app/people-list/person-new.template.html',
    controller: ['$location', 'People', function PersonNewController($location, People) {
      var self = this;
      self.submit = function () {
        People.save({}, {name: self.name}, function(person) {
          // $window.location.href = '/';
          $location.path('/');
        })
      };
      self.updateImage = function () {
        console.log('changing...');
        alert('changing...');
      };
    }],
  });;