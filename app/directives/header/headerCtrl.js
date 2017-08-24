(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('headerCtrl', headerCtrl);

    headerCtrl.$inject = ['request', 'elementsModel', 'elementHelper'];

    function headerCtrl(request, elementsModel, elementHelper) {
        var vm = this;

        vm.dbData = request.dataSet();
        vm.selectedTable = {};

        vm.templates = [
            'directives/header/tableSelect.html',
            'directives/header/tableSetting.html'
        ];
        vm.template = vm.templates[0];

        vm.openTablesPopup = openTablesPopup;
        vm.settingTablePopup = settingTablePopup;
        vm.backTablePopup = backTablePopup;
        vm.Finish = Finish;

        function openTablesPopup() {
            vm.template = vm.templates[0];
            $('#DataSetTablesModal').modal('show')
        }

        function settingTablePopup() {
            vm.template = vm.templates[1];
            vm.selectedTable.rows.forEach(function (item, i, arr) {
                item.selected = true;
            });
        }

        function backTablePopup() {
            vm.template = vm.templates[0];
        }

        function Finish() {
            $('#DataSetTablesModal').modal('hide');

            var column = 0;
            var headers = [];

            vm.selectedTable.rows.forEach(function (item, i, arr) {
                if(item.selected){
                    headers.push(item.name);
                    column++;
                }
            });
            console.log('create');
            elementHelper.element = elementsModel.tableModel(column, 1, headers);
        }
    }
})();