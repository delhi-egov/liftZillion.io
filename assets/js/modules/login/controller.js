/**
 * Created by dinesh3836 on 07-07-2016.
 */

(function () {
  angular.module('app.login')
    .controller('LoginController', LoginController);
  LoginController.$inject = ['dataHolder', 'api'];
  function LoginController(dataHolder, api) {
    var scope = this;
    scope.name = "Dinesh Sharma";
  }
})();
