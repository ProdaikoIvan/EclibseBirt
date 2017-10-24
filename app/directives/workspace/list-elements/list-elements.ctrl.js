(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('listElementsCtrl', listElementsCtrl);

    listElementsCtrl.$inject = ['$scope', 'elementsModel', 'request', 'url', 'settingHelper', 'addElements', 'storage'];

    //dataServices
    function listElementsCtrl($scope, elementsModel, request, url, settingHelper, addElements, storage) {
        this.$onInit = function () {
            var vm = this;

            vm.templates = [
                'directives/workspace/list-elements/table/table.html',
                'directives/workspace/list-elements/tableFromDataBase/tableFromDataBase.html',
                'directives/workspace/list-elements/tableFromDataBase/tableFromDataBaseSetting.html',
                'directives/workspace/list-elements/tableJoin/tableJoinPopup.html',
                'directives/workspace/list-elements/tableJoin/tableJoinSettingPopup.html',
                'directives/workspace/list-elements/grid/grid.html'
            ];
            vm.dataSetFilters = {
                filterList: ['between', 'in', 'bottom-percent', 'bottom-n'],
                filters: [],
                flagTemplateValue: 0,
                tempFirstFilter: '',
                curentFilter: {
                    operation: '',
                    expression: '',
                    firstPropertyList: [],
                    secondPropertyList: []
                },
                changeOperator: function () {
                    switch (this.curentFilter.operation) {
                        case this.filterList[0]:
                            this.flagTemplateValue = 0;
                            console.log(1);
                            break;
                        case this.filterList[1]:
                            this.flagTemplateValue = 1;
                            this.curentFilter.secondPropertyList = [];
                            this.curentFilter.firstPropertyList = [];
                            break;
                        case this.filterList[2]:
                            this.flagTemplateValue = 0;
                            console.log(3);
                            break;
                        case this.filterList[3]:
                            this.flagTemplateValue = 0;
                            console.log(4);
                            break;
                    }
                    console.log(vm.dataSetFilters);
                },
                addInValue: function () {
                    this.curentFilter.firstPropertyList.push(this.tempFirstFilter);
                    this.tempFirstFilter = '';
                    console.log(this.curentFilter);
                },
                addFilter: function () {
                    this.filters.push(angular.copy(this.curentFilter));
                }
            };

            vm.addLabel = addLabel;
            vm.openGridPopup = openGridPopup;
            vm.addGrid = addGrid;
            vm.openCustomTablePopup = openCustomTablePopup;
            vm.openTableFromDataBasePopup = openTableFromDataBasePopup;
            vm.settingTableDataFromDataBase = settingTableDataFromDataBase;
            vm.createTableFromDataBase = createTableFromDataBase;
            vm.openJoinTablePopup = openJoinTablePopup;
            vm.openJoinTablesSettingPopup = openJoinTablesSettingPopup;
            vm.finishJoinTable = finishJoinTable;
            vm.getColumnsJoinTable = getColumnsJoinTable;
            vm.selectColumnFirstTable = selectColumnFirstTable;
            vm.selectColumnSecondTable = selectColumnSecondTable;
            vm.upRowPosition = upRowPosition;
            vm.downRowPosition = downRowPosition;
            vm.selectAllRow = selectAllRow;
            vm.selectNoneRow = selectNoneRow;

            vm.backPopup = backPopup;

            vm.table = {
                column: '',
                row: ''
            };
            vm.tableColumns = [];
            vm.gridModel = {
                countColumn: 2,
                countRow: 2
            };
            vm.joinDataSet = {
                firstTable: null,
                secondTable: null,
                firstColumns:[],
                secondColumns: [],
                name: "",
                selectSecondColumn: 0,
                selectFirstColumn: 0
            };

            function addLabel() {
                addElements.label();
            }

            function openGridPopup() {
                vm.template = vm.templates[5];
                $('#tablesModal').modal('show');
            }

            function addGrid() {
                $('#tablesModal').modal('hide');
                addElements.grid(vm.gridModel);
            }

            function openCustomTablePopup() {
                vm.template = vm.templates[0];
                $('#tablesModal').modal('show');
            }

            function openTableFromDataBasePopup() {
                vm.template = vm.templates[1];
                $('#tablesModal').modal('show');
            }

            function settingTableDataFromDataBase() {
                request.request(url.tableMetadata + vm.selectTableName, 'GET').then(function (data) {
                    console.log(data);
                    vm.tableColumns = data.data;
                    vm.tableColumns.forEach(function (item, i, arr) {
                        item.selected = true;
                        item.displayName = item.columnName;
                    });
                    vm.template = vm.templates[2];
                });
            }

            function createTableFromDataBase() {
                addElements.tableFromDataBase(vm.selectTableName, vm.tableColumns);
            }

            function openJoinTablePopup() {
                vm.template = vm.templates[3];
                $('#tablesModal').modal('show');
            }

            function openJoinTablesSettingPopup() {
                vm.template = vm.templates[4];
            }

            function getColumnsJoinTable(tableName, table) {
                request.request(url.tableMetadata + tableName, 'GET').then(function (data) {
                    console.log(data);
                    switch (table){
                        case 'first': vm.joinDataSet.firstColumns = createDisplayName(data.data);break;
                        case 'second': vm.joinDataSet.secondColumns = createDisplayName(data.data);break;
                    }
                });
                function createDisplayName(data) {
                    data.forEach(function (item) {
                        item.displayName = item.columnName;
                        item.selected = true;
                    });
                    return data;
                }
            }

            function finishJoinTable() {
                addElements.tableJoin(vm.joinDataSet);
                $('#DataSetTablesModal').modal('hide');
            }

            function selectColumnFirstTable(index) {
                vm.joinDataSet.selectFirstColumn = index;
            }

            function selectColumnSecondTable(index) {
                vm.joinDataSet.selectSecondColumn = index;
            }

            // function addTable() {
            //     var tableObj = null;
            //     if (settingHelper.element !== null  && settingHelper.container.name === 'grid') {
            //         tableObj = {parentId: settingHelper.element.id};
            //     }
            //     var table = elementsModel.tableModel(vm.table.column, vm.table.row);
            //     if (tableObj !== null) {
            //         settingHelper.element.childrens.push(table);
            //     }
            //     else {
            //         for (var i = 0; i < vm.model.container.length; i++) {
            //             if (vm.model.container[i].selected) {
            //                 vm.model.container[i].elements.push(table);
            //                 break;
            //             }
            //         }
            //     }
            //     $('#tablesModal').modal('hide');
            //     vm.template = vm.templates[0];
            // }

            function backPopup(id) {
                vm.template = vm.templates[id];
            }

            function selectAllRow(joinFlag) {
                if(joinFlag){
                    vm.joinDataSet.firstColumns.forEach(function (item) {
                        item.selected = true;
                    });
                    vm.joinDataSet.secondColumns.forEach(function (item) {
                        item.selected = true;
                    });
                    return;
                }
                vm.tableColumns.forEach(function (item, i) {
                    item.selected = true;
                });
            }

            function selectNoneRow(joinFlag) {
                if(joinFlag){
                    vm.joinDataSet.firstColumns.forEach(function (item) {
                        item.selected = false;
                    });
                    vm.joinDataSet.secondColumns.forEach(function (item) {
                        item.selected = false;
                    });
                    return;
                }
                vm.tableColumns.forEach(function (item, i) {
                    item.selected = false;
                });
            }

            function upRowPosition(index) {
                var tempElement = vm.tableColumns[index - 1];
                vm.tableColumns[index - 1] = vm.tableColumns[index];
                vm.tableColumns[index] = tempElement;
            }

            function downRowPosition(index) {
                var tempElement = vm.tableColumns[index + 1];
                vm.tableColumns[index + 1] = vm.tableColumns[index];
                vm.tableColumns[index] = tempElement;
            }

            active();

            function active() {
                vm.tablesList = storage.getTables();
                //vm.dataset = dataServices.dataSet;
            }
        }
    }
})();