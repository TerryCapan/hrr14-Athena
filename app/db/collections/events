var db = require('../config.js');
var Bookshelf = require('bookshelf')(db);
var Event = require('../models/events.js');

var Events = Bookshelf.Collection.extend({
  model: Event
});



module.exports = Events;
