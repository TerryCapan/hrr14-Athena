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
      //perhaps we want to set user_id column to username to have it readily
      //available for display? might make queries simpler
      event.integer('user_id').references('users.id');
      event.timestamp('time'); //defaults to postgres-timestamptz which includes time, date and time zone
      event.string('type_of_meet', 15);
      event.string('song_title', 20);
      event.string('as_sung_by', 20);
      event.specificType('location_point', 'point');
      //specificType is the only knex option that allows choosing types
      //that arent supported by knex. http://knexjs.org/#Schema-Building
      //if this isn't sufficient, we'll have to figure out using knex-postgis
      //or knex.raw(). neither of which i fully comprehend
      //or do a dreaded refactor to mongo, or use postgres without bookshelf
    }).then(function(table) {
      console.log('Table created! ', table);
    });
  }
});

module.exports = pg;
