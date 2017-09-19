angular.module('startApp')
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/edit');
        $stateProvider
            .state('edit', {
                url: '/edit',
                templateUrl: 'templates/editor/editor.html',
                controller: 'EditorCtrl',
                controllerAs: 'vm',
                resolve: {
                    dataSet: function (request, url) {
                        return null;
                        // return request.request(url.dataSet, 'GET').then(function (data) {
                        //     return data;
                        // });
                    }
                }
            });
    }
]);

