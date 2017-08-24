(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('EditorCtrl', EditorCtrl);

    EditorCtrl.$inject = ['$scope', 'elementHelper'];

    function EditorCtrl($scope, elementHelper) {
        var vm = this;
        vm.name = "12345";

        vm.models = {
            container: [
                {
                    name: 'container',
                    type: 'container',
                    style: {
                        "margin-left": 0,
                        "margin-top": 0,
                        "margin-right": 0,
                        "margin-bottom": 0,
                        "fontSize": 14,
                        "font-weight": 600,
                        "text-align": 'left',
                        "width": 100,
                        "widthUnit": '%',
                        "height": 100,
                        "heightUnit": '%',
                        "border": '1px solid #cccccc',
                        "background-color": '#ffffff'
                    },
                    selected: true,
                    elements: []
                }
            ]
        };

        $scope.$watch(function () {
            return elementHelper.element
        }, function (table, oldTable) {
            if (table !== null) {
                for (var i = 0; i < vm.models.container.length; i++) {
                    if (vm.models.container[i].selected) {
                        vm.models.container[i].elements.push(table);
                        elementHelper.element = null;
                        console.log(table);
                        break;
                    }
                }
            }
        }, true);
    }
})();