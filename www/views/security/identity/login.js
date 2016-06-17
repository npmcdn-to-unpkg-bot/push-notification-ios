angular.route('security/identity/login/:redirect?', function(
    $log,
    $Configuration,
    $state,
    $Identity,
    $location,
    $scope,
    $Api,
    $cordovaFacebook,
    $stateParams,
    $ionicLoading,
    $ionicHistory,
    $cordovaSplashscreen
) {
    //Hide Splash Screen 
    ionic.Platform.ready(function() {
        if (ionic.Platform.isWebView()) {
            $cordovaSplashscreen.hide();
        }
    });

    $scope.onAuthenticated = function() {

        var redirectRoute = ($stateParams.redirect||$Configuration.get("application").home);
        $location.url(redirectRoute);

    };

    $scope.onCancel = function() {
        $ionicHistory.goBack();
    }

});
