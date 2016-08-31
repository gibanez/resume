var App = angular.module('AppResume', []);
App.factory('webService', function ($http) {
   return {
       getAll: function()
       {
            return $http.get('./query');
       }
   }
});
App.filter('ageFilter', function(){
    return function(birthday){
        var birthday = new Date(birthday);
        var today = new Date();
        var age = ((today - birthday) / (31557600000));
        var age = Math.floor( age );
        return age;
    }
});
App.controller('MainCtrl', function ($scope, webService) {
    $scope.user = {};
    $scope.skills = {};

    $scope.applyJquery = function () {

        $('.item-skills').each(function(){
            var newWidth = $(this).parent().width() * $(this).data('percent');
            $(this).width(0);
            $(this).animate({
                width: newWidth
            }, 1000);
        });
        $('.icons-red').each(function(){
            var height = $(this).height();
            $(this).animate({
                height: 14
            }, 2000);
        });
    };

    webService.getAll().then(function (response) {
        console.info(response.user);
        var data = response.data;
        $scope.user = data.user;
        $scope.skills = data.skills;
    })

    $scope.$watch('skills', function(vo, vn)
    {
        $scope.applyJquery();
    });


});