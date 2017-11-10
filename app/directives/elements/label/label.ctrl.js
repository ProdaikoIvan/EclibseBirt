(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('labelCtrl', labelCtrl);

    //'dataServices'
    labelCtrl.$inject = ['settingHelper','modelReport'];

    function labelCtrl(settingHelper, modelReport) {
        var vm = this;

        vm.focusContainer = focusContainer;

        function focusContainer(dataElement) {
            // var data = dataElement ? dataElement : modelReport.models.container[0].elements;
            // data.forEach(function (element) {
                switch (vm.element.type) {
                    case 'label':
                        if (vm.element.id !== vm.id) {
                            focusInActive(vm.element);
                        } else {
                            focusActive(vm.element);
                        }
                        break;
                    case 'grid':
                        gridParse(vm.element);
                        break;
                    case 'table':
                        gridParse(vm.element);
                        break;
                    default:
                        if (vm.element.id !== vm.id) {
                            focusInActive(vm.element);
                        } else {
                            focusActive(vm.element);
                        }
                        break;
                }
            // });
        }

        function gridParse(grid){
            grid.gridStructure.rows.forEach(function (row) {
                row.cells.forEach(function (cell) {
                    focusContainer(cell.childrens);
                });
            });
        }
        function focusActive(element) {
            element.selected = true;
            settingHelper.element = element;
            settingHelper.container = element;
            //settingHelper.container = null;
        }
        function focusInActive(element) {
            element.selected = false;
        }
    }
})();