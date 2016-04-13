// add funtions for handling event routes
var Event = require('../models/events.js');

module.exports = {

  getLocal: function(req, res, next) {
    next();
  },

  addEvent: function(req, res, next) {
    //the way it is set up now, we need to get username from token
    //or header, then query db and get user id for foreign key.
    //perhaps our foreign key should be users.username instead?
    //see config.js line 44
    var id = req.body.id;
    var date = req.body.date;
    var time = req.body.time;
    var type = req.body.type_of_meet;
    var song = req.body.song_title;
    var sung = req.body.as_sung_by;
    var point = req.body.location_point;

    new Event({ date: date, time: time, location_point: point })
      .fetch()
      .then(function(event) {
        if (!event) {
          var newEvent = new Event({
            user_id: id,
            date: date,
            time: time,
            type_of_meet: type,
            song_title: song,
            as_sung_by: sung,
            location_point: point
          });
          newEvent.save()
            .then(function(event) {
              console.log('Event is saved');
            });
        } else {
          console.log('Event already exists');
        }
      });
  }
};
