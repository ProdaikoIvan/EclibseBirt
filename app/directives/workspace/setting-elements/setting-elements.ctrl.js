(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('SettingCtrl', SettingCtrl);

    SettingCtrl.$inject = ['$scope', 'settingHelper','deleteFac'];

    function SettingCtrl($scope, settingHelper, deleteFac) {
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
            deleteFac.element = settingHelper;
            console.log(deleteFac.element);
        }
    }
})();