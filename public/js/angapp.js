var app=angular.module("myApp",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"views/tableData.html",
        controller:"mycntrl"
    })
    .when("/new",{
        templateUrl:"views/mongodbForm.html",
        controller:"formController"
    })
    .when("edit/:id",{
        templateUrl:"views/editForm.html",
        controller:"editController"
    })
   
    

})
app.controller('mycntrl',['$scope','$http',function($scope,$http){
    $http.get("http://localhost:3000/getarticles").then(function(data){
        $scope.tableData=data.data;
    });
   
}]);
app.controller("formController",function($scope,$http,$location){
$scope.insert=function(){
    $http.post("http://localhost:3000/new",$scope.form).then(function(data){

    if(data.data)
    {
        $location.path("/")
    }

    })
}
})
app.controller("editController",function($scope,$http,$location,$routeParams){
    
})