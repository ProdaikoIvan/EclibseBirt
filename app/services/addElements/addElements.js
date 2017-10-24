(function () {
    'use strict';

    angular
        .module('startApp')
        .factory('addElements', addElements);

    addElements.$inject = ['settingHelper', 'request', 'url', 'elementsModel', 'modelReport', 'dataSourcesParams', 'refactorObj'];

    function addElements(settingHelper, request, url, elementsModel, modelReport, dataSourcesParams, refactorObj) {
        var dataSetCnt = 0;
        return {
            label: label,
            grid: grid,
            tableFromDataBase: tableFromDataBase,
            tableJoin: tableJoin
        };

        function label() {
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
                for (var i = 0; i < modelReport.models.container.length; i++) {
                    if (modelReport.models.container[i].selected) {
                        modelReport.models.container[i].elements.push(label);
                        break;
                    }
                }
            });
        }

        function grid(model) {
            request.request(url.createGrid, 'POST', null, model).then(function (data) {
                var grid = elementsModel.gridModel(data.data);
                for (var i = 0; i < modelReport.models.container.length; i++) {
                    if (modelReport.models.container[i].selected) {
                        modelReport.models.container[i].elements.push(grid);
                        break;
                    }
                }
            })
        }

        function tableFromDataBase(tableName, tableColumns) {
            var datasetName;
            var dataSetId;
            newDataSet().then(function (data) {
                datasetName = data.dataSetName;
                dataSetId = data.dataSetId;
                return dataSetCreate(tableName, tableColumns)
            }).then(function (data) {
                return createTable(datasetName, tableName, tableColumns);
            }).then(function (data) {
                var table = elementsModel.tableModelDataSet(data.data, dataSetId);
                if (data.structure.parentId !== null && data.structure.parentId !== undefined) {
                    settingHelper.element.childrens.push(table);
                }
                else {
                    for (var i = 0; i < modelReport.models.container.length; i++) {
                        if (modelReport.models.container[i].selected) {
                            modelReport.models.container[i].elements.push(table);
                            break;
                        }
                    }
                }
                $('#tablesModal').modal('hide');
            });
        }

        function tableJoin(joinData) {
            var firstDatasetName;
            var secondDatasetName;
            var firstDataSetId;
            var secondDataSetId;
            var joinDataSetName = 'jds' + (++dataSetCnt);
            var joinDataSetId;
            newDataSet().then(function (data) {
                firstDatasetName = data.dataSetName;
                firstDataSetId = data.dataSetId;
                return null;
            }).then(function (data) {
                return dataSetCreate(joinData.firstTable, joinData.firstColumns);
            }).then(function () {
                return newDataSet().then(function (data) {
                    secondDatasetName = data.dataSetName;
                    secondDataSetId = data.dataSetId;
                    return null;
                })
            }).then(function (data) {
                return dataSetCreate(joinData.secondTable, joinData.secondColumns);
            }).then(function () {
                var joinObj = {
                    joinType: "inner",
                    joinOperator: "eq",
                    rowFetchLimit: 50,
                    name: joinDataSetName,
                    firstDsID: firstDataSetId,
                    secondDsID: secondDataSetId,
                    leftColumn: joinData.firstTable,
                    rightColumn: joinData.secondTable
                };
                return request.request(url.joinDataSet, 'POST', joinObj).then(function (data) {
                    return refactorObj.joinTablesCreateObj(data.data, joinDataSetName);
                });
            }).then(function (data) {
                var arrColumns = joinData.firstColumns.concat(joinData.secondColumns);
                data.columns.forEach(function (item, i) {
                    item.displayName = arrColumns[i].displayName;
                });
                return createTable(data.dataSetName, "", data.columns);
            }).then(function (data) {
                joinDataSetId = data.data.id;
                var table = elementsModel.tableModelDataSet(data.data, data.data.id);
                if (data.structure.parentId !== null && data.structure.parentId !== undefined) {
                    settingHelper.element.childrens.push(table);
                }
                else {
                    for (var i = 0; i < modelReport.models.container.length; i++) {
                        if (modelReport.models.container[i].selected) {
                            modelReport.models.container[i].elements.push(table);
                            break;
                        }
                    }
                }
                $('#tablesModal').modal('hide');
            });
        }

        function newDataSet() {
            var paramsSet = {
                dataSetName: 'ds' + (++dataSetCnt),
                dataSourceName: dataSourcesParams.name
            };
            return request.request(url.dataSetNew, "POST", null, paramsSet)
                .then(function (data) {
                    url.setDataSetCreate(data.data);
                    return {
                        dataSetName: paramsSet.dataSetName,
                        dataSetId: data.data
                    };
                }, function (data) {
                    console.log(data);
                });
        }

        function dataSetCreate(tableName, tableColumns) {
            var columnData = {
                schema: "CAPWD_DTA",
                tableName: tableName,
                columns: []
            };

            var cnt = 1;
            tableColumns.forEach(function (item) {
                var obj = {};
                obj.name = item.columnName;
                obj.dataType = item.columnType;
                obj.analysis = "dimension";
                obj.nativeName = item.columnName;
                obj.displayName = item.displayName;
                obj.position = cnt++;
                obj.nativeColumnType = item.nativeColumnType;

                columnData.columns.push(obj);
            });
            return request.request(url.dataSetCreate, "POST", columnData).then(function (data) {
                return data;
                // if (vm.dataSetFilters.filters.length > 0) {
                //     console.log(vm.dataSetFilters.filters);
                //     request.request(url.dataSetFilters, "POST", vm.dataSetFilters.filters).then(function (data) {
                //         console.log(data);
                //         vm.dataSetFilters.filters = [];
                //     });
                // }
            }, function (data) {
                console.log(data);
            });
        }

        function createTable(dsName, tableName, tableColumns) {
            var res = {
                col: 1,
                detail: 1,
                footer: 1,
                header: 1,
                name: tableName,
                dataSet: dsName,
                computedColumns: []
            };
            tableColumns.forEach(function (item) {
                if (item.selected) {
                    var row = {
                        name: item.columnName,
                        displayName: item.displayName,
                        nativeDataType: item.nativeColumnType
                    };
                    res.computedColumns.push(row);
                }
            });
            res.col = res.computedColumns.length;
            if (settingHelper.element !== null && (settingHelper.container !== null && settingHelper.container.name === 'grid')) {
                res.parentId = settingHelper.element.id;
            }
            return request.request(url.createTable, 'POST', res).then(function (data) {
                return {
                    data: data.data,
                    structure: res
                }
            }, function (dataError) {
                console.log(dataError);
                $('#tablesModal').modal('hide');
            });
        }
    }
})();