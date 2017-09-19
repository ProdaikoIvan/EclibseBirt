(function () {
    'use strict';

    angular
        .module('startApp')
        .factory('elementsModel', elementsModel);

    elementsModel.$inject = ['defaultStyleModel'];

    function elementsModel(defaultStyleModel) {

        var idCnt = 0;
        return {
            containerModel: containerModel,
            textBoxModel: textBoxModel,
            tableModel: tableModel,
            tableModelDataSet:tableModelDataSet
        };


        function containerModel() {
            return {
                id: ++idCnt,
                name: 'container',
                type: 'container',
                style: {
                    "margin-left": "0",
                    "margin-top": "0",
                    "margin-right": "0",
                    "margin-bottom": "0",
                    "fontSize": "14",
                    "font-weight": "600",
                    "text-align": 'left',
                    "width": "250",
                    "widthUnit": "px",
                    "height": "150",
                    "heightUnit": "px",
                    "border": '1px solid #ccc'
                },
                selected: false,
                elements: []
            };
        }

        function textBoxModel() {
            return {
                id: ++idCnt,
                name: 'textbox',
                type: 'textbox',
                value: null,
                style: defaultStyleModel.textModel(),
                selected: false,
                elements: []
            };

        }

        function tableModelDataSet(obj) {
            function createTable() {
                var tableStructure = {
                    head: [],
                    body: [],
                    footer: []
                };
                var rowBlock = [];
                obj.header.rows[0].cells.forEach(function (item) {
                    console.log(item);
                    var columnItem = {
                        id: item.id,
                        rowType: 'header',
                        value: item.childrens[0].text,
                        style: defaultStyleModel.tableHeaderModel( obj.header.rows[0].length)
                    };
                    rowBlock.push(columnItem);
                });
                tableStructure.head.push(rowBlock);

                obj.detail.rows.forEach(function (item) {
                    var rowBlock = {
                        style: defaultStyleModel.tableRowModel(),
                        row: []
                    };
                    
                    item.cells.forEach(function (cell) {
                        var columnItem = {
                            id: cell.id,
                            rowType: 'body',
                            value: '',
                            style: defaultStyleModel.tableCellModel()
                        };
                        rowBlock.row.push(columnItem);
                    });
                    tableStructure.body.push(rowBlock);
                });
                return tableStructure;
            }

            return {
                id: ++idCnt,
                name: 'table',
                type: 'table',
                tableStructure: createTable(),
                columnNum: obj.columns.length,
                rowNum: obj.header.rows.length + obj.detail.rows.length + obj.footer.rows.length,
                style: {},
                selected: false,
                elements: []
            };
        }

        function tableModel(column, row, headerNames) {
            function createTable() {
                var tableStructure = {
                    head:[],
                    body:[]
                };
                var rowBlock = [];
                for (var j = 0; j < column; j++) {
                    var columnItem = {
                        id: ++idCnt,
                        rowType: 'header',
                        value: headerNames ? headerNames[j] : 'Header' + "=" + j,
                        style: defaultStyleModel.tableHeaderModel(column)
                    };
                    rowBlock.push(columnItem);
                }
                tableStructure.head.push(rowBlock);
                for (var i = 0; i < row; i++) {
                    var rowBlock = {
                        style: defaultStyleModel.tableRowModel(),
                        row: []
                    };
                    for (var j = 0; j < column; j++) {
                        var columnItem = {
                            id: ++idCnt,
                            rowType: 'body',
                            value: '',
                            style: defaultStyleModel.tableCellModel()
                        };
                        rowBlock.row.push(columnItem);
                    }
                    tableStructure.body.push(rowBlock)
                }
                return tableStructure;
            }
            return {
                id: ++idCnt,
                name: 'table',
                type: 'table',
                tableStructure: createTable(),
                columnNum: column,
                rowNum: row,
                style: {

                },
                selected: false,
                elements: []
            };
        }
    }
})();