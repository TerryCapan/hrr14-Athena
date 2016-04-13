angular.module('karaoke.allevents', [])

.controller('allEventsCtrl', function($scope, $stateParams, eventFactory) {
  $scope.data = {};
  eventFactory.getAll()
    .then(function(response) {
      $scope.data.events = eventFactory.populateEvents(response);
    });
});
