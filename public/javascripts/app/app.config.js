angular.module('inCallApp').config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when('/people', {
        template: '<people-list></people-list>'
      }).
      when('/people/new', {
        template: '<person-new></person-new>'
      }).
      when('/person/:personId', {
        template: '<person-detail></person-detail>'
      }).
      when('/signup', {
        template: '<sign-up></sign-up',
      }).
      when('/login', {
        template: '<login></login>'
      }).
      otherwise('/people')
  }
]);