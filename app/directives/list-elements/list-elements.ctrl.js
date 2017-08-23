(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('listElementsCtrl', listElementsCtrl);

    listElementsCtrl.$inject = ['$scope', 'elementsModel'];

    function listElementsCtrl($scope, elementsModel) {
        var vm = this;

        vm.addContainer = addContainer;
        vm.addTable = addTable;
        vm.addTextBlock = addTextBlock;
        vm.maxColumn = [];
        vm.maxRow = [];
        vm.table = {
            column: '',
            row: ''
        };
        table(10, 10);


        function addContainer() {
            var container = elementsModel.containerModel();
            console.log(container);
            vm.model.container.push(container);
        }

        function addTextBlock() {
            var textBox = elementsModel.textBoxModel();
            for (var i = 0; i < vm.model.container.length; i++) {
                if (vm.model.container[i].selected) {
                    vm.model.container[i].elements.push(textBox);
                    break;
                }
            }
        }

        function addTable() {
            var table = elementsModel.tableModel(vm.table.column, vm.table.row);
            for (var i = 0; i < vm.model.container.length; i++) {
                if (vm.model.container[i].selected) {
                    vm.model.container[i].elements.push(table);
                    break;
                }
            }
            console.log(table);
            $('#table-modal').modal('hide')
        }

        function table(row, column) {
            for (var i = 1; i <= column; i++) {
                vm.maxColumn.push(i);
            }
            for (var j = 1; j <= row; j++) {
                vm.maxRow.push(j);
            }
        }
    }
})();