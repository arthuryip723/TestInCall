var inCall = angular.module('inCall', []);

inCall.controller('PeopleListController', function PeopleListController($scope) {
  $scope.people = [{
    name: 'Amy',
  }, {
    name: 'Tracy',
  }];
});