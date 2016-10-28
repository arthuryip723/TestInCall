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

module.exports = router;
