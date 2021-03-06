var express = require('express');
var router = express.Router();

var utils = require('../../utils');

var models = require('../../models');
var User = models.User;

function invalid_type(req, res, next) {
  res.status(401).send('Invalid request type');
}

router.get('/login', invalid_type);
router.get('/logout', invalid_type);

router.post('/login', function(req, res, next) {
  var email = req.body.email;

  req.session.currentUser = email;
  console.log('Welcoming ' + email);
  res.send('Welcome ' + req.session.currentUser);
});

router.post('/logout', function(req, res, next) {
  req.session.currentUser = null;
  req.session.destroy(function(err) {});
  res.send('Logged out');
});

router.buttons = {
  login: {
    onclick: '',
  },
  logout: {
    onclick: '',
  }
};

router.middleware = function(req, res, next) {
  next();
};

module.exports = router;
