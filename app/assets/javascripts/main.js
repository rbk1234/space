/**
 * Created by robert on 4/7/16.
 */

(function($){

    var Main = function($container) {
        this._$container = $container;
        this._init();
    };
    Main.prototype = {
        // Cached DOM elements
        _$myVariable: null,

        _init: function() {
            console.log('init');
        }

    };

    registerInitializer('body.application', function($panel) {
        $panel.data('main', new Main($panel));
        // put other stuff here if needed
    });

})(jQuery);