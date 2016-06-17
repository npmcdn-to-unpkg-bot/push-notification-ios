/*------------------------------------------------------
 Company:           Gale Framework.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Application Cleanse Manager
------------------------------------------------------*/
angular.module('app.services')
    .provider('ApplicationCleanse', function() {
        var $ref = this;

        //---------------------------------------------------
        //Configurable Variable on .config Step
        var _debug = false;

        this.debug = function() {
            _debug = true;
            return $ref;
        };

        this.$get = function(
            $log,
            $q,
            $timeout,
            $LocalStorage,
            $Identity) {
            var self = {};

            self.clean = function(isNewVersion) {
                var defers = [];
                var defer = $q.defer();

                //Database's Destroy ^^
                //defers.push(NotificationSynchronizer.reset());


                // CLEAN OLD STUFF
                $q.all([defers]).then(function(resolves) {

                    //NEW VERSION?? (FULL RESET)
                    if (isNewVersion) {

                        //CLEAN ALL
                        $LocalStorage.clear();
                        $Identity.logOut();

                        if (_debug) {
                            $log.warn("NEW VERSION: Remove all data");
                        }

                        defer.reject("NEW_VERSION");

                    }

                    defer.resolve();

                }, function() {
                    defer.reject("ERROR_IN_CLEANSE")
                });

                return defer.promise;

            };

            return self;
        };

    });
