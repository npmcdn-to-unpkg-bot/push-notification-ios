angular.route('blank.firstRun/configure/index', function(
    $scope,
    $state,
    $log,
    $LocalStorage,
     $Configuration
) {
    //---------------------------------------------------
    //New Slider (Ionic 1.2)
    var slider = null;
    $scope.$watch("slider", function(value) {
        if (value) {
            slider = value;
        }
    });
    //---------------------------------------------------

    $scope.next = function(id) {
        switch (id) {
            case "PUSH_NOTIFICATIONS":
                slider.slideNext();
                break;
            case "GPS_TRACKER":
                var stamps = $Configuration.get("localstorageStamps");
                $LocalStorage.set(stamps.configured, { trst: 1 });
                $state.go("app.home/index");
                break;
        }
    };
});
