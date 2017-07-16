/**
 * Created by robert on 4/7/16.
 */

(function ($) {

    var Player = function() {
        this._init();
    };
    Player.prototype = {
        speed: 200, // movement in pixels per second
        x: 0,
        y: 0,
        image: [
            ' o /',
            '[\\%',
            '/\\'
        ],
        collision: [ // collision bounding needs to be a rectangle (use spaces)
            ' o ',
            '[| ',
            '/| '
        ],

        //image: [
        //    'ΛOΛ',
        //    'Λ"Λ'
        //],

        _init: function() {

        }
    };
    $.extend(Player.prototype, Space.Mixins.Collidable);

    Space.namespace('Units').Player = Player;

}(jQuery));