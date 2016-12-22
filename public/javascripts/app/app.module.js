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
]);

app.controller('flashCtrl', ['Flash', function(Flash) {
	var self = this;
	// self.message = "Some errors!";
	self.flash = Flash;
}]);