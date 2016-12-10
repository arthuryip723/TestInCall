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
      self.images = [{ src: '' },];
      // self.imageSource = 'abc';
      self.submit = function () {
        People.save({}, {name: self.name}, function(person) {
          // $window.location.href = '/';
          $location.path('/');
        })
      };
      self.updateImage = function (event1) {
        // console.log('changing...');
        // alert('changing...');
        // First get the element.
        // console.log(element);
        // console.log(element.files);
        self.currentFile = event1.target.files[0];
        var reader = new FileReader();

        reader.onload = function(event2) {
          // self.imageSource = event.target.result;
          self.images[event1.target.dataset.index].src = event2.target.result;
          $scope.$apply();
        };

        reader.readAsDataURL(event.target.files[0]);
      };

      self.addImage = function ($event) {
        $event.preventDefault();
        self.images.push({ src: '' });
        // console.log('adding image...');

      };
      // self.change1 = function (event) {
      //   console.log(self.imageSource);
      //   alert('hello');
      //   console.log(self.imageSource);
      //   // self.imageSource = "def";
      // };
    }],
  });;