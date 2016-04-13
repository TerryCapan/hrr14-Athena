angular.module('karaoke.services')

.factory('eventFactory', function($http) {
  var addEvent = function(event) {
    return $http({
      method: 'POST',
      url: '/api/event',
      data: event
    })
    .then(function(response) {
      return response.data;
    });
  };

  var getOne = function(id) {
    return $http({
      method: 'GET',
      url: '/api/event/' + id
    })
    .then(function(response) {
      return response.data;
    });
  };

  var getAll = function() {
    return $http({
      method: 'GET',
      url: 'api/events'
    })
    .then(function(response) {
      return response.data;
    });
  };

  var parseTime = function(timestamp) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var date = new Date(timestamp);

    var meridian = 'AM';
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (hours === 0) {
      hours = 12;
    } else if (hours === 12) {
      meridian = 'PM';
    } else if (hours > 12) {
      hours = hours - 12;
      meridian = 'PM';
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    var day = weekdays[date.getDay()];
    day += ', ' + months[date.getMonth()];
    day += ' ' + date.getDate();

    var time = '' + hours;
    time += ':' + minutes;
    time += ' ' + meridian;

    return {
      day: day,
      time: time
    };
  };

  var populateEvents = function (data) {
    var eventsArr = [];
    data.forEach(function(e, i, a) {
      var eventObj = {};
      var date = parseTime(e.time);
      eventObj.fullTime = e.time;
      eventObj.creator = e.user.username;
      eventObj.song = e.song_title;
      eventObj.artist = e.as_sung_by;
      eventObj.date = date.day;
      eventObj.time = date.time;
      eventsArr.push(eventObj);
    });
    return eventsArr;
  };

  return {
    addEvent: addEvent,
    getOne: getOne,
    getAll: getAll,
    parseTime: parseTime,
    populateEvents: populateEvents
  };
});
