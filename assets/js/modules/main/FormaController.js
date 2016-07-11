/**
 * Created by dinesh3836 on 11-07-2016.
 */
angular.module('app.main')
  .controller('FormaController', FormaController);

FormaController.$inject = ['FormaRangular', 'verifyLoginService', 'Restangular'];

function FormaController(FormaRangular, verifyLoginService, Restangular) {
  var scope = this;
  //var baseUser = userRangular.all('/user', {xyz: ''}, {'x-access-token': VerifyLoginService.getToken()});
}
