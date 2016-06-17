angular.module("app")
    .directive('pushNotifications', function() {
        return {
            restrict: 'E',
            scope:  {
                onComplete: '&' //Complete Step
            },
            templateUrl: 'views/firstRun/configure/directives/pushNotifications.html',
            controller: function($scope, $cordovaBadge) {
               
                // Activate Function 
                $scope.activate = function() {
                    debugger;

                    //ONLY IN DEVICE
                    if (ionic.Platform.isWebView()) {

                        var push = PushNotification.init({
                            android: {
                                senderID: "12345679"
                            },
                            ios: {
                                alert: "true",
                                badge: "true",
                                sound: "true"
                            },
                            windows: {}
                        });

                        push.on('registration', function(data) {
                            $log.debug(data);
                            $scope.onComplete();
                        });

                        push.on('notification', function(data) {
                            $log.debug(data);
                        });

                        push.on('error', function(e) {
                            $log.error(e);
                        });




                    } else {
                        //Trigger to parent scope  
                        $scope.onComplete();
                    }

                };


                // Skip Function 
                $scope.skip = function() {
                    //Trigger to parent scope  
                    $scope.onComplete();
                };

            }
        };
    });
