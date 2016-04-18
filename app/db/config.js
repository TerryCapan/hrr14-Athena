var connectionString = require('./connectionString.js');

var pg = require('knex')({
  client: 'pg',
  connection: connectionString
});

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

pg.schema.hasTable('events').then(function(exists) {
  if (!exists) {
    return pg.schema.createTable('events', function(event) {
      event.increments('id').primary();
      event.integer('user_id').references('users.id');
      event.timestamp('time'); 
      event.string('type_of_meet', 15);
      event.string('song_title', 50);
      event.string('as_sung_by', 30);
      event.string('lat', 25);
      event.string('long', 25);
      event.specificType('location_point', 'GEOGRAPHY(point)');
    }).then(function(table) {
      console.log('Table created! ', table);
    });
  }
});

module.exports = pg;
