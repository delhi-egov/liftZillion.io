/**
 * Created by dinesh3836 on 07-07-2016.
 */

(function () {
  angular.module('app.main')
    .controller('mainController', mainController);
  mainController.$inject = ['dataHolder', 'api'];
  function mainController(dataHolder, api) {
    var scope = this;
    scope.name = "Dinesh Sharma";
  }
})();
