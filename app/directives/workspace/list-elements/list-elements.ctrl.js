(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('listElementsCtrl', listElementsCtrl);

    listElementsCtrl.$inject = ['$scope', 'elementsModel', 'dataServices', 'request', 'url'];

    function listElementsCtrl($scope, elementsModel, dataServices, request, url) {
        this.$onInit = function () {
            var vm = this;

            vm.templates = [
                'directives/workspace/list-elements/table.html',
                'directives/workspace/list-elements/settingTable.html'
            ];
            vm.template = vm.templates[0];

            vm.addContainer = addContainer;
            vm.addTable = addTable;
            vm.settingTableDataSet = settingTableDataSet;
            vm.addTextBlock = addTextBlock;

            vm.upRowPosition = upRowPosition;
            vm.downRowPosition = downRowPosition;

            vm.Finish = Finish;
            vm.maxColumn = [];
            vm.maxRow = [];
            vm.table = {
                column: '',
                row: ''
            };

            //vm.tables = dataServices.dataSet;
            // $scope.$watch(function () {
            //         return dataServices.dataSet;
            //     },
            //     function (newVal) {
            //         console.log(newVal);
            //         vm.tables = dataServices.dataSet;
            //     }, true);

            function addContainer() {
                var container = elementsModel.containerModel();
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
            }

            function settingTableDataSet() {
                vm.selectedTable = vm.dataset[vm.dataSetTable];
                vm.selectedTable.columns.forEach(function (item) {
                    item.selected = true;
                });
                vm.template = vm.templates[1];
            }

            function Finish() {
                var res = {
                    col: 1,
                    detail: 1,
                    footer: 1,
                    header: 1,
                    name: vm.selectedTable.tableName,
                    dataSet: dataServices.dataSetName,
                    computedColumns: []
                };
                vm.selectedTable.columns.forEach(function (item) {
                    if (item.selected) {
                        var row = {
                            name: item.displayName,
                            displayName: item.displayName,
                            nativeDataType: item.nativeColumnType
                        };
                        res.computedColumns.push(row);
                    }
                });
                res.col = res.computedColumns.length;
                console.log(res);
                request.request(url.createTable, 'POST', res).then(function (data) {
                    var table = elementsModel.tableModelDataSet(data.data);
                        console.log(table);
                        for (var i = 0; i < vm.model.container.length; i++) {
                            if (vm.model.container[i].selected) {
                                vm.model.container[i].elements.push(table);
                                break;
                            }
                        }
                    $('#tablesModal').modal('hide');
                }, function (dataError) {
                    console.log(dataError);
                    $('#tablesModal').modal('hide');
                });
                vm.template = vm.templates[0];
                // request.request('services/request/table.json', 'GET').then(function (data) {
                //     var table = elementsModel.tableModelDataSet(data.data);
                //     console.log(table);
                //     for (var i = 0; i < vm.model.container.length; i++) {
                //         if (vm.model.container[i].selected) {
                //             vm.model.container[i].elements.push(table);
                //             break;
                //         }
                //     }
                // });
            }

            function upRowPosition(index) {
                console.log(index);
                var tempElement = vm.selectedTable.columns[index - 1];
                vm.selectedTable.columns[index - 1] = vm.selectedTable.columns[index];
                vm.selectedTable.columns[index] = tempElement;
            }

            function downRowPosition(index) {
                console.log(index);
                var tempElement = vm.selectedTable.columns[index + 1];
                vm.selectedTable.columns[index + 1] = vm.selectedTable.columns[index];
                vm.selectedTable.columns[index] = tempElement;
            }

            function table(row, column) {
                for (var i = 1; i <= column; i++) {
                    vm.maxColumn.push(i);
                }
                for (var j = 1; j <= row; j++) {
                    vm.maxRow.push(j);
                }
            }

            active();

            function active() {
                table(100, 100);
                vm.dataset = dataServices.dataSet;
            }
        }
    }
})();