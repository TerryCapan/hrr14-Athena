var db = require('../config.js');
var Bookshelf = require('bookshelf')(db);
var User = require('../models/user.js');

var Users = Bookshelf.Collection.extend({
  model: User
});

//new db.Collection();

//Users.model = User;

module.exports = Users;
