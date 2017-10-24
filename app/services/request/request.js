(function () {
    'use strict';

    angular
        .module('startApp')
        .factory('request', request);

    request.$inject = ['$http', '$q', 'url'];

    function request($http, $q) {
        return {
            request:request
        };
        function request(urlPath, method, data, params) {
            var defer = $q.defer();
            $http({
                method: method,
                url: urlPath,
                data: data,
                params: params,
                withCredentials: true
            }).then(function (dataResult) {
                defer.resolve(dataResult);
            }, function (dataError) {
                defer.reject(dataError);
            });
            return defer.promise;
        }
    }
})();