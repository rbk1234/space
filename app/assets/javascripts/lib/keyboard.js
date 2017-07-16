/**
 * Created by robert on 4/7/16.
 */


(function($) {

    var Keyboard = function() {
        this._init();
    };
    Keyboard.prototype = {
        keysDown: {},

        _init: function() {
            var self = this;

            $(document).off('keydown').on('keydown', function(evt) {
                if (evt.keyCode >= 37 && evt.keyCode <= 40) {
                    evt.preventDefault();
                }
                self.keysDown[evt.keyCode] = true;
            });

            $(document).off('keyup').on('keyup', function(evt) {
                if (evt.keyCode >= 37 && evt.keyCode <= 40) {
                    evt.preventDefault();
                }
                delete self.keysDown[evt.keyCode];
            });
        }
    };

    Space.namespace('IO').Keyboard = Keyboard;

}(jQuery));



/*		KEYBOARD CONTROLLER		*/

/** 	Controls the keyboard input		*/

//KeyboardController({
//    // Movement keys
//    37: function() { theGame.frame.player.moveLeft(); },
//    38: function() { theGame.frame.player.moveUp(); },
//    39: function() { theGame.frame.player.moveRight(); },
//    40: function() { theGame.frame.player.moveDown(); },
//
//    65: function() { theGame.frame.player.moveLeft(); },
//    87: function() { theGame.frame.player.moveUp(); },
//    68: function() { theGame.frame.player.moveRight(); },
//    83: function() { theGame.frame.player.moveDown(); },
//
//    81: function() { theGame.frame.player.moveLeft(); },
//    69: function() { theGame.frame.player.moveRight(); },
//
//    // Abiility keys
//    49: function() { theGame.frame.player.castAbility1(); },
//    50: function() { theGame.frame.player.castAbility2(); },
//    51: function() { theGame.frame.player.castAbility3(); },
//    52: function() { theGame.frame.player.castAbility4(); }
//
//
//}, frameRate);	// <-- This is the key repeat rate; how many milliseconds pass before key is repeated
//
//var lastPressed = 0;
//
///*		This function sets the key repeat rate (so it is standard across all computers		*/
//function KeyboardController(keys, repeat) {
//    // Lookup of key codes to timer ID, or null for no repeat
//    //
//    var timers= {};
//
//    // When key is pressed and we don't already think it's pressed, call the
//    // key action callback and set a timer to generate another one after a delay
//    //
//    document.onkeydown= function(event) {
//        var key= (event || window.event).keyCode;
//        if (key == 37 || key == 38 || key == 39 || key == 40) {
//            lastPressed = key;
//        }
//
//        if (!(key in keys))
//            return true;
//        if (!(key in timers)) {
//            timers[key]= null;
//            keys[key]();
//            if (repeat!==0)
//                timers[key]= setInterval(keys[key], repeat);
//        }
//        return false;
//    };
//
//    // Cancel timeout and mark key as released on keyup
//    //
//    document.onkeyup= function(event) {
//        var key= (event || window.event).keyCode;
//
//        if (key == 37 || key == 38 || key == 39 || key == 40) {
//            lastPressed = 0;
//        }
//
//        if (key in timers) {
//            if (timers[key]!==null)
//                clearInterval(timers[key]);
//            delete timers[key];
//        }
//    };
//
//    // When window is unfocused we may not get key events. To prevent this
//    // causing a key to 'get stuck down', cancel all held keys
//    //
//    window.onblur= function() {
//        for (key in timers)
//            if (timers[key]!==null)
//                clearInterval(timers[key]);
//        timers= {};
//    };
//};
