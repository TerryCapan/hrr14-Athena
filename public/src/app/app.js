// MAIN ANGULAR APP MODULE
// include modules dependencies for the entire app
// include config and routing (ui-router)
angular.module('karaoke', [
  'karaoke.services',
  'karaoke.directives',
  'karaoke.nav',
  'karaoke.home',
  'karaoke.auth',
  'karaoke.addevent',
  'karaoke.event',
  'karaoke.allevents',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/app/components/home/home.html',
      controller: 'homeCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'src/app/components/auth/signup.html',
      controller: 'authCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'src/app/components/auth/login.html',
      controller: 'authCtrl'
    })
    .state('event', {
      url: '/event/:eventID',
      templateUrl: 'src/app/components/event/event.html',
      controller: 'eventCtrl'
    })
    .state('addevent', {
      url: '/addevent',
      templateUrl: 'src/app/components/addevent/addevent.html',
      controller: 'addEventCtrl',
      authenticate: true
    })
    .state('allevents', {
      url: '/allevents',
      templateUrl: 'src/app/components/allevents/allevents.html',
      controller: 'allEventsCtrl'
    });
  $httpProvider.interceptors.push('AttachTokens');
})
.run(function ($rootScope, $location, authFactory) {
  $rootScope.$on('$stateChangeStart', function (evt, next, nextParams) {
    if (next && next.authenticate && !authFactory.isAuth()) {
      $location.path('/login').replace();
    }
  });
});
