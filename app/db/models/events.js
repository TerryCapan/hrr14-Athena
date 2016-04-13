// var db = require('../config.js');
var Bookshelf = require('../database')
// var path = require('path');
require('./user');

var Event = Bookshelf.Model.extend({
  tableName: 'events',

  user: function() {
    return this.belongsTo('User');
  }

});

module.exports = Bookshelf.model('Event', Event);
