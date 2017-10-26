(function () {
    'use strict';

    angular
        .module('startApp')
        .directive('labelBlock', labelBlock);

    //
    labelBlock.$inject = ['request', 'url'];

    function labelBlock(request, url) {
        var directive = {
            bindToController: true,
            controller: 'labelCtrl',
            templateUrl: "directives/elements/label/label.html",
            controllerAs: 'vm',
            replace: true,
            restrict: 'AE',
            scope: {
                element: '=',
                model: '=',
                id: '=',
                parent: '='
            },
            link: link
        };
        return directive;


        function link(scope, elem, attrs) {
            var scrollable = elem.find('button.btn-delete-element');
            elem.bind('mouseover', function () {
                scrollable.css('display', 'block');
            });
            elem.bind('mouseleave', function () {
                scrollable.css('display', 'none');
            });

            scrollable.bind('click', function () {
                //request.request(url.)
                var el = scope.vm.element;

                request.request(url.createLabel+ '/' + el.id, 'DELETE').then(function (data) {
                    console.log(data);
                    scope.vm.model.forEach(function (item, i) {
                        if(item.id === el.id){
                            scope.vm.model.splice(i, 1);
                        }
                    })
                });
            })
        }
    }
})();