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
            tableModel: tableModel
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
                style: defaultStyleModel.textModel(),
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
                            value: i + "=" + j,
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