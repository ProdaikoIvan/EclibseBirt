(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('headerCtrl', headerCtrl);

    headerCtrl.$inject = ['request', 'url', 'elementsModel', 'elementHelper', '$rootScope', 'dataServices', '$state', 'refactorObj', '$window'];

    function headerCtrl(request, url, elementsModel, elementHelper, $rootScope, dataServices, $state, refactorObj, $window) {
        this.$onInit = function () {
            var vm = this;

            vm.dataSetTables = dataServices.dataSet;
            vm.columnData;
            vm.fileName = '';
            vm.selectedTableName = '';
            vm.connectionMessage = '...';
            vm.selectedTable = {};
            vm.templates = [
                'directives/workspace/header/tableSet/tableSelect.html',
                'directives/workspace/header/tableSet/tableSetting.html',
                'directives/workspace/header/dataSource/DataSourcesPopup.html',
                'directives/workspace/header/saveReport.html',
                'directives/workspace/header/tableSet/dataSetPopup.html',
                'directives/workspace/header/joinTable/joinDataSet.html',
                'directives/workspace/header/joinTable/joinSettingTables.html',
                'directives/workspace/header/showReport.html'
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

            vm.joinDataSet = {
                firstTable: {},
                secondTable: {},
                name: "",
                selectSecondColumn : 0,
                selectFirstColumn : 0
            };
            vm.reportFormatType = ['html', 'xlsx', 'xls', 'pdf'];
            vm.saveReportObj = {
                'reportName':"html",
                'reportFormat': ''
            };
            vm.selectColumnFirstTable = selectColumnFirstTable;
            vm.selectColumnSecondTable = selectColumnSecondTable;
            
            function selectColumnFirstTable(index) {
                vm.joinDataSet.selectFirstColumn = index;
            }
            
            function selectColumnSecondTable(index) {
                vm.joinDataSet.selectSecondColumn = index;
            }

            vm.template = vm.templates[0];

            vm.openDataSetPopup = openDataSetPopup;
            vm.openJoinDataSetPopup = openJoinDataSetPopup;
            vm.openJoinSettingDataTablesPopup = openJoinSettingDataTablesPopup;
            vm.openDataSources = openDataSources;
            vm.settingTablePopup = settingTablePopup;
            vm.backPopup = backPopup;
            vm.dataSetConnection = dataSetConnection;
            vm.Finish = Finish;
            vm.FinishJoin = FinishJoin;
            vm.saveReportFinish = saveReportFinish;

            vm.upRowPosition = upRowPosition;
            vm.downRowPosition = downRowPosition;
            vm.saveReport = saveReport;
            vm.showReports = showReports;
            vm.showSaveReportPopup = showSaveReportPopup;

            //Data Sources
            function openDataSources() {
                vm.template = vm.templates[2];
                $('#DataSetTablesModal').modal('show');
            }
            //DataSet
            function openDataSetPopup() {
                vm.template = vm.templates[4];
                $('#DataSetTablesModal').modal('show');
            }
            //JoinDataSet
            function openJoinDataSetPopup() {
                vm.template = vm.templates[5];
                $('#DataSetTablesModal').modal('show');
            }
            //JoinDataSet
            function openJoinSettingDataTablesPopup() {
                vm.template = vm.templates[6];
                console.log(vm.joinDataSet);
            }

            function FinishJoin() {
                //ToDo add property length
                var joinObj = {
                    joinType : "inner",
                    joinOperator : "eq",
                    rowFetchLimit: 50,
                    name: vm.joinDataSet.name,
                    firstDsID: vm.joinDataSet.firstTable.id,
                    secondDsID: vm.joinDataSet.secondTable.id,
                    leftColumn: vm.joinDataSet.firstTable.columns[vm.joinDataSet.selectFirstColumn].name,
                    rightColumn: vm.joinDataSet.secondTable.columns[vm.joinDataSet.selectSecondColumn].name
                };
                // Integer firstDsID;
                // Integer secondDsID;
                // String joinType = "inner";
                // String joinOperator = "eq";
                // String rightColumn;
                // String leftColumn;
                console.log(joinObj);
                console.log(vm.joinDataSet);
                request.request( url.joinDataSet, 'POST', joinObj).then(function (data) {
                    console.log(data);
                    var joinTableObj = refactorObj.joinTablesCreateObj(data.data, vm.joinDataSet.name);
                    dataServices.dataSet.push(joinTableObj);
                });
                $('#DataSetTablesModal').modal('hide');
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
                        vm.tempId = data.data;
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

            function backPopup(id) {
                vm.template = vm.templates[id];
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
                        id: vm.tempId,
                        schema: "CAPWD_DTA",
                        dataSetName: vm.databaseSources.setName,
                        tableName: vm.selectedTableName,
                        columns: vm.columnData.columns
                    };
                    dataServices.dataSet.push(dataSetTable);
                }, function (data) {
                    console.log(data);
                });
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

            function showSaveReportPopup() {
                vm.template = vm.templates[7];
                $('#DataSetTablesModal').modal('show');
            }
            function showReports() {
                console.log(vm.saveReportObj);
                $window.open('http://192.168.1.100:9082/XimpleReportWeb/reportShow?reportName='+ vm.saveReportObj.reportName+'.rptdesign&reportFormat='+ vm.saveReportObj.reportFormat, '_blank');
                // request.request(url.showReport, 'POST', null,reportTemp).then(function (data) {
                //     console.log(data);
                //     go(data);
                // });

                // function go(data) {
                //     //var url = $state.href(data.data);
                //     //window.open(url,'_blank');
                //
                //     var x = window.open();
                //     x.document.open();
                //     x.document.write(data.data);
                //     x.document.close();
                // }
            }
        }
    }
})();