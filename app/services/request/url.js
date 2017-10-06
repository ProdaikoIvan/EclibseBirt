(function () {
    'use strict';

    angular
        .module('startApp')
        .factory('url', url);

// createGrid: 'services/request/grid.json',
    function url() {
        var server = "http://localhost:8080/http://192.168.1.100:9082/XimpleReportWeb/";
        var url = {
            login: server + 'login_custom',
            initializedDataSource: server + 'report/new',
            newDataSources: server + 'dataSource/newDefault',
            dataSet: server + 'metadata/tables?schemaName=CAPWD_DTA&typeOfRelations=VIEW',
            dataSetNew: server + 'report/odaDataSet',
            createTable: server + 'report/table/new',
            dataSetCreate: null,
            joinDataSet: server + 'report/joinDataSet',
            tableMetadata: server + 'metadata/columns?schemaName=CAPWD_DTA&tableName=',
            saveReport: server + 'report/save',
            createLabel: server + '/report/label',
            createGrid: server + 'report/grid',
            showReport: server + 'reportShow',

            setDataSetCreate: function (id) {
                if (!id) {
                    console.warn('no id', id);
                    return;
                }
                this.dataSetCreate = server + 'report/odaDataSet/' + id + '/fillBaseData';
            }
        };
        return url;
    }
})();