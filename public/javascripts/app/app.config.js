angular.module('inCallApp').
factory('tokenInterceptor', ['$q', '$cookies', '$location', /*'Authentication',*/ function tokenInterceptor($q, $cookies, $location/*, Authentication*/) {
  return {
    request(config) {
      // console.log('intercepting...');
      config.headers = config.headers || {};
      if ($cookies.get('token')) {
        // console.log($cookies.get('token'));
        // config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        config.headers['x-access-token'] = $cookies.get('token');
      }
      return config;
    },
    responseError(rejection) {
      // if (rejection.status === 401)
      //   Authentication.signOut();
      // use authentication to logout
      if (rejection.status === 401){
        $cookies.remove('token');
        $cookies.remove('user');
        $location.path('/signin');
      }
      return $q.reject(rejection);
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
        template: '<sign-up></sign-up>',
      }).
      when('/signin', {
        template: '<sign-in></sign-in>'
      }).
      otherwise('/people');
    $httpProvider.interceptors.push('tokenInterceptor');
  }
]).
run(['$rootScope', '$location', 'Authentication', function run($rootScope, $location, Authentication) {
  // $rootScope.globals = $cookieStore.get('globals') || {};
  // if ($rootScope.globals.currentUser) {
  //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
  // }

  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    var restrictedPage = $.inArray($location.path(), ['/', '/people', '/signin', '/signup']) === -1;
    if (restrictedPage && !Authentication.isSignedIn()) {
      $location.path('/signin');
    }
  });
}]);