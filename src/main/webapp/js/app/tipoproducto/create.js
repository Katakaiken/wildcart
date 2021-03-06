'use strict';

moduleTipoproducto.controller('tipoproductoCreateController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "tipoproducto";

        if (sessionService) {
            $scope.usuariologeado = sessionService.getUserName();
            $scope.loginH = true;
            $scope.usuariologeadoID = sessionService.getId();
        }

        $scope.guardar = function () {
            var json = {
                id: null,
                desc: $scope.desc
            }
            $http({
                method: 'GET',
                withCredentials: true,
                url: '/json?ob=' + $scope.ob + '&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
            }, function (response) {                
                $scope.status = response.status;
            });
        };
        $scope.isActive = toolService.isActive;

    }]);