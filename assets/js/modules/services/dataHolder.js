(function () {
  'use strict';

  angular
    .module('app.services')
    .service('dataHolder', dataHolder);

  dataHolder.$inject = ['$http'];
  function dataHolder($http) {

    var dataHolder = this;

    dataHolder.adminPageStats = {origData: []}

    dataHolder.orders = [];
    var dataTableCallbacks = [];
    dataHolder.registerTableCallback = function (callback) {
      dataTableCallbacks.push(callback);
    };

    dataHolder.notifyTableObservers = function () {

      angular.forEach(dataTableCallbacks, function (callback) {
        callback();
      });
    };
  }

})();
