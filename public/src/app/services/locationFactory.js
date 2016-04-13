angular.module('karaoke.services')

.factory('locationFactory', function($q, $window) {
  var getPosition = function() {
    var deferred = $q.defer();

    if (!$window.navigator.geolocation) {
      deferred.resolve({
        coords : {
          latitude : 38.9072,
          longitude : -77.0369
        }
      });
    } else {
      $window.navigator.geolocation.getCurrentPosition(
        function(pos) {
          console.log(pos);
          deferred.resolve(pos);
        },
        function(err) {
          deferred.reject(err);
        });
    }

    return deferred.promise;
  };

  return {
    getPosition : getPosition
  };
});