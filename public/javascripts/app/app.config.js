angular.module('inCallApp').config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when('/people', {
        template: '<people-list></people-list>'
      }).
      when('/person/:personId', {
        template: '<person-detail></person-detail>'
      }).
      when('/login', {
        template: '<login></login>'
      }).
      otherwise('/people')
  }
]);