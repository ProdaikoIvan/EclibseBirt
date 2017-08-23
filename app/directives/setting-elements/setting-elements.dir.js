(function () {
    'use strict';

    angular
        .module('startApp')
        .directive('settingElements', settingElements);

    settingElements.$inject = [];

    function settingElements() {
        var directive = {
            bindToController: true,
            controller: "SettingCtrl",
            templateUrl: "directives/setting-elements/setting-elements.html",
            controllerAs: 'vm',
            link: link,
            restrict: 'AE',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {

            // scope.$watch(function() { return scope.vm.style}, function(newVal, oldVal) {
            //     console.log(element);
            //     console.log(newVal);
            //     // if(oldVal !== undefined && (newVal['margin-left'] !== oldVal['margin-left'] || newVal['margin-right'] !== oldVal['margin-right'])){
            //     //     console.log('change');
            //     // }
            // }, true);
        }
    }
})();