angular.module('karaoke.event', [])

.controller('eventCtrl', function($scope, $stateParams, eventFactory, $sce) {

  $scope.creator = '';
  $scope.song = '';
  $scope.artist = '';
  $scope.date = '';
  $scope.time = '';
  $scope.type = '';

  eventFactory.getOne($stateParams.eventID)
  .then(function(response) {
    var date = eventFactory.parseTime(response.time);
    $scope.creator = response.user.username;
    $scope.song = response.song_title;
    $scope.artist = response.as_sung_by;
    $scope.type = response.type_of_meet;
    $scope.date = date.day;
    $scope.time = date.time;
    $scope.video = $sce.trustAsResourceUrl('http://www.youtube.com/embed?listType=search&list=' + response.as_sung_by + ' ' + response.song_title);
    rendermap(response.lat, response.long);
  });

  var rendermap = function(lat, long) {
    var map = L.map('event_map').setView([lat, long], 15);  //<-- zoom level, larger is zoomed in
    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }).addTo(map);
    var micIcon = L.icon({
      iconUrl: 'src/assets/images/mic.svg',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
    var marker = L.marker([lat, long], { icon: micIcon });
    marker.addTo(map);
  };

});
