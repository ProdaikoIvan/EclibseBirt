(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('SettingCtrl', SettingCtrl);

    SettingCtrl.$inject = ['$scope', 'settingHelper', 'deleteFac', 'request', 'url', 'save'];

    function SettingCtrl($scope, settingHelper, deleteFac, request, url, save) {
        var vm = this;
        vm.elements = {
            textAlign: [
                'left', 'center', 'right'
            ]
        };
        vm.saveStyle = saveStyle;
        vm.deleteElement = deleteElement;
        //$scope.setting = settingHelper;


        $scope.$watch(function () {
            return settingHelper
        }, function (newVal, oldVal) {
            if (newVal.element !== null) {
                vm.style = newVal.element.style;
            }
            if(newVal.columnStyle !== null){
                vm.columnStyle = newVal.columnStyle.style;
            }
            if(newVal.rowStyle !== null){
                vm.rowStyle = newVal.rowStyle.style;
            }
        }, true);
        $scope.$watch(function () {
            return settingHelper.element
        }, function (newVal, oldVal) {
            // if(newVal.element.style !== oldVal.element.style && oldVal.element !== null){
            //     console.warn('save data');
            //     console.log(newVal.element);
            //     console.log(oldVal.element);
            // }
            // console.log(newVal);
            // console.log(oldVal);
        });


        function deleteElement() {
            deleteFac.element = settingHelper;
            console.log(deleteFac.element);
        }

        function saveStyle() {
            if(settingHelper.container !== null && settingHelper.container !== 'undefined'){

                if(settingHelper.container.type === 'grid'){
                    save.grid();
                }

            }
            else{
                save.label()
            }
        }
    }
})();