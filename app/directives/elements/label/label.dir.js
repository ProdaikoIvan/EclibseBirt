(function() {
    'use strict';

    angular
        .module('startApp')
        .directive('labelBlock', labelBlock);

    //
    labelBlock.$inject = [];
    function labelBlock() {
        var directive = {
            bindToController: true,
            controller: 'labelCtrl',
            templateUrl: "directives/elements/label/label.html",
            controllerAs: 'vm',
            replace:true,
            restrict: 'AE',
            scope: {
                element:'=',
                model:'=',
                id:'=',
                parent:'='
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