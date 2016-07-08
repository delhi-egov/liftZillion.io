(function () {
    'use strict';

    angular
        .module('app.services')
        .service('api', api);

  api.$inject = ['$http'];
    function api($http) {

        var api = this;

        api.orders = [];

        var dataTableCallbacks = [];
        api.registerTableCallback = function (callback) {
            dataTableCallbacks.push(callback);
        };

        api.notifyTableObservers = function () {

            angular.forEach(dataTableCallbacks, function (callback) {
                callback();
            });
        };


    }


})();
