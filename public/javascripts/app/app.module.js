'use strict';

var app = angular.module('inCallApp', [
  'ngRoute',
  'angularFileUpload',
  'ngFileUpload',
  'core',
  'peopleList',
  'personDetail',
  'authentication',
  // 'login',
  'header',
  // 'ui.bootstrap',
]);

app.controller('flashCtrl', ['Flash', function(Flash) {
	var self = this;
	// self.message = "Some errors!";
	self.flash = Flash;
}]);

app.controller('headerCtrl', ['Authentication', function(Authentication) {
  var self = this;
  self.isSignedIn = Authentication.isSignedIn;
  self.getUserName = Authentication.getUserName;
  self.isSeller = Authentication.isSeller;
  self.submit = function() {
    Authentication.signIn({name: self.name, password: self.password});
  };
  self.signOut = Authentication.signOut;
}]);