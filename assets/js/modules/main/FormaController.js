/**
 * Created by dinesh3836 on 11-07-2016.
 */
angular.module('app.main')
  .controller('FormaController', FormaController);

FormaController.$inject = ['FormaRangular', 'dataHolder', 'verifyLoginService', 'ngDialog', 'toastr'];

function FormaController(FormaRangular, dataHolder, verifyLoginService, ngDialog, toastr) {

  var form = FormaRangular.all('/deputyinspector/fetchForms');
  var rejectForm = FormaRangular.all('/deputyinspector/rejectForm');
  var fetchInspector = FormaRangular.all('/deputyinspector/fetchInspectorList');
  var assignFormToInspector = FormaRangular.all('/deputyinspector/assignForm');
  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJoYXJpb21AemlsbGlvbi5pbyIsImlhdCI6MTQ2ODI0MjY4NH0.qNFWrPlwyRuvKU78UDsBp7d7dNTAIY6x0780OmC2zU0';

  var scope = this;

  scope.tempObj = [];
  scope.tabname = 'pending';
  scope.origObj = [];

  scope.getForms = function () {
    form.post({}, {}, {'access_token': token}).then(function (data) {
      scope.origObj = data;
    });
  };

  scope.inspectorList = function () {
    fetchInspector.post({}, {}, {'access_token': token}).then(function (data) {
      dataHolder.inspectorList = data;
      scope.inspectors = data;
    });
  };

  scope.getForms();
  scope.inspectorList();

  scope.assignForm = function (obj) {
    scope.assignFormId = obj;
    scope.isClicked = true;
    //ngDialog.open({template: '/templates/assignInspectorDialog.html', className: 'ngdialog-theme-default'});
  };

  scope.rejectForm = function (obj) {
    console.log("reject Form");
    console.log(obj);
    rejectForm.post({"assocForm": obj}, {}, {'access_token': token}).then(function (data) {
      console.log(data);
      if (data.status == "success") {
        scope.getForms();
      }
    });
  };

  scope.assignTag = function (obj) {
    console.log("inspector ID");
    if (obj) {
      assignFormToInspector.post({
        "assocForm": scope.assignFormId,
        "assocInspector": obj
      }, {}, {'access_token': token}).then(function (data) {
        scope.isClicked = false;
        toastr.success('Inspector Assigned Successfully');
        scope.getForms();
      });
    } else {
      toastr.warning('No Inspector Selected');
    }
  };

  scope.objFilter = function (obj) {
    if (obj.status == scope.tabname) {
      return true;
    }
  };

  scope.TabClicked = function (tabname) {
    if (tabname != 'pending') {
      scope.isClicked = false;
    }
    scope.tabname = tabname;
    console.log(tabname);
  };
  //var baseUser = userRangular.all('/user', {xyz: ''}, {'x-access-token': VerifyLoginService.getToken()});
}
