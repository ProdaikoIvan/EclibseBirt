(function() {
    'use strict';

    angular
        .module('startApp')
        .controller('tableCtrl', tableCtrl);

        tableCtrl.$inject = ['settingHelper'];
    function tableCtrl(settingHelper) {
        var vm = this;
        vm.focusContainer = focusContainer;



        function focusContainer(cell,row) {
            console.log(cell, row);
            settingHelper.element = cell;
            settingHelper.container = row;
        }
    }
})();