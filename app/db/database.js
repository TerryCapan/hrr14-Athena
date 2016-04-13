var pg = require('./config');
var bookshelf = require('bookshelf')(pg);

bookshelf.plugin('registry');

module.exports = bookshelf;