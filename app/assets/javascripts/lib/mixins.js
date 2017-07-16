/**
 * Created by robert on 4/16/16.
 */

(function ($) {
    var Collidable = {
        bottom: function () {
            return this.y + this.collision.length * FONT_SIZE;
        },
        top: function () {
            return this.y;
        },
        left: function () {
            return this.x;
        },
        right: function () {
            return this.x + this.collision[0].length * FONT_WIDTH;
        }
    };

    Space.namespace('Mixins').Collidable = Collidable;

}(jQuery));