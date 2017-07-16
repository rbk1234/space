/**
 * Created by robert on 4/16/16.
 */


(function($) {

    var util = Space.namespace('Util');

    util.makeCallback = function (target, method) {
        return function () {
            method.apply(target, arguments);
        };
    };

    util.defaultFor = function(arg, defaultVal) {
        return typeof arg !== 'undefined' ? arg : defaultVal;
    }

}(jQuery));
