angular.module('karaoke.addevent', [])

.controller('addEventCtrl', function($scope, $state, eventFactory) {

  $scope.event = {};

  $scope.addEvent = function(isValid) {
    if (isValid) {
      console.log($scope.event);
      eventFactory.addEvent($scope.event)
      .then(function(response) {
        // redirect to the new event
        $state.go('event', { eventID : response.id });
      });
      
    }
  };

});