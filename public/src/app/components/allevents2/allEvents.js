angular.module('karaoke.allevents', [])

.controller('allEventsCtrl', function($scope, eventFactory) {
  $scope.data = {};
  $scope.loading = true;
  $scope.loadingMessage = 'finding all events';
  eventFactory.getAll()
    .then(function(response) {
      $scope.data.events = eventFactory.populateEvents(response);
      $scope.loading = false;
    });
});
