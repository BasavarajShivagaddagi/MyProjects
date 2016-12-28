
    angular.module("starter").factory('httpLoaderInterceptor', ['$rootScope', function ($rootScope) {
        // Active request count
        var requestCount = 0;

        function startRequest(config) {
            // If no request ongoing, then broadcast start event
            if (!requestCount) {
                $rootScope.$broadcast('httpLoaderStart');
            }

            requestCount++;
            return config;
        }

        function endRequest(arg) {
            // No request ongoing, so make sure we don’t go to negative count          
            if (!requestCount)
                return;

            requestCount--;
            // If it was last ongoing request, broadcast event
            if (!requestCount) {
                $rootScope.$broadcast('httpLoaderEnd');
            }

            return arg;
        }

        // Return interceptor configuration object
        return {
            'request': startRequest,
            'requestError': endRequest,
            'response': endRequest,
            'responseError': endRequest
        };
    }])

    .config(['$httpProvider', function ($httpProvider) {

        $httpProvider.interceptors.push('httpLoaderInterceptor');
    }])

    .directive('preLoader', function () {

        return {
            restrict: 'E',

            template: '<div class="loading"><span><ion-spinner icon="lines" class="spinner-calm"></ion-spinner></span></div>',
            link: function (scope, element) {
                function shownType() {
                    element.removeClass("hide");
                }

                function hideElement() {
                    element.addClass("hide");
                }

                scope.$on('httpLoaderStart', function () {
                    element.css('display', shownType);
                });

                scope.$on('httpLoaderEnd', hideElement);
                // Initially hidden
                hideElement();
            }

        };
    });


