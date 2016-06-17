angular.module("app")
    .directive('pushNotifications', function() {
        return {
            restrict: 'E',
            scope:  {
                onComplete: '&' //Complete Step
            },
            templateUrl: 'views/firstRun/configure/directives/pushNotifications.html',
            controller: function($scope, $cordovaBadge, $cordovaPush, $cordovaSplashscreen) {
                //Hide Splash Screen 
                if (ionic.Platform.isWebView()) {
                    $cordovaSplashscreen.hide();
                }

                // Activate Function 
                $scope.activate = function() {

                    //ONLY IN DEVICE
                    if (ionic.Platform.isWebView()) {
                        var iosConfig = {
                            "badge": true,
                            "sound": true,
                            "alert": true,
                        };

                        $cordovaPush.register(iosConfig).then(function(deviceToken) {
                            //f9b9e8f01ab2a609346e85652428f61772819391a9e046b145af7db191dac496
                            $log.debug(deviceToken);

                            //PROMOT FOR NOTIFICATION ACCESS
                            $cordovaBadge.hasPermission().then(function() {

                                //Trigger to parent scope  
                                $scope.onComplete();
                            });




                        }, function() {
                            //ASK FOR PERMISSION
                            window.plugin.notification.local.promptForPermission();

                            //RECHECK!
                            $scope.activate();
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
