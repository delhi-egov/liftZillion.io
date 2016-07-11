/**
 * Created by dinesh3836 on 11-07-2016.
 */
angular.module('app.main')
  .controller('LoginController', LoginController);

LoginController.$inject = ['LoginRangular', 'verifyLoginService'];

function LoginController(LoginRangular, verifyLoginService) {
  var scope = this;
  //var baseUser = userRangular.all('/user', {xyz: ''}, {'x-access-token': VerifyLoginService.getToken()});
}
