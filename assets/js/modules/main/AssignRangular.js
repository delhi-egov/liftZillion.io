/**
 * Created by dinesh3836 on 5/5/16.
 */

(function () {

  angular
    .module('app.main')
    .service('AssignRangular', AssignRangular);

  AssignRangular.$inject = ['Restangular'];
  function AssignRangular(Restangular) {

    return Restangular.withConfig(function (RestangularConfigurer) {

      /*      RestangularConfigurer.addElementTransformer('/subcategory/'+VerifyLoginService.catId, false, function (element) {
       return element;
       });*/
    });
  }
})();
