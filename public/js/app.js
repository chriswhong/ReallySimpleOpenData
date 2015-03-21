var myApp = angular.module('mainApp', ['angular.filter']);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
    //set the default sort
    $scope.sortBy = '+title';
    $scope.searchString = '';  

    //get data.json
    $http.get('/data.json').
      success(function(data, status, headers, config) {
        $scope.datasets = data;
      });

    // $scope.updateQuery = function() {
    //   console.log('updateQuery Ran!');
    //   $scope.query = {
    //     title: $scope.searchString,
    //     description: $scope.searchString
    //   }

    //   console.log($scope.query);
    // }

    $scope.mainFilter = function(dataset) {
      console.log('mainfilter');
      
      return dataset.title.match(new RegExp($scope.searchString,'i')) ||
        dataset.description.match(new RegExp($scope.searchString,'i'));
      
    }

}]);

//generates an array of unique tags for display in the sidebar
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

        // console.log(uniqueTags);
        return uniqueTags;
    }
});


/*
This directive allows us to pass a function in on an enter key to do what we want.
 */
myApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});