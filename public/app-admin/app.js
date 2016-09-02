/**
 * Created by gibanez on 2/9/2016.
 */
var App = angular.module('admin', ['ngMaterial']);
App.controller("MainCtrl", function ($scope, $mdDialog, $mdSidenav) {
    $scope.pathView = function (view) {
        return '../app-admin/view/' + view + '.html';
    };
    $scope.toggleList = function()
    {
        $mdSidenav('left').toggle();
    }
    $scope.toggleConfig = function()
    {
        $mdSidenav('config').toggle();
    }

});
