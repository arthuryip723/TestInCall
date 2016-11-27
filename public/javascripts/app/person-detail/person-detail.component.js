'use strict';

angular.
  module('personDetail').
  component('personDetail', {
    templateUrl: '/javascripts/app/person-detail/person-detail.template.html',
    controller: ['$routeParams', 'People', 'Comment', function PersonDetailController($routeParams, People, Comment) {
      var self = this;
      // this.personId = $routeParams.personId;

      self.person = People.get({id: $routeParams.personId}, function(person) {

      });

      self.submit = function() {
        console.log("submitting...");
        console.log(self.content);
        // submit the comment to server
        // first build a resource for accessing comments
        Comment.save({id: $routeParams.personId}, {content: self.content}, function(comment) {
          self.person.comments.push(comment);
        });
        self.content = '';
      };
    }],
  });