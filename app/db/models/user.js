var db = require('../config.js');
var Bookshelf = require('bookshelf')(db);
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  comparePassword: function (attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },

  initialize: function() {
    var self = this;
    this.on('creating', function() {
      var password = this.get('password');
      return new Promise(function (resolve, reject) {
        bcrypt.hash(password, null, null, function (err, hash) {
          if (err) {
            reject(err);
          } else {
            self.set('password', hash);
            resolve(hash);
            console.log('init', self.get('password'));
          }
        });
      });
    });

  },

});

module.exports = User;
