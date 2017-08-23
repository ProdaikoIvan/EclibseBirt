(function () {
    'use strict';

    angular
        .module('startApp')
        .factory('defaultStyleModel', defaultStyleModel);

    defaultStyleModel.$inject = [];

    function defaultStyleModel() {

        return {
            tableHeaderModel: tableHeaderModel,
            tableCellModel: tableCellModel,
            tableRowModel: tableRowModel,
            textModel: textModel
        };


        function tableHeaderModel(column) {
            return {
                'background-color': '#4CAF50',
                'width': 100 / column,
                'widthUnit': '%',
                'height': 50,
                'heightUnit': 'px',
                'font-size': 14,
                'color': '#000000',
                'text-align': 'center'
            }
        }

        function tableRowModel() {
            return {
                'height': 50,
                'heightUnit': 'px'
            }
        }

        function tableCellModel(width) {
            return {
                'background': '#4CAF50;',
                'font-size': 14,
                'color': '#000000',
                'text-align': 'center',
                'border-width': '1px',
                'border-style': 'solid',
                'border-color': '#ccc',
                'height': 50,
                'heightUnit': 'px'
            }
        }

        function textModel() {
            return {
                'margin-left': 0,
                'margin-top': 0,
                'margin-right': 0,
                'margin-bottom': 0,
                'padding-left': 10,
                'padding-top': 0,
                'padding-right': 10,
                'padding-bottom': 0,
                'font-size': 14,
                'font-size-unit': 'px',
                'font-bold': '600',
                'text-align': 'center',
                'width': 100,
                'widthUnit': '%',
                'height': 30,
                'heightUnit': 'px',
                'border': '1px solid #ccc',
                'background-color': '#ffffff',
                'color': '#000000'
            }
        }


    }
})();