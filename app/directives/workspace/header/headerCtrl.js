(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('headerCtrl', headerCtrl);

    headerCtrl.$inject = ['request', 'url', 'elementsModel', 'elementHelper', '$rootScope', 'dataServices'];

    function headerCtrl(request, url, elementsModel, elementHelper, $rootScope, dataServices) {
        this.$onInit = function () {
            var vm = this;
            vm.columnData;
            vm.fileName = '';
            vm.selectedTableName = '';
            vm.connectionMessage = '...';
            vm.selectedTable = {};
            vm.templates = [
                'directives/workspace/header/tableSelect.html',
                'directives/workspace/header/tableSetting.html',
                'directives/workspace/header/DataSourcesPopup.html',
                'directives/workspace/header/saveReport.html'
            ];
            vm.connectionResult = [
                'success',
                'error',
                'wait...'
            ];
            vm.databaseSources = {
                name: '',
                setName: '',
                data: {
                    DriverClass: '',
                    DatabaseURL: '',
                    UserName: '',
                    Password: '',
                    JNDIURL: ''
                },
                dataSourcesConnection: function () {
                    dataServices.dataSetName = this.setName;
                    dataServices.dataSourcesName = this.name;
                    var paramsSources = {
                        dataSourceName: this.name
                    };
                    var paramsSet = {
                        dataSetName: this.setName,
                        dataSourceName: this.name
                    };
                    $rootScope.loaderFlag = true;
                    request.request(url.newDataSources, "POST", null, paramsSources).then(function (data) {
                        request.request(url.dataSet, "GET").then(function (data) {
                            vm.tables = data.data;
                            request.request(url.dataSetNew, "POST", null, paramsSet).then(function (data) {
                                url.setDataSetCreate(data.data);
                                $rootScope.loaderFlag = false;
                            }, function (data) {
                                console.log(data);
                                $rootScope.loaderFlag = false;
                            });
                        }, function (data) {
                            console.log(data);
                            $rootScope.loaderFlag = false;
                        });
                        $('#DataSetTablesModal').modal('hide');
                    }, function (data) {
                        console.log(data);
                        vm.connectionMessage = vm.connectionResult[1];
                        $rootScope.loaderFlag = false;
                    });

                },
                testConnection: function () {
                    console.log('test');
                }
            };

            vm.template = vm.templates[0];

            vm.openTablesPopup = openTablesPopup;
            vm.openDataSources = openDataSources;
            vm.settingTablePopup = settingTablePopup;
            vm.backTablePopup = backTablePopup;
            vm.Finish = Finish;
            vm.saveReportFinish = saveReportFinish;

            vm.upRowPosition = upRowPosition;
            vm.downRowPosition = downRowPosition;
            vm.saveReport = saveReport;

            //Data Sources
            function openDataSources() {
                vm.template = vm.templates[2];
                $('#DataSetTablesModal').modal('show');
            }


            //DataSet
            function openTablesPopup() {
                vm.template = vm.templates[0];
                $('#DataSetTablesModal').modal('show');
            }

            function settingTablePopup() {
                request.request(url.tableMetadata + vm.selectedTableName, 'GET').then(function (data) {
                    vm.selectedTable = data.data;
                    vm.selectedTable.forEach(function (item, i, arr) {
                        item.selected = true;
                    });
                    vm.template = vm.templates[1];
                });
            }

            function backTablePopup() {
                vm.template = vm.templates[0];
            }

            function Finish() {
                $('#DataSetTablesModal').modal('hide');
                vm.columnData = {
                    schema: "CAPWD_DTA",
                    tableName: vm.selectedTableName,
                    columns: []
                };
                console.log(vm.selectedTable);
                var cnt = 1;
                vm.selectedTable.forEach(function (item, i, arr) {
                    var obj = {};
                    if (item.selected) {
                        obj.name = item.columnName;
                        obj.dataType = item.columnType;
                        obj.analysis = "MEASURE";
                        obj.nativeName = item.columnName;
                        obj.displayName = item.columnName;
                        obj.position = cnt++;
                        obj.nativeColumnType = item.nativeColumnType;
                    }
                    vm.columnData.columns.push(obj);
                });

                request.request(url.dataSetCreate, "POST", vm.columnData).then(function (data) {

                    dataServices.dataSet.push(vm.columnData);
                }, function (data) {
                    console.log(data);
                });


                // var column = 0;
                // var headers = [];
                //
                //
                // elementHelper.element = elementsModel.tableModel(column, 1, headers);
            }

            function upRowPosition(index) {
                var tempElement = vm.selectedTable[index-1];
                vm.selectedTable[index-1] = vm.selectedTable[index];
                vm.selectedTable[index] = tempElement;
            }
            function downRowPosition(index) {
                var tempElement = vm.selectedTable[index+1];
                vm.selectedTable[index+1] = vm.selectedTable[index];
                vm.selectedTable[index] = tempElement;
            }

            function saveReport() {
                vm.template = vm.templates[3];
                $('#DataSetTablesModal').modal('show');

            }
            function saveReportFinish() {
                console.log(vm.fileName);
                request.request(url.saveReport, 'POST', null, {fileName: vm.fileName}).then(function (data) {
                    console.log(data);
                    vm.fileName = '';
                    $('#DataSetTablesModal').modal('hide');
                });
            }
        }
    }
})();