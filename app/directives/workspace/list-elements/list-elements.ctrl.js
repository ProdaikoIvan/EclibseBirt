(function () {
        'use strict';

        angular
            .module('startApp')
            .controller('listElementsCtrl', listElementsCtrl);

        listElementsCtrl.$inject = ['$scope', 'elementsModel', 'dataServices', 'request', 'url', 'settingHelper'];

        function listElementsCtrl($scope, elementsModel, dataServices, request, url, settingHelper) {
            this.$onInit = function () {
                var vm = this;

                vm.templates = [
                    'directives/workspace/list-elements/table.html',
                    'directives/workspace/list-elements/settingTable.html',
                    'directives/workspace/list-elements/grid.html'
                ];
                vm.template = vm.templates[0];

                vm.addContainer = addContainer;
                vm.addTable = addTable;
                vm.settingTableDataSet = settingTableDataSet;
                vm.addLabel = addLabel;
                vm.openGridPopup = openGridPopup;
                vm.openTablePopup = openTablePopupl;
                vm.addGrid = addGrid;

                vm.backTablePopup = backTablePopup;

                vm.upRowPosition = upRowPosition;
                vm.downRowPosition = downRowPosition;

                vm.selectAllRow = selectAllRow;
                vm.selectNoneRow = selectNoneRow;

                vm.Finish = Finish;
                vm.maxColumn = [];
                vm.maxRow = [];
                vm.table = {
                    column: '',
                    row: ''
                };
                vm.gridModel = {
                    countColumn: 3,
                    countRow: 3
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

                function addLabel() {
                    var labelObj = null;
                    if (settingHelper.element !== null && settingHelper.container.name === 'grid') {
                        labelObj = {parentId: settingHelper.element.id};
                    }
                    request.request(url.createLabel, 'POST', null, labelObj).then(function (data) {
                        var label = elementsModel.labelModel(data.data);
                        if (labelObj !== null) {
                            settingHelper.element.childrens.push(label);
                            return;
                        }
                        for (var i = 0; i < vm.model.container.length; i++) {
                            if (vm.model.container[i].selected) {
                                vm.model.container[i].elements.push(label);
                                break;
                            }
                        }
                    });
                }

                function openTablePopupl() {
                    vm.template = vm.templates[0];
                    $('#tablesModal').modal('show');
                }

                function addTable() {
                    var tableObj = null;
                    if (settingHelper.element !== null  && settingHelper.container.name === 'grid') {
                        tableObj = {parentId: settingHelper.element.id};
                    }
                    var table = elementsModel.tableModel(vm.table.column, vm.table.row);
                    if (tableObj !== null) {
                        settingHelper.element.childrens.push(table);
                    }
                    else {
                        for (var i = 0; i < vm.model.container.length; i++) {
                            if (vm.model.container[i].selected) {
                                vm.model.container[i].elements.push(table);
                                break;
                            }
                        }
                    }
                    $('#tablesModal').modal('hide');
                    vm.template = vm.templates[0];
                }

                function backTablePopup() {
                    vm.template = vm.templates[0];
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
                        dataSet: vm.selectedTable.dataSetName,
                        computedColumns: []
                    };
                    vm.selectedTable.columns.forEach(function (item) {
                        if (item.selected) {
                            if(item.hasOwnProperty('item.name')){
                                var row = {
                                    name: item.name,
                                    nativeName: item.nativeName,
                                    displayName: item.displayName,
                                    nativeDataType: item.nativeColumnType
                                };
                                res.computedColumns.push(row);
                            }
                            else{
                                var row = {
                                    name: item.nativeName,
                                    displayName: item.displayName
                                };
                                res.computedColumns.push(row);
                            }
                        }
                    });
                    res.col = res.computedColumns.length;
                    console.log(settingHelper.element);
                    if (settingHelper.element !== null && (settingHelper.container != null && settingHelper.container.name === 'grid')) {
                        res.parentId = settingHelper.element.id;
                    }
                    request.request(url.createTable, 'POST', res).then(function (data) {
                        console.log(data);
                        var table = elementsModel.tableModelDataSet(data.data);
                        if (res.parentId !== null && res.parentId !== undefined) {
                            settingHelper.element.childrens.push(table);
                        }
                        else {
                            for (var i = 0; i < vm.model.container.length; i++) {
                                if (vm.model.container[i].selected) {
                                    vm.model.container[i].elements.push(table);
                                    break;
                                }
                            }
                        }
                        vm.template = vm.templates[0];
                        $('#tablesModal').modal('hide');
                    }, function (dataError) {
                        vm.template = vm.templates[0];
                        console.log(dataError);
                        $('#tablesModal').modal('hide');
                    });
                }

                function openGridPopup() {
                    vm.template = vm.templates[2];
                    $('#tablesModal').modal('show');
                }

                function addGrid() {
                    $('#tablesModal').modal('hide');
                    vm.template = vm.templates[0];
                    request.request(url.createGrid, 'POST', null, vm.gridModel).then(function (data) {
                        var grid = elementsModel.gridModel(data.data);
                        console.log(grid);
                        for (var i = 0; i < vm.model.container.length; i++) {
                            if (vm.model.container[i].selected) {
                                vm.model.container[i].elements.push(grid);
                                break;
                            }
                        }
                    })
                }
                
                function selectAllRow() {
                    vm.selectedTable.columns.forEach(function(item,i){
                        item.selected = true;
                    });
                }
                function selectNoneRow() {
                    vm.selectedTable.columns.forEach(function(item,i){
                        item.selected = false;
                    });
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