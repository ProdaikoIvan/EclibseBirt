(function() {
    'use strict';

    angular
        .module('startApp')
        .directive('textBlock', textBlock);

        textBlock.$inject = [];
    function textBlock() {
        var directive = {
            bindToController: true,
            controller: 'TextBlockCtrl',
            templateUrl: "directives/elements/text-block/text-block.html",
            controllerAs: 'vm',
            replace:true,
            restrict: 'AE',
            scope: {
                element:'=',
                model:'=',
                number:'='
            },
            compile: compile
        };
        return directive;


        function compile(element, attributes, transclude){
            return {
                pre: function (scope) {

                },
                post: function(scope, element, attributes, controller, transcludeFn){

                }
            }
        }
    }
})();