var express = require('express');
var router = express.Router();
var Person = require('../models/person.js');
var Comment = require('../models/comment.js');
var User = require('../models/user.js');
var helpers = require('./helpers.js');

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

router.post('/', function(req, res, next) {
  // find the current user
  // console.log(req.decoded);
  // console.log(req.decoded.get('_id'));
  var user = User.findById(req.decoded._doc._id, function(err, user) {
    // console.log(user);
    var person = new Person({
      name: req.body.name,
      user: user._id,
    });
    person.save(function(err, person) {
      user.people.push(person);
      user.save(function(err, user) {
        res.send(person);
      });
    });
  });
});

module.exports = router;
