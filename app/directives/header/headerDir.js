(function() {
    'use strict';

    angular
        .module('startApp')
        .directive('headerDirective', headerDirective);

    headerDirective.$inject = [];
    function headerDirective() {
        var directive = {
            bindToController: true,
            controller: "headerCtrl",
            controllerAs: 'vm',
            templateUrl:"directives/header/header.html",
            link: link,
            restrict: 'AE',
            // replace: true,
            scope: {
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
})();