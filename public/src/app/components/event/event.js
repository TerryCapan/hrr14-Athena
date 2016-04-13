angular.module('karaoke.event', [])

.controller('eventCtrl', function($scope, $stateParams, eventFactory) {

  $scope.creator = '';
  $scope.song = '';
  $scope.artist = '';
  $scope.date = '';
  $scope.time = '';

  eventFactory.getOne($stateParams.eventID)
  .then(function(response) {
    var date = parseTime(response.time);
    $scope.creator = response.user.username;
    $scope.song = response.song_title;
    $scope.artist = response.as_sung_by;    
    $scope.date = date.day;
    $scope.time = date.time;
  });

  function parseTime(timestamp) {
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
      day : day,
      time : time
    };
  }

});