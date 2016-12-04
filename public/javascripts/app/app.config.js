angular.module('inCallApp').
factory('tokenInterceptor', ['$cookies', function tokenInterceptor($cookies) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($cookies.token) {
        config.headers.Authorization = 'Bearer ' + $cookies.token;
      }
      return config;
    },
  };
}]).
config(['$locationProvider', '$routeProvider', '$httpProvider',
  function config($locationProvider, $routeProvider, $httpProvider) {
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
      otherwise('/people');
    $httpProvider.interceptors.push('tokenInterceptor');
  }
]);