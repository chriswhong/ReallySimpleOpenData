var myApp = angular.module('mainApp', []);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $http.get('/data.json').
      success(function(data, status, headers, config) {
        $scope.datasets = data;
      });

    $scope.spice = 'very';

    $scope.chiliSpicy = function() {
        $scope.spice = 'chili';
    };

    $scope.jalapenoSpicy = function() {
        $scope.spice = 'jalapeño';
    };
}]);