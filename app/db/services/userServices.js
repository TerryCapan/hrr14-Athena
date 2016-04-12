var db = require('../config.js');
var User = require('../models/user.js');
var Users = require('../collections/users.js');
var jwt = require('jwt-simple');

module.exports = {
  login: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    new User({ username: username })
      .fetch()
      .then(function(user) {
        if (!user) {
          res.redirect('/login');
        } else {
          user.comparePassword(password, function(match) {
            if (match) {
              var token = jwt.encode(user, 'secret');
              res.json({token: token});
            } else {
              res.redirect('/login');
            }
          });
        }
      });
  },

  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    new User({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save()
          .then(function(newUser) {
          //newUser = new Users //Users.add(newUser);
            var token = jwt.encode(user, 'secret');
            res.json({token: token});
          });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
  },

  //not completely sure where to use checkAuth
  //it was used in shortly to confirm that token
  //is for a real/existing username

  // could use something very similar for getting username
  // when creating an event
  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      new User({username: user.username})
        .fetch()
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};
