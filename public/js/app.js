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
        $scope.categories = $scope.getCategories(data);
      });

    //check if logged in on page load
    $http.get('/loggedin')
      .success(function(data, status, headers, config) {
        if (data.success) {
          $scope.loggedIn = true;
        }
      })

    $scope.getCategories = function(datasets) {
      var categories = {};
        var count = 0;
        angular.forEach(datasets, function(obj, key) {
            console.log(count+=1);
            console.log(obj.title);
            console.log(obj);
            angular.forEach(obj.theme, function(value) {
                console.log(value);
                categories[value] ? categories[value]+=1 : categories[value]=1;
            })
        });
        console.log(categories);
        var uniqueCategories = [];
        for (var key in categories) {
            uniqueCategories.push({
              name:key,
              count:categories[key]
            });
        }

         console.log(uniqueCategories);
        return uniqueCategories;
    };

    $scope.updateQuery = function() {
      //console.log('updateQuery Ran!');
      $scope.query = {
        title: $scope.searchString,
        description: $scope.searchString
      }

      console.log($scope.query);
    }

    $scope.mainFilter = function(dataset) {
      //console.log(dataset);

      
      var category=true,
        search=true;

      //first filter by category if there is one selected
      if(dataset.theme && $scope.category) {
        category = dataset.theme[0] == $scope.category;
      }

      //console.log(category);

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

    $scope.formData = {};

    $scope.processForm = function() {
      $http({
        method  : 'POST',
        url     : '/login',
        data    : $.param($scope.formData),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      })
      .success(function(data) {
        (data.success) ? $scope.loggedIn = true : $scope.loggedIn = false;
        console.log($scope.loggedIn);
      });
    };

    $scope.logout = function() {
      $http.get('/logout')
        .success(function(data, status, headers, config) {
          $scope.loggedIn = false;
          console.log($scope.loggedIn);
        })
    };

    $scope.toggleEditing = function(dataset) {
      dataset.editing = !dataset.editing;
    };

    $scope.save = function(dataset) {
      dataset.editing = false;
    }


}]);

//Excellent Angular form tutorial at https://scotch.io/tutorials/submitting-ajax-forms-the-angularjs-way
myApp.controller('loginController', ['$scope', '$http', function($scope, $http) {

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

//generates an array of unique categories for display in the sidebar
myApp.filter('uniqueCategories', function() {
    return function(datasets) {
        var categories = {};
        angular.forEach(datasets, function(obj, key) {
            angular.forEach(obj.theme, function(value) {
                categories[value] ? categories[value]+=1 : categories[value]=1;
            })
        });
        console.log(categories);
        var uniqueCategories = [];
        for (var key in categories) {
            uniqueCategories.push(key);
        }

         console.log(uniqueCategories);
        return uniqueCategories;
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