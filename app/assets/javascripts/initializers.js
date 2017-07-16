/**
 * Created by robert on 4/7/16.
 */

(function() {
    var initializers = Space.namespace("Init");

    initializers.callbacks = {};

    initializers.register = function(key, callback) {
        console.log('Registering initializer for ' + key);
        if(key in initializers.callbacks) {
            console.log('  !! - Initializer already exists for ' + key);
        }

        initializers.callbacks[key] = callback;
    };

    initializers.onLoad = function(key) {
        var params = [].slice.call(arguments).slice(1);

        if (key in initializers.callbacks) {
            console.log('Firing initializer for ' + key);
            initializers.callbacks[key].apply(this, params);
        }
        else {
            console.log('No initializer for ' + key);
        }
    };
}());

(function($) {
    function doDocumentInit() {
        var $document = $(document);
        Space.Init.onLoad('body.' + $('body').attr('class'), $document);
        $document.foundation();
    }

    $(function() {
        doDocumentInit();
    });
}(jQuery));


