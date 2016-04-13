var Bookshelf = require('bookshelf')(pg);
var path = require('path');
var connectionString = require('./connectionString.js');

var pg = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    database: 'karaoke',
    charset: 'utf8'
  }
});

// var db = Bookshelf.initialize({
//   client: 'pg',
//   connection: connectionString
// });

/////User Table/////

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

/////Event Table/////

pg.schema.hasTable('events').then(function(exists) {
  if (!exists) {
    return pg.schema.createTable('events', function(event) {
      event.increments('id').primary();
      event.integer('user_id').references('users.id');
      event.date('date', 4);
      event.time[(p)]('time', 8);
      event.string('type_of_meet', 15);
      event.string('song_title', 20);
      event.string('as_sung_by', 20);
      event.point('location_point', 16);
    }).then(function(table) {
      console.log('Table created! ', table);
    });
  }
});

module.exports = pg;
