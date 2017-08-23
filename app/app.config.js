angular.module('startApp')
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/edit');
        $stateProvider
            .state('edit', {
                url: '/edit',
                templateUrl: 'templates/editor/editor.html',
                controller: 'EditorCtrl',
                controllerAs: 'vm'
            });
    }
]);

