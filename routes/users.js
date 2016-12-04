var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/', function(req, res, next) {
//   let user = new User({
//     name: req.body.name,
//     password: req.body.password,
//   });
//   user.save(function (err, user) {
//     // i will need to authenticate the user here as well.
//     // don't do that for now let the browser launch another authentication requesst.
//     res.send(user);
//   });
// });

module.exports = router;
