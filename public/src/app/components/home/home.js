angular.module('karaoke.home', [])

.controller('homeCtrl', function($scope, $rootScope, locationFactory, mapFactory) {

  $scope.lat = '';
  $scope.long = '';
  $scope.loading = true;

  // make a map
  var rendermap = function(lat, long) {
    var map = L.map('map').setView([lat, long], 15);  //<-- zoom level, larger is zoomed in
    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }).addTo(map);

    console.log(map.getBounds()); //<-- what we'll use to query the db, may add a buffer for preload outside of map
  };

  if (!$rootScope.userLocation) {
    locationFactory.getPosition()
    .then(function(pos) {
      $rootScope.userLocation = pos.coords;
      $scope.lat = pos.coords.latitude;
      $scope.long = pos.coords.longitude;
      rendermap($scope.lat, $scope.long); //<--render map with user location as center of view
      // need: set up a default location for map center if no user location provided
      $scope.loading = false;
    });
  } else {
    $scope.lat = $rootScope.userLocation.latitude;
    $scope.long = $rootScope.userLocation.longitude;
    rendermap($scope.lat, $scope.long);
    $scope.loading = false;
  }

  // make a map
  // var rendermap = function (lat, long) {
  //   var map = L.map('map').setView([lat, long], 15);  //<-- zoom level, larger is zoomed in
  //   L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  //     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //     subdomains: 'abcd',
  //     minZoom: 0,
  //     maxZoom: 20,
  //     ext: 'png'
  //   }).addTo(map);
  //
  //   console.log(map.getBounds()); //<-- what we'll use to query the db, may add a buffer for preload outside of map
  // };

});
