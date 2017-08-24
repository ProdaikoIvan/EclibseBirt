(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('SettingCtrl', SettingCtrl);

    SettingCtrl.$inject = ['$scope', 'settingHelper'];

    function SettingCtrl($scope, settingHelper) {
        var vm = this;
        vm.elements = {
            textAlign: [
                'left', 'center', 'right'
            ]
        };
        vm.deleteElement = deleteElement;
        //$scope.setting = settingHelper;


        $scope.$watch(function () {return settingHelper}, function (newVal, oldVal) {
            vm.style = newVal.element.style;
        }, true);

        function deleteElement() {
            settingHelper.element
            console.log('delete');
        }
    }
})();