/**
 * Created by dinesh3836 on 11-07-2016.
 */
angular.module('app.main')
  .controller('AssignTableController', AssignTableController);

AssignTableController.$inject = ['AssignRangular', 'verifyLoginService'];

function AssignTableController(AssignRangular, verifyLoginService) {

  var allAssign = AssignRangular.all('/deputyinspector/fetchAssigned');

  var scope = this;

  scope.tempObj = [];
  scope.tabname = 'pending';
  scope.origObj = [];

  allAssign.post({}, {}, {'access_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJoYXJpb21AemlsbGlvbi5pbyIsImlhdCI6MTQ2ODI0MjY4NH0.qNFWrPlwyRuvKU78UDsBp7d7dNTAIY6x0780OmC2zU0'}).then(function (data) {
    console.log(data);
    scope.origObj = data;
    /*fsdc.origObj = data;
     VerifyLoginService.catId = null;*/
  });
  

  scope.assignFilter = function (assigned) {
    if (assigned.status == scope.tabname) {
      return true;
    }
  };

  scope.TabClicked = function (tabname) {
    scope.tabname = tabname;
    console.log(tabname);
  };
  //var baseUser = userRangular.all('/user', {xyz: ''}, {'x-access-token': VerifyLoginService.getToken()});
}
