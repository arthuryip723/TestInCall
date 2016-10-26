var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', require('connect-ensure-login').ensureLoggedIn());

router.get('/hello', function(req, res, next) {
  res.send('say hello ' + req.user.password);
});

router.get('/hello2', function(req, res, next) {
  res.json({hello:'world'});
});

module.exports = router;
