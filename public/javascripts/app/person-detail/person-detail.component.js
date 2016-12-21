'use strict';

angular.
  module('personDetail').
  component('personDetail', {
    templateUrl: '/javascripts/app/person-detail/person-detail.template.html',
    controller: ['$routeParams', 'People', 'Comment', 'Review', function PersonDetailController($routeParams, People, Comment, Review) {
      var self = this;
      // this.personId = $routeParams.personId;

      self.person = People.get({id: $routeParams.personId}, function(person) {
        // console.log(arguments);
        // don't show the comment when first load
        // set a flag for each review to be false at first
        // load comment will toggle that flag
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
        // console.log("submitting...");
        // console.log(self.content);
        // submit the comment to server
        // first build a resource for accessing comments
        // console.log(self.rating);
        Comment.save({id: $routeParams.personId}, {content: self.content, rating: self.rating}, function(comment) {
          self.person.comments.push(comment);
        });
        self.content = '';
      };

      self.submitReview = function () {
        // console.log('submittin review...');
        // return;
        Review.save({id: $routeParams.personId}, { content: self.content, rating: self.rating }, function(review) {
          self.person.reviews.push(review);
        }, function(resp) {
          console.log(resp.data.error);
        });
        self.content = '';
      };

      self.loadComments = function (review) {
        // console.log('loading', id);
        // find commentSet
        // review.commentSet = {
        //   id: 1,
        //   comments: [{content: 'comment 1'}, {content: 'comment 2'}],
        // };
        // review.commentss = [{content: 'comment 1'}, {content: 'comment 2'}];
        Comment.query({id: $routeParams.personId, reviewId: review._id}, function(comments) {
          // console.log(arguments);
          // console.log(comments);
          review.comments = comments;
          review.commentsDisplayed = true;
        }, function() {
          console.log(arguments);
        });
      };

      self.submitComment = function (review) {
        // console.log($routeParams.personId);
        // console.log(review.commentContent);
        Comment.save({id: $routeParams.personId, reviewId: review._id}, {content: review.commentContent}, function(comment) {
          review.comments.push(comment);
          review.commentContent = '';
        }, function() {
          console.log(arguments);
        });
      }
    }],
  });