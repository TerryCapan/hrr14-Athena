// add funtions for handling event routes
var Event = require('../models/events');
var User = require('../models/user');
var jwt = require('jwt-simple');

module.exports = {

  getLocal: function(req, res, next) {
    next();
  },

  addEvent: function(req, res, next) {
    //the way it is set up now, we need to get username from token
    //or header, then query db and get user id for foreign key.
    //perhaps our foreign key should be users.username instead?
    //see config.js line 44

    // date and time need to get lumped together
    // process date and time
    var date = req.body.date.split('T')[0];
    var time = req.body.time.split('T')[1];

    new User({ id: req.user.id }).fetch().then(function(user) {
      return user.events().create({
        time: date + ' ' + time,
        type_of_meet: req.body.type_of_meet,
        song_title: req.body.song_title,
        as_sung_by: req.body.as_sung_by,
        location_point: req.body.location_point
      });
    })
    .then(function(event) {
      console.log('saved event');
      // res.status(201);
      res.status(201).send(event);
    });
  },

  getOneEvent: function(req, res, next) {

    new Event({ id: req.params.eventId }).fetch({
      withRelated: ['user']
    }).then(function(event) {
      if (event) {
        res.status(200).send(event);
      } else {
        res.status(404).send('event not found');
      }
    });

  },

  // THIS NEEDS TO GET BUILT OUT
  getEvents: function(req, res, next) {
    new Event()
      .fetchAll({
        withRelated: ['user']
      })
      .then(function(events) {
        res.status(200).send(events);
      }).catch(function(err) {
        console.log(err);
        res.status(404).send('event not found');
      });
  }

};
