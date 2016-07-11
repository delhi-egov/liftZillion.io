/**
 * Created by jafarnaqvi on 10/06/16.
 */
(function () {
  angular.module('app.routes')
    .config(['$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/', {
          templateUrl: '/templates/login.html',
          resolve: {
            seo: ['$rootScope', function ($rootScope) {
              $rootScope.title = 'app.routes';
            }]
          }
        }).when('/deputy', {
          templateUrl: '/templates/deputy.html',
          resolve: {
            seo: ['$rootScope', function ($rootScope) {
              $rootScope.title = 'app.routes';
              return true;
            }]
          }
        }).otherwise({
          templateUrl: '/templates/404.html',
          caseInsensitiveMatch: true
        })


      }]);

})();
