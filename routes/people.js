var express = require('express');
var router = express.Router();
var Person = require('../models/person.js');
var Comment = require('../models/comment.js');
var Review = require('../models/review.js');
var User = require('../models/user.js');
var helpers = require('./helpers.js');
var multer = require('multer');
// var fs = require('fs');

// var storage = multer.diskStorage({
//   destination: function(req, file, cb){
//     console.log('destination called...');
//     cb(null, '/Users/ayip/Documents/codes/tmp/');
//   },
//   filename: function(req, file, cb) {
//     console.log("filename called...");;
//     cb(null, file.fieldname + '-' + Date.now());
//   },
// });
// var upload = multer({ storage: storage }).single('file');
// var fileUpload = require('express-fileupload');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        // cb(null, './uploads/');
        cb(null, './public/uploads');
      // cb(null, '/Users/ayip/Documents/codes/tmp/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

// var upload = multer({ //multer settings
//                 storage: storage
//             }).single('file');
// var upload = multer({ //multer settings
//                 storage: storage
//             }).array('files', 8);
var upload = multer({ //multer settings
                storage: storage
            }).fields([{name: 'avatar', maxCount: 1}, {name: 'gallery', maxCount: 8}]);

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  // Person.find(function(err, people) {
  //   res.send(people);
  // });
  // console.log(req.query.order);
  let sortByObj = req.query.order == 'newest' ? {'created_at': -1} : {'avgRating': -1};
  Person.aggregate([{
    '$project':{
        'name': 1,
        'avatar': 1,
        'avgRating': {
            '$avg': '$reviews.rating'
            },
        'created_at': 1,
        },
    // }, {'$sort': {'avgRating': -1}}]).exec(function(err, people) {
    }, {'$sort': sortByObj }]).exec(function(err, people) {
    res.send(people);
  });
});

router.post('/:id/comments', function(req, res, next) {
  // console.log(req.body);
  Person.findById(req.params.id, function(err, person) {
    // res.send({result: 'success'});
    var comment = new Comment({
      content: req.body.content,
      person: person._id,
      rating: req.body.rating,
    });
    comment.save(function(err, comment){
      person.comments.push(comment);
      person.save(function(err, person){
        res.send(comment);
      });
    });
  }); 
});

router.post('/:id/reviews', helpers.authenticate);
router.post('/:id/reviews', function(req, res, next) {
  // avoid duplicate author
  Review.find({ person: req.params.id, author: req.decoded._doc._id }).exec(function(err, review) {
    if (review) {
      res.send({success: false});
    } else {
      Person.findById(req.params.id).exec(function(err, person) {
        let review = new Review({
          content: req.body.content,
          rating: req.body.rating,
          person: req.params.id,
          author: req.decoded._doc._id,
        });

        review.save(function(err, review) {
          person.reviews.push(review._id);
          person.save(function(err, person) {
            res.send(review);
          });
        });
      });
    }
  });
});

router.get('/:id/reviews/:reviewId/comments', function(req, res, next) {
  // res.send({result: 'success'});
  // Person.findOne({_id: req.params.id}, {'reviews': {$elemMatch: {_id: req.params.reviewId}}}).exec(function(err, person) {
  //   res.send(person.reviews[0].comments);
  // });
  Comment.find({review: req.params.reviewId}).exec(function(err, comments) {
    res.send(comments);
  });
});

router.post('/:id/reviews/:reviewId/comments', helpers.authenticate);
router.post('/:id/reviews/:reviewId/comments', function(req, res, next) {
  // console.log(req.body);
  // res.send({content: req.body.content});
  // res.send({content: 'success'});
  // Person.findOne({_id: req.params.id}, {'reviews': {$elemMatch: {_id: req.params.reviewId}}}).exec(function(err, person) {
  //   let length = person.reviews[0].comments.push({content: req.body.content, author: req.decoded._doc._id})
  //   // console.log(person);
  //   person.save(function (err, person) {
  //     // console.log('-------------------');
  //     // console.log(person.reviews[0].comments);
  //     // console.log(index);
  //     res.send(person.reviews[0].comments[length - 1]);
  //   });
  // });
  Review.findById(req.params.reviewId).exec(function(err, review) {
    let comment = new Comment({
      content: req.body.content,
      review: req.params.reviewId,
      author: req.decoded._doc._id,
    });
    comment.save(function(err, comment) {
      review.comments.push(comment._id);
      review.save(function(err, review) {
        res.send(comment);
      });
    });
  });
});

router.get('/:id', helpers.authenticate);

router.get('/:id', function(req, res, next) {
  // res.send({abc:'def'});
  // Person.findOne({_id: req.params.id}, function(error, person) {
  //   Person.populate(person, {path: 'comments'}, function(error, person) {
  //     // res.json({id: req.params.id, abc: 'def'});
  //     res.send(person);
  //   });
  // })
  // Person.findById(req.params.id, {'reviews.comments': 0}).populate('comments').exec(function(err, person) {
  Person.findById(req.params.id).populate('reviews').exec(function(err, person) {
    res.send(person);
  });
});

router.post('/', helpers.authenticate);

// router.post('/', upload.array('images', 8), function(req, res, next) {
// router.post('/', upload.single('image'), function(req, res, next) {
router.post('/', upload, function(req, res, next) {
// router.post('/', function(req, res, next) {
  // find the current user
  // console.log(req.decoded);
  // console.log(req.decoded.get('_id'));
  // console.log(req.body.name);
  // console.log(req);
  // var sampleFile = req.body.image;
  // sampleFile.mv('/Users/ayip/Documents/codes/tmp/sample.jpg', )
  // console.log(req.files);
  // res.send({__v: 0, _id: "584d664671334ab4af88b72b", comments: [], name: "fdsafs", user: "58447b94d1c17470ebd7b3c8"})
  var user = User.findById(req.decoded._doc._id, function(err, user) {
    // console.log(user);
    // get the files from the request.
    // for (var i = 0; i < req.files.images.length; i++) {
    //   // req.imageIns[i];
    // }
    let gallery = req.files.gallery ? req.files.gallery.map(function (file) {
        return file.filename;
      }) : []
    var person = new Person({
      name: req.body.name,
      description: req.body.description,
      phone: req.body.phone,
      user: user._id,
      gallery,
      avatar: req.files.avatar[0].filename,
    });
    person.save(function(err, person) {
      user.people.push(person);
      user.save(function(err, user) {
        res.send(person);
      });
    });
  });
  // fs.writeFile("./public/log.txt", req, function(err) {
  //     if(err) {
  //         return console.log(err);
  //     }

  //     console.log("The file was saved!");
  // });
  /*upload(req,res,function(err){
    // console.log(req.body);
    if(err){
         res.json({error_code:1,err_desc:err});
         return;
    }
     res.json({error_code:0,err_desc:null});
     // res.json(req);
  });*/
});

module.exports = router;
