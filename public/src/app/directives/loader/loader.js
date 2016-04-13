angular.module('karaoke.directives', [])

.directive('karaokeLoader', function() {
  return {
    restrict: 'E',
    templateUrl: 'src/app/directives/loader/loader.html'
  };
});