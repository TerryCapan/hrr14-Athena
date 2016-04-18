angular.module('karaoke.addevent', [])

.controller('addEventCtrl', function($scope, $state, $rootScope, eventFactory, locationFactory, mapService) {
  $scope.lat = '';
  $scope.long = '';
  $scope.event = {};
  $scope.event.location = {};
  $scope.marker = null;
  $scope.loading = true;
  $scope.loadingMessage = 'establishing user location';

  if (!$rootScope.userLocation) {
    locationFactory.getPosition()
    .then(function(pos) {
      $rootScope.userLocation = pos.coords;
      $scope.lat = pos.coords.latitude;
      $scope.long = pos.coords.longitude;
      addMap();
    });
  } else {
    $scope.lat = $rootScope.userLocation.latitude;
    $scope.long = $rootScope.userLocation.longitude;
    addMap();
  }

  $scope.addEvent = function(isValid) {
    if (isValid && $scope.marker) {
      eventFactory.addEvent($scope.event)
      .then(function(response) {
        // redirect to the new event's detail page once it has gone through
        $state.go('event', { eventID : response.id });
      });
    }
  };

  function addMap() {
    mapService.renderMap($scope, $scope.lat, $scope.long, 15, 0, 20, 'create-event_map');
    $scope.map.on('click', mapService.eventMapClickHandler.bind($scope));
    $scope.loading = false;
  }

});