var express = require('express');
var router = express.Router();
var Comment = require('../models/comment.js');
var Person = require('../models/person.js');

router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  Comment.find(function(err, comments) {
    res.send(comments);
    // res.send('hello world!');
  });
});

router.get('/by_name/:name', function(req, res, next){
  // console.log('hello world');
  // console.log(req.params.name);
  Person.findOne({'name': req.params.name}, function(err, person) {
    // console.log(person);
    // res.send('hello');
    // res.send(person);
    Comment.find({person: person._id}, function(err, comments) {
      res.send(comments);
    }); 
  });
});

router.get('/:userId', function(req, res, next) {
  Comment.find({person: req.params.userId}, function(err, comments) {
    Comment.populate(comments, {path: 'person'}, function(err, comments) {
      res.send(comments);
    });
  });
});

module.exports = router;
