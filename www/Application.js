/*

    gale:                   ANGULAR-GALE LIBRARY
    ionic:                  IONIC SDK
    app:                    CUSTOM PROJECT LIBRARY
    mocks:                  MOCKS ONLY FOR TESTING
    ngCordova:              CORDOVA LIBRARY
    ngIOS9UIWebViewPatch:   IOS 9 FICKLERING PATCH (https://gist.github.com/IgorMinar/863acd413e3925bf282c)

*/
angular.module('App', [
        'gale',
        'ionic',

        'app',
        'mocks',

        'ngCordova',
        'ngIOS9UIWebViewPatch'
    ])
    .run(function($location, $Configuration, $log) {

        //REDIRECT TO MAIN HOME (ONLY WHEN NO HAVE PATH)
        var currentPath = $location.url();
        var boot = $location.path("boot").search({
            path: currentPath
        });

        $location.url(boot.url());

    })
    //CHANGE STATUS BAR TO LIGHT CONTENT
    .run(function($ionicPlatform) {
        //IOS, SET Light Background in Fullscreen mode
        $ionicPlatform.ready(function() {
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

            //Full screen overlays
            //ionic.Platform.fullScreen(true, true);
        });
    })
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.views.swipeBackEnabled(false);
    })
    .config(function(GpsProvider, SynchronizerProvider, MocksProvider, CONFIGURATION) {
        SynchronizerProvider
            .autoLoadSynchronizers() //Auto Load Synchronizer via Reflection
            .frequency(15000); //Frequency between sync process

        //GPS Configuration
        GpsProvider
            //.enableDeviceGPS() //Enable GPS Tracking
            //.autoStart() //Auto Start
            //.accuracyThreshold(65) //Real GPS Aproximaty is aprox 65, (in meters)
            //.frequency(5000); //Try to get GPS Track each 5 seconds


        //Simulate a Short Delay ^^, (More 'Real' experience)
        if (CONFIGURATION.debugging) {
            MocksProvider
                //.setDelay(400);
        }

    })
    .config(function(
        MocksProvider,
        SynchronizerProvider,
        GpsProvider,
        ApplicationCleanseProvider,
        CONFIGURATION) {

        //Enable Debug for GPS and RouteTracker
        if (CONFIGURATION.debugging) {
            //Debugger Information
            MocksProvider.debug();
            SynchronizerProvider.debug();
            ApplicationCleanseProvider.debug();
            GpsProvider.debug();
        }

    })
    .config(function($ApiProvider, FileProvider, CONFIGURATION) {
        //API Base Endpoint
        var API_ENDPOINT = CONFIGURATION.API_Endpoint;
        $ApiProvider.setEndpoint(API_ENDPOINT);
    })
    .config(function($IdentityProvider) {
        $IdentityProvider
            //.enable() //Enable
            .redirectToLoginOnLogout(false)
            .setLogInRoute("security/identity/login")
            .setIssuerEndpoint("Security/Authorize")
            .setWhiteListResolver(function(toState, current) {

                //Only Enable Access to Exception && Public State's
                if (toState.name.startsWith("boot") ||
                    toState.name.startsWith("blank.") ||
                    toState.name.startsWith("app.") ||
                    toState.name.startsWith("exception.") ||
                    toState.name.startsWith("public.")) {
                    return true;
                }

                //Restrict Other State's
                return false;

            });

    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                // ---------------------------------------------
                // PUBLIC LAYOUT (ANONYMOUS)
                // ---------------------------------------------
                templateUrl: "views/layouts/public.html",
                controller: "PublicLayoutController"
            })
            .state('blank', {
                url: "/blank",
                abstract: true,
                // ---------------------------------------------
                // BLANK LAYOUT (EMPTY MASTER)
                // ---------------------------------------------
                templateUrl: "views/layouts/blank.html",
                controller: "BlankLayoutController"
            })
            .state('exception', {
                url: "/exception",
                abstract: true,
                // ---------------------------------------------
                // EXCEPTION TEMPLATE
                // ---------------------------------------------
                templateUrl: "views/layouts/exception.html",
                controller: "ExceptionLayoutController"
            });

        $urlRouterProvider.otherwise(function($injector, $location) {
            if ($location.path() !== "/") {
                var $state = $injector.get("$state");
                var $log = $injector.get("$log");

                $log.error("404", $location);
                $state.go("exception.error/404");
            }
        });
    })
    .config(function($logProvider, CONFIGURATION) {
        $logProvider.debugEnabled(CONFIGURATION.debugging || false);
    });
