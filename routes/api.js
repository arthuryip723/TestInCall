var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var config = require('../config');

router.use(function(req, res, next) {
  // if (req.originalUrl == '/api/authenticate') {
  if (['/api/authenticate', '/api/users'].indexOf(req.originalUrl) != -1) {
    return next();
  }
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth.'});
});

// router.get('/users', function(req, res) {
//   User.find({}, function(err, users) {
//     // delete users[0].password;
//     // user = users[0].toObject();
//     // delete user.password;
//     // res.json(user);
//     res.json(users);
//   });
// });

router.post('/users', function(req, res, next) {
  let user = new User({
    name: req.body.name,
    password: req.body.password,
    role: req.body.role,
  });
  user.save(function (err, user) {
    // i will need to authenticate the user here as well.
    // don't do that for now let the browser launch another authentication requesst.
    var token = jwt.sign(user, config.secret, {
      expiresIn: '1440m',
    });

    let userJson = user.toObject();
    delete userJson.password;

    // res.json({
    //   success: true,
    //   message: 'Enjoy your token!',
    //   token: token,
    // });
    res.json({success: true, token, user: userJson});
  });
});

router.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name,
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.'});
      } else {
        // var token = jwt.sign(user, app.get('superSecret'), {
        var token = jwt.sign(user, config.secret, {
          expiresIn: '1440m',
        });

        let userJson = user.toObject();
        delete userJson.password;

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token,
          // user,
          user: userJson,
        });
      }
    }
  });
});

module.exports = router;
