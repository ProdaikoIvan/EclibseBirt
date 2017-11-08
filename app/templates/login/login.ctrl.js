(function () {
    'use strict';

    angular
        .module('startApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['request','url','toastr','$rootScope', '$state'];
    function LoginCtrl(request,url,toastr,$rootScope, $state) {
        var vm = this;
        vm.login = login;

        vm.loginData = {
            name: "QVIKTOR",
            password: "QVIKTOR1234"
        };

        function login(){
            if(!checkLoginData()) {
                return;
            }
            var headers = {
                'Content-Type': 'application/json'
            };
            var data = {
                userName: vm.loginData.name,
                userPassword: vm.loginData.password
            };

            request.request(url.login, "POST",{},data,headers)
                .then(function (data) {
                if (data.status === 200) {
                    $rootScope.isLogined = true;
                    $state.go('edit');
                    return true;
                }
            }, function (dataErr) {
                $rootScope.isLogined = false;
                toastr.error('Authorization failed','Error',{
                    timeOut:5000
                })
            });
        }

        function checkLoginData(){
            if(vm.loginData.name === "" ||
               vm.loginData.password === ""){
                toastr.error("Please input all data",'Login error', {timeOut:4000});
                return false;
            }
            return true;
        }

    }
})();