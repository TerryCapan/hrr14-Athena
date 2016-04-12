var Bookshelf = require('bookshelf')(pg);
var path = require('path');
var connectionString = require('./connectionString.js');

var pg = require('knex')({
  user: 'postgres',
  client: 'pg',
  connection: {
    host: 'localhost',
    port: '5432',
    user: "postgres",
    database: 'karaoke',
    charset: 'utf8'
  }
});


// var db = Bookshelf.initialize({
//   client: 'pg',
//   connection: connectionString
// });



pg.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return pg.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('username', 20);
      user.string('password', 100);
      user.timestamps();
    }).then(function(table) {
      console.log('Table created! ', table);
    });
  }
});




module.exports = pg;
