var express = require('express');
var router = express.Router();
var Person = require('../models/person.js');
var Comment = require('../models/comment.js');
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
            }).fields([{name: 'avatar', maxCount: 1}, {name: 'files', maxCount: 8}]);

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  Person.find(function(err, people) {
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

router.get('/:id', helpers.authenticate);

router.get('/:id', function(req, res, next) {
  // res.send({abc:'def'});
  // Person.findOne({_id: req.params.id}, function(error, person) {
  //   Person.populate(person, {path: 'comments'}, function(error, person) {
  //     // res.json({id: req.params.id, abc: 'def'});
  //     res.send(person);
  //   });
  // })
  Person.findById(req.params.id).populate('comments').exec(function(err, person) {
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
  console.log(req.files);
  // res.send({__v: 0, _id: "584d664671334ab4af88b72b", comments: [], name: "fdsafs", user: "58447b94d1c17470ebd7b3c8"})
  var user = User.findById(req.decoded._doc._id, function(err, user) {
    // console.log(user);
    // get the files from the request.
    // for (var i = 0; i < req.files.images.length; i++) {
    //   // req.imageIns[i];
    // }
    var person = new Person({
      name: req.body.name,
      user: user._id,
      images: req.files.files.map(function (file) {
        return file.filename;
      }),
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
