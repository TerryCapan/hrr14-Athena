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

  return {
    addEvent : addEvent,
    getOne : getOne
  };
});