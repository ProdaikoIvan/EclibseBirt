(function () {
    'use strict';

    angular
        .module('startApp')
        .directive('gridElement', gridElement);

    gridElement.$inject = [];

    function gridElement() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            templateUrl:'directives/elements/grid/grid.html',
            controller: 'gridCtrl',
            controllerAs: 'vm',
            link: link,
            restrict: 'AE',
            scope: {
                element:'=',
                model:'=',
                number:'='
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }
})();