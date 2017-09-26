(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('headerCtrl', headerCtrl);

    headerCtrl.$inject = ['request', 'url', 'elementsModel', 'elementHelper', '$rootScope', 'dataServices', '$state'];

    function headerCtrl(request, url, elementsModel, elementHelper, $rootScope, dataServices, $state) {
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
                'directives/workspace/header/saveReport.html',
                'directives/workspace/header/dataSetPopup.html'
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

                    request.request(url.newDataSources, "POST", null, paramsSources).then(function (data) {

                        $('#DataSetTablesModal').modal('hide');

                    }, function (data) {
                        console.log(data);
                        vm.connectionMessage = vm.connectionResult[1];

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
            vm.dataSetConnection = dataSetConnection;
            vm.Finish = Finish;
            vm.saveReportFinish = saveReportFinish;

            vm.upRowPosition = upRowPosition;
            vm.downRowPosition = downRowPosition;
            vm.saveReport = saveReport;
            vm.showReports = showReports;

            //Data Sources
            function openDataSources() {
                vm.template = vm.templates[2];
                $('#DataSetTablesModal').modal('show');
            }


            //DataSet
            function openTablesPopup() {
                vm.template = vm.templates[4];
                $('#DataSetTablesModal').modal('show');
            }

            function dataSetConnection() {

                $rootScope.loaderFlag = true;
                var paramsSet = {
                    dataSetName: vm.databaseSources.setName,
                    dataSourceName: vm.databaseSources.name
                };
                request.request(url.dataSet, "GET").then(function (data) {
                    vm.tables = data.data;
                    request.request(url.dataSetNew, "POST", null, paramsSet).then(function (data) {
                        url.setDataSetCreate(data.data);
                        $rootScope.loaderFlag = false;
                        vm.template = vm.templates[0];

                    }, function (data) {
                        console.log(data);
                        $rootScope.loaderFlag = false;
                    });
                }, function (data) {
                    console.log(data);
                    $rootScope.loaderFlag = false;
                });
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

                var cnt = 1;
                vm.selectedTable.forEach(function (item, i, arr) {
                    var obj = {};
                    if (item.selected) {
                        obj.name = item.columnName;
                        obj.dataType = item.columnType;
                        obj.analysis = "dimension";
                        obj.nativeName = item.columnName;
                        obj.displayName = item.columnName;
                        obj.position = cnt++;
                        obj.nativeColumnType = item.nativeColumnType;
                    }
                    vm.columnData.columns.push(obj);
                });
                console.log(vm.columnData);
                request.request(url.dataSetCreate, "POST", vm.columnData).then(function (data) {
                    var dataSetTable = {
                        schema: "CAPWD_DTA",
                        dataSetName: vm.databaseSources.setName,
                        tableName: vm.selectedTableName,
                        columns: vm.columnData.columns
                    };
                    dataServices.dataSet.push(dataSetTable);
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
                var tempElement = vm.selectedTable[index - 1];
                vm.selectedTable[index - 1] = vm.selectedTable[index];
                vm.selectedTable[index] = tempElement;
            }

            function downRowPosition(index) {
                var tempElement = vm.selectedTable[index + 1];
                vm.selectedTable[index + 1] = vm.selectedTable[index];
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

            function showReports() {
                request.request(url.showReport, 'POST').then(function (data) {
                    console.log(data);
                    go(data);
                });

                function go(data) {
                    // var url = $state.href(data.data);
                    // window.open(url,'_blank');
                    var x = window.open();
                    x.document.open();
                    x.document.write(data.data);
                    // x.document.close();
                }
            }
        }
    }
})();