(function () {
    'use strict';

    angular
        .module('startApp')
        .directive('tableElement', tableElement);

    tableElement.$inject = [];

    function tableElement() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            templateUrl:'directives/elements/table/table.html',
            controller: 'tableCtrl',
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
            console.log(scope);
        }
    }
})();