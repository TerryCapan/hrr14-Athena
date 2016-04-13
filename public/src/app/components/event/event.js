angular.module('karaoke.event', [])

.controller('eventCtrl', function($scope, $stateParams, eventFactory) {

  $scope.id = $stateParams.eventID;

  eventFactory.getOne($scope.id)
  .then(function(response) {
    console.log(response);
  });

});