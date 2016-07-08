/**
 * Created by dinesh3836 on 07-07-2016.
 */

angular.module('app.main')
  .controller('applicationController', applicationController);

applicationController.$inject = ['applicationRangular', 'verifyLoginService', 'Restangular'];

function applicationController(applicationRangular, verifyLoginService, Restangular) {
  var bsid = this;
  
  var baseUser = userRangular.all('/user', {xyz: ''}, {'x-access-token': VerifyLoginService.getToken()});
}
