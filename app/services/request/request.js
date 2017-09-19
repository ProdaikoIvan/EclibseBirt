(function () {
    'use strict';

    angular
        .module('startApp')
        .factory('request', request);

    request.$inject = ['$http', '$q', 'url'];

    function request($http, $q) {
        return {
            dataSet: dataSet,
            request:request
        };
        function request(urlPath, method, data, params) {
            console.log('urlPath', urlPath);
            var defer = $q.defer();
            $http({
                method: method,
                url: urlPath,
                data: data,
                params: params,
                withCredentials: true
            }).then(function (dataResult) {
                defer.resolve(dataResult);
                console.log(dataResult);
            }, function (dataError) {
                defer.reject(dataError);
            });
            return defer.promise;
        }
        function dataSet() {
            var tables = [
                {
                    id: 0,
                    name: "Personal",
                    rows:[
                        {id: 0, name: 'ID' },
                        {id: 1, name: 'First Name' },
                        {id: 2, name: 'Last Name' },
                        {id: 3, name: 'Birthday' },
                        {id: 4, name: 'Experience' },
                        {id: 5, name: 'Carier start' },
                        {id: 6, name: 'Position' }
                    ]
                },
                {
                    id: 1,
                    name: "Report september 2016",
                    rows:[
                        {id: 0, name: 'ID' },
                        {id: 1, name: 'First Name' },
                        {id: 2, name: 'Last Name' },
                        {id: 3, name: 'Birthday' },
                        {id: 4, name: 'Experience' },
                        {id: 5, name: 'Carier start' },
                        {id: 6, name: 'Position' }
                    ]
                },
                {
                    id: 2,
                    name: "Report June 2017",
                    rows:[
                        {id: 0, name: 'ID' },
                        {id: 1, name: 'First Name' },
                        {id: 2, name: 'Last Name' },
                        {id: 3, name: 'Birthday' },
                        {id: 4, name: 'Experience' },
                        {id: 5, name: 'Carier start' },
                        {id: 6, name: 'Position' }
                    ]
                },
                {
                    id: 3,
                    name: "Report March 2017",
                    rows:[
                        {id: 0, name: 'ID' },
                        {id: 1, name: 'First Name' },
                        {id: 2, name: 'Last Name' },
                        {id: 3, name: 'Birthday' },
                        {id: 4, name: 'Experience' },
                        {id: 5, name: 'Carier start' },
                        {id: 6, name: 'Position' }
                    ]
                }
            ];

            return tables;
        }

    }
})();