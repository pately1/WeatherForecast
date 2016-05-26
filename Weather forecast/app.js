var myApp = angular.module('myApp',['ngRoute', 'ngResource']);

myApp.config(function($routeProvider){
   $routeProvider
   .when('/', {
       templateUrl: 'pages/home.html',
       controller: 'homeController'
   })
         .when('/forecast',{
       templateUrl: 'pages/forecast.html',
       controller: 'forecastController'
   })
   .when('/forecast/:days',{
       templateUrl: 'pages/forecast.html',
       controller: 'forecastController'
   })
});

myApp.service('customService', function(){
   this.city = 'New York, NY';
    
});

myApp.controller('homeController',['$scope','customService', function($scope, customService){
    
    $scope.city = customService.city;
    $scope.$watch('city', function(){
       customService.city = $scope.city; 
    });
    
}]);

myApp.controller('forecastController',['$scope','customService','$resource','$routeParams', function($scope, customService, $resource, $routeParams){
    $scope.days = $routeParams.days || '2';
        $scope.city = customService.city;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback:"JSON_CALLBACK" }, {get: {method: "JSONP"}}
    );     
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days, appid: "ff18631247b697f7a3ab04e8db88cee1"});
    
    $scope.convertToFahrenheit = function(degK){
        return Math.round((1.8 * (degK -273)) + 32);
    }
    
    $scope.convertToDate = function(dt){
        return new Date(dt*1000);
    }
}]);