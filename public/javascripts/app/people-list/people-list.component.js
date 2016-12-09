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
    controller: ['$location', '$scope', 'People', function PersonNewController($location, $scope, People) {
      var self = this;
      self.imageSource = 'abc';
      self.submit = function () {
        People.save({}, {name: self.name}, function(person) {
          // $window.location.href = '/';
          $location.path('/');
        })
      };
      self.updateImage = function (event) {
        // console.log('changing...');
        // alert('changing...');
        // First get the element.
        // console.log(element);
        // console.log(element.files);
        self.currentFile = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
          // alert('hello');
          // console.log(event.target.result);
          self.imageSource = event.target.result;
          // self.$apply();
          // console.log(self.imageSource);
          // alert('hello');
          // self.imageSource = 'def';
          $scope.$apply();
          // console.log(self.imageSource);
        };

        reader.readAsDataURL(event.target.files[0]);
      };
      // self.change1 = function (event) {
      //   console.log(self.imageSource);
      //   alert('hello');
      //   console.log(self.imageSource);
      //   // self.imageSource = "def";
      // };
    }],
  });;