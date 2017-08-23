(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('TextBlockCtrl', TextBlockCtrl);

    TextBlockCtrl.$inject = ['settingHelper'];

    function TextBlockCtrl(settingHelper) {
        var vm = this;
        vm.focusContainer = focusContainer;

        function focusContainer() {
            vm.model.forEach(function (element, i, c) {
                if (vm.number === i) {
                    element.selected = true;
                    settingHelper.element = element;
                    settingHelper.container = null;
                }
                else {
                    element.selected = false;
                }
            });
        }
    }
})();