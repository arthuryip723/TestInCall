var express = require('express');
var router = express.Router();
var Comment = require('../models/comment.js');

router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  Comment.find(function(err, comments) {
    res.send(comments);
  });
})

router.get('/:userId', function(req, res, next) {
  Comment.find({person: req.params.userId}, function(err, comments) {
    Comment.populate(comments, {path: 'person'}, function(err, comments) {
      res.send(comments);
    });
  });
});

module.exports = router;
