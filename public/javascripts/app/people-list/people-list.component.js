'use strict';
angular.
  module('inCallApp').
  directive('customOnChange', function() {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeFunc = scope.$eval(attrs.customOnChange);
        element.bind('change', onChangeFunc);
      }
    };
  })/*.
  directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
  }])*/;

angular.
  module('peopleList').
  component('peopleList', {
    templateUrl: '/javascripts/app/people-list/people-list.template.html',
    controller: ['$http', '$routeParams', '$location', 'People', function PeopleListController($http, $routeParams, $location, People) {
    // controller: ['$http', function PeopleListController($http) {
      var self = this;
      // $http.get('api/people/').then(function(response) {
      //   self.people = response.data;
      // });
      self.orderBy = $routeParams.order || 'rating';
      // self.people = People.query({order: 'rating'});
      self.people = People.query({order: self.orderBy});

      self.changeOrderBy = function () {
        // console.log(self.orderBy);
        $location.search('order', self.orderBy);
        self.people = People.query({order: self.orderBy});
      };
    }],
  }).
  component('personNew', {
    templateUrl: '/javascripts/app/people-list/person-new.template.html',
    controller: ['$location', '$scope', '$http', 'People', 'Upload', function PersonNewController($location, $scope, $http, People, Upload) {
      var self = this;
      // self.files = [];
      // self.avatarPreview = {};
      self.gallery = [{ src: ''},];
      // self.imagesName = [];
      // self.imageSource = 'abc';
      self.submit = function () {
        // console.log(self.imageIns);
        // console.log(self.imageNames);
        // console.log(self.name);
        // console.log(self.myName);
        // return;
        // People.save({}, formData, function(person) {
        // // People.save({}, {name: self.name, image: self.imageIns[0]}, function(person) {
        // // People.save({}, {name: self.name, files: { images: self.imageIns }}, function(person) {
        // // People.save({}, {name: self.name, images: self.imageIns }, function(person) {
        //   // $window.location.href = '/';
        //   $location.path('/');
        // });
        // var formData = new FormData();
        // formData.append('name', self.name);
        // formData.append('image', self.imageIns[0]);
        // $http({
        //   method: 'POST',
        //   url: 'api/people/',
        //   data: formData,
        //   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        // }).then(function(resp) {
        //   // $location.path('/');
        //   console.log('success');
        // });
        // debugger
        let galleryData = self.gallery.map(function(el) {
          return el.input;
        });
        Upload.upload({
          url: 'api/people/',
          arrayKey: '',
          // objectKey: '.k',
          // data: {file: self.file, name: self.name},
          // data: {file: self.file, name: 'amy'},
          // data: {files: [self.file, self.file2], name: 'amy'},
          data: {
            gallery: galleryData,
            avatar: self.avatar,
            name: self.name,
            description: self.description,
            phone: self.phone,
          },
          // fields: {name: self.name},
        }).then(function (resp) {
          $location.path('/');
          // console.log('success');
        });
      };
      self.updateImage = function (event1) {
        // Take care of the situation where you cancel choosing the file.
        self.currentFile = event1.target.files[0];
        var reader = new FileReader();

        reader.onload = function(event2) {
          // self.imageSource = event.target.result;
          self.gallery[event1.target.dataset.index].src = event2.target.result;
          $scope.$apply();
        };

        reader.readAsDataURL(event.target.files[0]);
      };

      self.updateAvatar = function (event1) {
        // Take care of the situation where you cancel choosing the file.
        self.currentFile = event1.target.files[0];
        var reader = new FileReader();

        reader.onload = function(event2) {
          // self.imageSource = event.target.result;
          // self.avatar.src = event2.target.result;
          self.avatarSrc = event2.target.result;
          $scope.$apply();
        };

        reader.readAsDataURL(event.target.files[0]);
      };

      self.addImage = function ($event) {
        $event.preventDefault();
        self.gallery.push({ src: '' });
      };

      self.removeImage = function ($event) {
        $event.preventDefault();
        // need to find the key here
        // debugger;
        // figure out how to delete an element in an array
        self.gallery.splice($event.target.dataset.index, 1);
      };

      // self.change1 = function (event) {
      //   console.log(self.imageSource);
      //   alert('hello');
      //   console.log(self.imageSource);
      //   // self.imageSource = "def";
      // };
    }],
  });;