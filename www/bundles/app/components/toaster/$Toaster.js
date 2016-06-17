/*------------------------------------------------------
 Company:           David Muñoz Gaete
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Toaster Service
 Github:            Fork From (https://github.com/Foxandxss/angular-toastr)
------------------------------------------------------*/
(function() {
    var _debug = false;

    angular.module('app.services')
        .provider('$Toaster', function() {
            var $ref = this;

            //---------------------------------------------------
            //Configurable Variable on .config Step
            var _delay = 3000;

            this.delay = function(timeout) {
                if (timeout > 0) {
                    _timeout = timeout;
                };
                return $ref;
            };

            this.debug = function() {
                _debug = true;
                return $ref;
            };

            this.$get = function(toastr, $log, $q, $interval, $http) {
                return toastr;
            };

        })
        .config(function(toastrConfig) {
            angular.extend(toastrConfig, {
                autoDismiss: false,
                containerId: 'toast-container',
                maxOpened: 1,
                newestOnTop: true,
                positionClass: 'toast-bottom-full-width',
                preventDuplicates: false,
                preventOpenDuplicates: false,
                target: 'body',
                toastClass: 'toast-bottom'
            });
        })
        .run(function($log) {});

})();
