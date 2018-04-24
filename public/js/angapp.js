var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/tableData.html",
            controller: "mycntrl"
        })
        .when("/new", {
            templateUrl: "views/mongodbForm.html",
            controller: "formController"
        })
        .when("/editpost/:id/edit", {
            templateUrl: "views/editForm.html",
            controller: "editController"
        })
    // .when("/delete/:id",{
    //     templateUrl:"views/tableData.html",
    //     controller:"deleteController"
    // })



})
app.controller('mycntrl', ['$scope', '$http',"$location", function ($scope, $http,$location) {
    $http.get("http://localhost:3000/getarticles").then(function (data) {
        $scope.tableData = data.data;
    });
    $scope.deleteData = function (e) {
        console.log(e.target.id)
        $http.delete("http://localhost:3000/delete", {
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                delId: e.target.id
            }
        }).then(function (data) {
            if (data.data) {
               console.log(data.data);
               $scope.tableData=data.data;
                
            } else {
                console.log("Noooooooooooooooooo")
            }
        })
    }
}]);
app.controller("formController", function ($scope, $http, $location) {
    $scope.insert = function () {
        $http.post("http://localhost:3000/new", $scope.form).then(function (data) {

            if (data.data) {
                $location.path("/")
            }

        })
    }
})
app.controller("editController", function ($scope, $http, $location, $routeParams) {
    $http.get("http://localhost:3000/editpost/" + $routeParams.id + "/edit", $routeParams.id).then(data => {
        const res = data.data[0];
        console.log(res);
        $scope.postFirstname = res.firstname;
        $scope.postLastname = res.lastname;
        $scope.postOrganisation = res.organisation;
    })
    $scope.edit = function () {
        $scope.editData = {
            firstname: $scope.postFirstname,
            lastname: $scope.postLastname,
            organisation: $scope.postOrganisation
        };
        $http.put("http://localhost:3000/editpost/" + $routeParams.id, $scope.editData).then(function (data) {
            if (data.data) {
                $location.path("/");
            }
        })
    }

})
// app.controller("deleteController",function($http,$scope,$location,$routeParams){
//     // $location.path("/");
// console.log("hello");
// $http.get("http://localhost:3000/getarticles").then(function(data){
//         $scope.tableData=data.data;
//     });
//     $scope.deleteData=function(){

//         $http.delete("http://localhost:3000/delete/"+$routeParams.id).then(function(data){
//         if(data.data)
//         {
//             $location.path("/");
//             $scope.tableData=data.data;

//         }    
//         })
//     }
// })