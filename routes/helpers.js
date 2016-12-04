var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = {
  authenticate(req, res, next) {
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
  }
};