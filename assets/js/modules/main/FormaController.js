/**
 * Created by dinesh3836 on 11-07-2016.
 */
angular.module('app.main')
  .controller('FormaController', FormaController);

FormaController.$inject = ['FormaRangular', 'verifyLoginService', 'Restangular'];

function FormaController(FormaRangular, verifyLoginService, Restangular) {

  var form = FormaRangular.all('/deputyinspector/fetchForms');
  var rejectForm = FormaRangular.all('/deputyinspector/rejectForm');
  var assignForm = FormaRangular.all('/deputyinspector/assignForm');

  var scope = this;

  scope.tempObj = [];
  scope.tabname = 'pending';
  scope.origObj = [];

  scope.getForms = function () {
    form.post({}, {}, {'access_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJoYXJpb21AemlsbGlvbi5pbyIsImlhdCI6MTQ2ODI0MjY4NH0.qNFWrPlwyRuvKU78UDsBp7d7dNTAIY6x0780OmC2zU0'}).then(function (data) {
      console.log(data);
      scope.origObj = data;
      /*fsdc.origObj = data;
       VerifyLoginService.catId = null;*/
    });
  };

  scope.getForms();

  scope.assignForm = function (obj) {
    console.log("assign Form");
    console.log(obj);
  };

  scope.rejectForm = function (obj) {
    console.log("reject Form");
    console.log(obj);
    rejectForm.post({"assocForm": obj}, {}, {'access_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJoYXJpb21AemlsbGlvbi5pbyIsImlhdCI6MTQ2ODI0MjY4NH0.qNFWrPlwyRuvKU78UDsBp7d7dNTAIY6x0780OmC2zU0'}).then(function (data) {
      console.log(data);
      if (data.status == "success") {
        scope.getForms();
      }
    });
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
