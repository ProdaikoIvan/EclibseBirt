(function() {
    'use strict';

    angular
        .module('startApp')
        .controller('tableCtrl', tableCtrl);

        tableCtrl.$inject = ['settingHelper'];
    function tableCtrl(settingHelper) {
        var vm = this;
        vm.focusContainer = focusContainer;



        function focusContainer(cell,container) {
            settingHelper.element = cell;
            settingHelper.container = container;
        }
    }
})();