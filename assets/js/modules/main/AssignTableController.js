/**
 * Created by dinesh3836 on 11-07-2016.
 */
angular.module('app.main')
  .controller('AssignTableController', AssignTableController);

AssignTableController.$inject = ['AssignRangular', 'verifyLoginService', 'ngDialog'];

function AssignTableController(AssignRangular, verifyLoginService, ngDialog) {

  var allAssign = AssignRangular.all('/deputyinspector/fetchAssigned');
  var confirmForm = AssignRangular.all('/deputyinspector/confirmForm');
  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJoYXJpb21AemlsbGlvbi5pbyIsImlhdCI6MTQ2ODI0MjY4NH0.qNFWrPlwyRuvKU78UDsBp7d7dNTAIY6x0780OmC2zU0';
  var scope = this;

  scope.tempObj = [];
  scope.tabname = 'pending';
  scope.origObj = [];
  scope.getAssigned = function () {
    allAssign.post({}, {}, {'access_token': token}).then(function (data) {
      console.log(data);
      scope.origObj = data;
    });
  };

  scope.getAssigned();

  scope.assignForm = function (obj) {
    console.log("Assign Form");
  };

  scope.recheckForm = function (obj) {

  };

  scope.confirmForm = function (obj) {
    confirmForm.post({
      "assocForm": obj.assocForm,
      "assignId": obj.id
    }, {}, {'access_token': token}).then(function (data) {
      console.log(data);
      if (data.status == "success") {
        scope.getAssigned();
      }
      else {
        console.log("Error Confirming form");
      }
    });
  };

  scope.rejectForm = function () {

  };

  scope.objFilter = function (obj) {
    if (obj.status == scope.tabname) {
      return true;
    }
  };

  scope.TabClicked = function (tabname) {
    scope.tabname = tabname;
    console.log(tabname);
  };
//var baseUser = userRangular.all('/user', {xyz: ''}, {'x-access-token': VerifyLoginService.getToken()});
}
