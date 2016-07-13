/**
 * Created by dinesh3836 on 11-07-2016.
 */
angular.module('app.main')
  .controller('AssignInspectorDialogController', AssignInspectorDialogController);

AssignInspectorDialogController.$inject = ['AssignInspectorDialogRangular', 'dataHolder', 'verifyLoginService', 'ngDialog'];

function AssignInspectorDialogController(AssignInspectorDialogRangular, dataHolder, verifyLoginService, ngDialog) {
  var scope = this;

  var assign = AssignInspectorDialogRangular.all("/deputyinspector/assignForm");

  scope.inspectorList = dataHolder.inspectorList;


  scope.assignForm = function (obj) {
    assign.post({
      "assocForm": dataHolder.assignFormId,
      "assocInspector": obj
    }, {}, {'access_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJoYXJpb21AemlsbGlvbi5pbyIsImlhdCI6MTQ2ODI0MjY4NH0.qNFWrPlwyRuvKU78UDsBp7d7dNTAIY6x0780OmC2zU0'}).then(function (data) {
      scope.origObj = data;
      console.log(data);
    });
    $(".ngdialog-overlay").click();
  };
  console.log("jhgfdsdfghjk");
}
