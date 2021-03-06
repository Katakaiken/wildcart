'use strict';

moduleLinea.controller('lineaEditController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "linea";
        if (sessionService) {
            $scope.usuariologeado = sessionService.getUserName();
            $scope.loginH = true;
        }

        $http({
            method: 'GET',
            url: '/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoLinea = response.data.message;
        }, function (response) {
            $scope.ajaxDatoLinea = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.guardar = function () {
            var json = {
                id: $scope.ajaxDatoLinea.id,
                cantidad: $scope.ajaxDatoLinea.cantidad,
                id_producto: $scope.ajaxDatoLinea.obj_Producto.id,
                id_factura: $scope.ajaxDatoLinea.obj_Factura.id
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: '/json?ob=' + $scope.ob + '&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
            }, function (response) {
                $scope.ajaxDatoLinea = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };

        $scope.isActive = toolService.isActive;

    }]);