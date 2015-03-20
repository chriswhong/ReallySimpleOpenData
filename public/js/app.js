var myApp = angular.module('mainApp', ['angular.filter']);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $http.get('/data.json').
      success(function(data, status, headers, config) {
        $scope.datasets = data;
      });

  
}]);

myApp.filter('uniqueTags', function() {
    return function(datasets) {
        var tags = {};
        angular.forEach(datasets, function(obj, key) {
            angular.forEach(obj.keyword, function(value) {
                tags[value] = 1;
            })
        });
        var uniqueTags = [];
        for (var key in tags) {
            uniqueTags.push(key);
        }

        console.log(uniqueTags);
        return uniqueTags;
    }
});