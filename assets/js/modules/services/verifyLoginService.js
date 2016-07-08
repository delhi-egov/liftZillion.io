(function () {
  'use strict';

  angular
    .module('app.services')
    .service('verifyLoginService', verifyLoginService);

  verifyLoginService.$inject = ['$http', '$timeout', '$cookies', '$location'];
  function verifyLoginService($http, $timeout, $cookies, $location) {

    var verifyLoginService = this;

    verifyLoginService.checkLogin = function () {
      //console.log('Inside Resolve');

      return false;
    }
  }

})();
