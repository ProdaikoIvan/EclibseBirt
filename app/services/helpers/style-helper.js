(function () {
    'use strict';

    angular
        .module('startApp')
        .factory('settingHelper', settingHelper);

    settingHelper.$inject = [];

    function settingHelper() {


        return {
            element: {},
            container: null
        }
    }
})();