angular.module('karaoke.nav', [])

.controller('navCtrl', function($scope, authFactory) {
  $scope.droppedDown = false;
  $scope.loggedIn = authFactory.isAuth();

  var burgerLine1 = document.getElementById('burgerLine1');
  var burgerLine2 = document.getElementById('burgerLine2');
  var burgerLine3 = document.getElementById('burgerLine3');

  $scope.toggleMenu = function() {
    $scope.droppedDown = !$scope.droppedDown;

    if ($scope.droppedDown) {
      Velocity(burgerLine1, { y1: '+= 6', y2: '+= 6' }, { duration: 400 });
      Velocity(burgerLine1, { y1: '+= 7', y2: '-= 7'}, { duration: 400 });
      Velocity(burgerLine2, { strokeOpacity: '0' }, { duration: 400 });
      Velocity(burgerLine3, { y1: '-= 6', y2: '-= 6' }, { duration: 400 });
      Velocity(burgerLine3, { y1: '-= 7', y2: '+= 7'}, { duration: 400 });
    } else {
      Velocity(burgerLine1, { y1: '-= 7', y2: '+= 7' }, { duration: 400 });
      Velocity(burgerLine1, { y1: '-= 6', y2: '-= 6'}, { duration: 400 });
      Velocity(burgerLine2, { strokeOpacity: '1' }, { duration: 400, delay: 400 });
      Velocity(burgerLine3, { y1: '+= 7', y2: '-= 7' }, { duration: 400 });
      Velocity(burgerLine3, { y1: '+= 6', y2: '+= 6'}, { duration: 400 });
    }
  };

  $scope.logOut = function() {
  	authFactory.logout();
  };

  $scope.$on('$locationChangeStart', function(next, current) {
    if ($scope.droppedDown) {
      $scope.toggleMenu();
    }
    $scope.loggedIn = authFactory.isAuth();
  });
});