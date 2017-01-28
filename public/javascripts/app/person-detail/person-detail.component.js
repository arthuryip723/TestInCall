'use strict';

angular.
  module('personDetail').
  component('personDetail', {
    templateUrl: '/javascripts/app/person-detail/person-detail.template.html',
    controller: ['$routeParams', '$http', 'People', 'Comment', 'Review', 'Flash', 'Authentication', function PersonDetailController($routeParams, $http, People, Comment, Review, Flash, Authentication) {
    // controller: ['$routeParams', '$http', 'People', 'Comment', 'Review', 'Authentication', function PersonDetailController($routeParams, $http, People, Comment, Review, Authentication) {
      var self = this;
      // this.personId = $routeParams.personId;
      // self.Math = Math;
      self.Authentication = Authentication;

      self.currentPage = 1;

      self.person = People.get({id: $routeParams.personId}, function(person) {
        // console.log(arguments);
        // don't show the comment when first load
        // set a flag for each review to be false at first
        // load comment will toggle that flag
        self.totalPages = Math.ceil(person.reviews.length / 5);
      });

      self.reviews = Review.query({ personId: $routeParams.personId });
      // self.reviewsCount = Review.get({id: $routeParams.personId, });
      /*$http({
        method: 'GET',
        url: '/api/people/'+ $routeParams.personId + '/reviews_count',
      }).then(function (resp) {
        console.log(resp);
      });*/

      // Review.count({ personId: $routeParams.personId }, function (resp) {
      //   // console.log(resp);
      //   self.reviewsCount = resp.count;
      //   // console.log(reviewsCount);
      // });

      self.rating = "3";

      // self.maxReviewPage = function () {
      //   // debugger
      //   return Math.ceil(self.totalPages / 5) || 1;
      // };

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
        Review.save({personId: $routeParams.personId}, { content: self.content, rating: self.rating }, function(review) {
          // self.reviews.unshift(review);
          // self.reviews = self.reviews.slice(0, 5);
          self.reviewPage(1);
          // Flash.dismiss();
        }, function(resp) {
          // console.log(resp.data.error);
          // Flash.setMessage(resp.data.error);
          // console.log(Flash.getM}}}essage());
        });
        self.content = '';
        Review.count({ personId: $routeParams.personId }, function (resp) {
          self.totalPages = Math.ceil(resp.count / 5);
        });
      };

      self.testFlash = function () {
        var message = '<strong> Well done!</strong>  You successfully read this important alert message.';
        var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
      };

      self.clearFlash = function () {
        Flash.clear();
      };

      self.loadComments = function (review) {
        // console.log('loading', id);
        // find commentSet
        // review.commentSet = {
        //   id: 1,
        //   comments: [{content: 'comment 1'}, {content: 'comment 2'}],
        // };
        // review.commentss = [{content: 'comment 1'}, {content: 'comment 2'}];
        Comment.query({personId: $routeParams.personId, reviewId: review._id}, function(comments) {
          // console.log(arguments);
          // console.log(comments);
          review.comments = comments;
          review.commentsDisplayed = true;
          review.currentPage = 1;
        }, function(resp) {
          // console.log(arguments);
        });

        Comment.count({ personId: $routeParams.personId, reviewId: review._id}, function(resp) {
          review.totalPages = Math.ceil(resp.count / 5);
        });
      };

      self.submitComment = function (review) {
        // console.log($routeParams.personId);
        // console.log(review.commentContent);
        Comment.save({personId: $routeParams.personId, reviewId: review._id}, {content: review.commentContent}, function(comment) {
          // review.comments.push(comment);
          // review.comments.unshift(comment);
          // review.comments = review.comments.slice(0, 5);
          Comment.count({ personId: $routeParams.personId, reviewId: review._id}, function(resp) {
            review.totalPages = Math.ceil(resp.count / 5);
            self.commentPage(review, review.totalPages);
            review.commentContent = '';
            // Flash.dismiss();
          });
        }, function(resp) {
          // console.log(arguments);
          // Flash.setMessage(resp.data.error);
        });
      };

      self.prevReviews = function () {
        self.currentPage -= 1;
        self.currentPage = self.currentPage >= 0 ? self.currentPage : 0;
        Review.query({personId: $routeParams.personId, page: self.currentPage}, function(reviews) {
          self.reviews = reviews;
        });
      };

      self.nextReviews = function () {
        // console.log(self.currentPage);
        self.currentPage += 1;
        self.currentPage = self.currentPage <= self.totalPages ? self.currentPage : self.totalPages;
        // console.log(self.currentPage);
        Review.query({personId: $routeParams.personId, page: self.currentPage}, function(reviews) {
          self.reviews = reviews;
        });
      };

      self.prevComments = function (review) {
        review.currentPage = review.currentPage || 1;
        review.currentPage -= 1;
        if (review.currentPage < 1) review.currentPage = 1;
        review.comments = Comment.query({personId: $routeParams.personId, reviewId: review._id, page: review.currentPage});
      };

      self.nextComments = function (review) {
        review.currentPage = review.currentPage || 1;
        review.currentPage += 1;
        // let totalPages = Math.ceil(review.comments.length / 5);
        // if (review.currentPage > totalPages) review.currentPage = totalPages;
        review.comments = Comment.query({personId: $routeParams.personId, reviewId: review._id, page: review.currentPage});
      };

      self.commentPage = function (review, page) {
        review.comments = Comment.query({personId: $routeParams.personId, reviewId: review._id, page }, function(comments) {
          review.currentPage = page;
        });
        Comment.count({personId: $routeParams.personId, reviewId: review._id}, function(resp) {
          review.totalPages = Math.ceil(resp.count / 5);
        });
      };

      self.reviewPage = function (page) {
        // console.log(page);
        Review.query({personId: $routeParams.personId, page}, function(reviews) {
          self.reviews = reviews;
          self.currentPage = page;
        });
        Review.count({ personId: $routeParams.personId }, function (resp) {
          self.totalPages = Math.ceil(resp.count / 5);
        });
      };
    }],
  });
