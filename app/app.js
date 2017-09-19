(function () {
    'use strict';

    angular.module('startApp', [
        "ui.router",
        "colorpicker.module",
        "angular-loading-bar",
        "ngAnimate"
    ]).run(function ($rootScope, request, url) {
        request.request(url.initializedDataSource, "POST").then(function (data) {
            if (data.status === 200) {
            }
        }, function (data) {
            console.log(data);
        });
    }).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);
})();