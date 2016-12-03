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

      self.rating = "3";

      self.averageRating = function() {
        if (!self.person.comments) return 0;
        let sum = 0;
        self.person.comments.forEach(function(val, idx) {
          sum += val.rating;
        });
        return sum / self.person.comments.length;
      };

      self.submit = function() {
        console.log("submitting...");
        console.log(self.content);
        // submit the comment to server
        // first build a resource for accessing comments
        console.log(self.rating);
        Comment.save({id: $routeParams.personId}, {content: self.content, rating: self.rating}, function(comment) {
          self.person.comments.push(comment);
        });
        self.content = '';
      };
    }],
  });