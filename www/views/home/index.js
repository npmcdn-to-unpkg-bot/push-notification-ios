angular.route('app.home/index/:sku?:edited?', function(
    $scope,
    $state,
    $log,
    $Api,
    $timeout,
    $Identity,
    $LocalStorage,
    $Configuration,
    $stateParams,
    $ionicPlatform,
    $rootScope,
    $cordovaPush,
    $q
) {

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
        debugger;
        if (notification.alert) {
            
            navigator.notification.alert(notification.alert);
        }

        if (notification.sound) {
            
            var snd = new Media(event.sound);
            snd.play();
        }

        if (notification.badge) {
            
            $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
                // Success!
            }, function(err) {
                // An error occurred. Show a message to the user
            });
        }
    });

});
