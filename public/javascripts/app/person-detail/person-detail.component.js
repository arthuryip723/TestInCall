'use strict';

angular.
  module('personDetail').
  component('personDetail', {
    templateUrl: '/javascripts/app/person-detail/person-detail.template.html',
    controller: ['$routeParams', '$http', 'People', 'Comment', 'Review', 'Flash', 'Authentication', function PersonDetailController($routeParams, $http, People, Comment, Review, Flash, Authentication) {
      var self = this;
      // this.personId = $routeParams.personId;
      self.Authentication = Authentication;

      self.page = 1;

      self.person = People.get({id: $routeParams.personId}, function(person) {
        // console.log(arguments);
        // don't show the comment when first load
        // set a flag for each review to be false at first
        // load comment will toggle that flag
        self.totalPages = Math.ceil(person.reviews.length / 5);
      });

      self.reviews = Review.query({id: $routeParams.personId});
      // self.reviewsCount = Review.get({id: $routeParams.personId, });
      $http({
        method: 'GET',
        url: '/api2/people/'+ $routeParams.personId + '/reviews_count',
      }).then(function (resp) {
        console.log(resp);
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
        // if (Flash.getMessage()) Flash.dismiss();
        // else Flash.setMessage("First Message");
        // console.log(Flash.getMessage());
        // return;
        // console.log('submittin review...');
        // return;
        Review.save({id: $routeParams.personId}, { content: self.content, rating: self.rating }, function(review) {
          // self.person.reviews.push(review);
          // self.reviews.push(review);
          self.reviews.unshift(review);
          self.reviews = self.reviews.slice(0, 5);
          Flash.dismiss();
        }, function(resp) {
          // console.log(resp.data.error);
          Flash.setMessage(resp.data.error);
          // console.log(Flash.getMessage());
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
        }, function(resp) {
          // console.log(arguments);
        });
      };

      self.submitComment = function (review) {
        // console.log($routeParams.personId);
        // console.log(review.commentContent);
        Comment.save({id: $routeParams.personId, reviewId: review._id}, {content: review.commentContent}, function(comment) {
          // review.comments.push(comment);
          review.comments.unshift(comment);
          review.comments = review.comments.slice(0, 5);
          review.commentContent = '';
          Flash.dismiss();
        }, function(resp) {
          // console.log(arguments);
          Flash.setMessage(resp.data.error);
        });
      };

      self.prevReviews = function () {
        self.page -= 1;
        self.page = self.page >= 0 ? self.page : 0;
        Review.query({id: $routeParams.personId, page: self.page}, function(reviews) {
          self.reviews = reviews;
        });
      };

      self.nextReviews = function () {
        // console.log(self.page);
        self.page += 1;
        self.page = self.page <= self.totalPages ? self.page : self.totalPages;
        // console.log(self.page);
        Review.query({id: $routeParams.personId, page: self.page}, function(reviews) {
          self.reviews = reviews;
        });        
      };

      self.prevComments = function (review) {
        review.currentPage = review.currentPage || 1;
        review.currentPage -= 1;
        if (review.currentPage < 1) review.currentPage = 1;        
        review.comments = Comment.query({id: $routeParams.personId, reviewId: review._id, page: review.currentPage});
      };

      self.nextComments = function (review) {
        review.currentPage = review.currentPage || 1;
        review.currentPage += 1;
        // let totalPages = Math.ceil(review.comments.length / 5);
        // if (review.currentPage > totalPages) review.currentPage = totalPages;
        review.comments = Comment.query({id: $routeParams.personId, reviewId: review._id, page: review.currentPage});
      };
    }],
  });