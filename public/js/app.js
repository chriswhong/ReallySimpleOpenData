var myApp = angular.module('mainApp', ['angular.filter']);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
    //set the default sort
    $scope.sortBy = '+title';
    //$scope.searchString = false;
    $scope.category = false;

    //get data.json
    $http.get('/data.json').
      success(function(data, status, headers, config) {
        $scope.datasets = data;
      });

    $scope.updateQuery = function() {
      console.log('updateQuery Ran!');
      $scope.query = {
        title: $scope.searchString,
        description: $scope.searchString
      }

      console.log($scope.query);
    }

    $scope.mainFilter = function(dataset) {
      console.log(dataset);

      
      var category=true,
        search=true;

      //first filter by category if there is one selected
      if(dataset.theme && $scope.category) {
        category = dataset.theme[0] == $scope.category;
      }

      console.log(category);

      //then filter title and description based on the search box
      if($scope.searchString) {
        search = dataset.title.match(new RegExp($scope.searchString,'i')) ||
          dataset.description.match(new RegExp($scope.searchString,'i')) 
      }

      return (category && search);
      
        
      
    }

    $scope.setCategory = function(category) {
      $scope.category = category;
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