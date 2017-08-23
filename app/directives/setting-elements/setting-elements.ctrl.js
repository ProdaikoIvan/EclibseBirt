(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('SettingCtrl', SettingCtrl);

    SettingCtrl.$inject = ['$scope', 'settingHelper'];

    function SettingCtrl($scope, settingHelper) {
        var vm = this;
        vm.elements = {
            textAlign:[
                'left','center','right'
            ]
        };


        vm.style = settingHelper.element.style;

        console.log(settingHelper.element);
        $scope.$watch(function() { return settingHelper}, function(newVal, oldVal) {
            vm.style = newVal.element.style;
            console.log(newVal);
        }, true);


    }
})();