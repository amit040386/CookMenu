define(function () {
    'use strict';

    return function() {
        return {
            restrict : "E",
            scope: false,
            templateUrl: "templates/dashboard/toaster.html",
            link: function postLink($scope, element) {
                $scope.isError = false;

                $scope.$on("httpError", function(evt, arg){
                    $scope.isError = true;
                });

               $scope.closeMsg = function() {
                   $scope.isError = false;
               }
            }
        };
    };
});