angular.module("app")
    .directive('enableGps', function()
    {
        return {
            restrict: 'E',
            scope:  
            {
                onComplete: '&' //Complete Step
            },
            templateUrl: 'views/firstRun/configure/directives/enableGps.html',
            controller: function($scope, Gps, $ionicLoading, $log)
            {

                var finaly = function(res)
                {
                    //Trigger to parent scope  
                    $ionicLoading.hide();
                    $scope.onComplete();
                };

                // Activate Function 
                $scope.activate = function()
                {

                    $ionicLoading.show(
                    {
                        template: 'Habilitando GPS...',
                    });

                    Gps.start().then(function()
                    {

                        finaly();

                    }, finaly);

                };

                // Skip Function 
                $scope.skip = function()
                {
                    //Trigger to parent scope  
                    $scope.onComplete();
                };

            }
        };
    });
