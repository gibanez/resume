App.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});
App.controller("MainCtrl", function ($scope, $mdDialog, $mdSidenav, $http) {
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
    };

    $http.get('../admin/hobby/query').then(function(response)
    {
        $scope.people = response.data;
    });

    $scope.loadModel = function (model) {

        $http.get('../admin/' + model + '/query').then(function(response)
        {
            $scope.data = response.data;
        });

    }

    $scope.setTemplate = function(tpl)
    {
        $scope.mainTpl = $scope.pathView(tpl);
    }

});
App.controller("MenuLeftCtrl", MenuLeftCtrl);
