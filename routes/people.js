var express = require('express');
var router = express.Router();
var Person = require('../models/person.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  Person.find(function(err, people) {
    res.send(people);
  });
});

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

module.exports = router;
