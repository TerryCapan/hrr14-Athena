angular.module('karaoke.event', [])

.controller('eventCtrl', function($scope, $stateParams, eventFactory, mapService, $sce) {

  $scope.creator = '';
  $scope.song = '';
  $scope.artist = '';
  $scope.date = '';
  $scope.time = '';
  $scope.type = '';
  $scope.loading = true;
  $scope.loadingMessage = 'retrieving event information';

  eventFactory.getOne($stateParams.eventID)
  .then(function(response) {
    var date = eventFactory.parseTime(response.time);
    $scope.creator = response.user.username;
    $scope.song = response.song_title;
    $scope.artist = response.as_sung_by;
    $scope.type = response.type_of_meet;
    $scope.date = date.day;
    $scope.time = date.time;
    $scope.video = $sce.trustAsResourceUrl('https://www.youtube.com/embed?listType=search&list=' + response.as_sung_by + ' ' + response.song_title);
    mapService.renderMap($scope, response.lat, response.long, 15, 0, 20, 'event_map');
    mapService.addIcon(response.lat, response.long, $scope.map);
    $scope.loading = false;
  });

});
