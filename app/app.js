(function () {
    'use strict';

    angular.module('startApp', [
        "ui.router",
        "colorpicker.module",
        "angular-loading-bar",
        "ngAnimate"
    ]).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);
})();