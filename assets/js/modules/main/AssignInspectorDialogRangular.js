/**
 * Created by dinesh3836 on 5/5/16.
 */

(function () {

  angular
    .module('app.main')
    .service('AssignInspectorDialogRangular', AssignInspectorDialogRangular);

  AssignInspectorDialogRangular.$inject = ['Restangular'];
  function AssignInspectorDialogRangular(Restangular) {

    return Restangular.withConfig(function (RestangularConfigurer) {

      /*      RestangularConfigurer.addElementTransformer('/subcategory/'+VerifyLoginService.catId, false, function (element) {
       return element;
       });*/
    });
  }
})();
