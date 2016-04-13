// var Bookshelf = require('bookshelf')(pg);
// var path = require('path');
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
      //perhaps we want to set user_id column to username to have it readily
      //available for display? might make queries simpler
      event.integer('user_id').references('users.id');
      event.timestamp('time'); //defaults to postgres-timestamptz which includes time, date and time zone
      event.string('type_of_meet', 15);
      event.string('song_title', 50);
      event.string('as_sung_by', 30);
      event.specificType('location_point', 'point');
      //specificType is the only option that allows choosing types
      //that arent available in knex. http://knexjs.org/#Schema-Building
      //it does require passing a valid postgres type as the second arg
      //or it fails to build, so it's certianly a step in the right direction
      //queries may be tricky or maybe not...
    }).then(function(table) {
      console.log('Table created! ', table);
    });
  }
});

module.exports = pg;
