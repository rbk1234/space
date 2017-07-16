/**
 * Created by robert on 4/7/16.
 */

var FONT_SIZE = 12;
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 600;

                            // num units per canvas
//var FONT_WIDTH = CANVAS_WIDTH/62;
var FONT_WIDTH = 6;
//var UNIT_HEIGHT = CANVAS_HEIGHT/26;

(function($){

    var Main = function($container) {
        this._init();
    };
    Main.prototype = {
        _timing: null,
        _canvases: null,

        _player: null,
        _screen: null,
        _keyboard: null,

        _init: function() {
            this._initializeTiming();

            this._setupIO();
            this._loadCanvases();
            this._loadPlayer();
            this._newGame();

            this._run();
        },

        _setupIO: function() {
            this._keyboard = new Space.IO.Keyboard();
        },

        _loadCanvases: function() {
            var self = this;
            this._canvases = {};

            $.each(['background', 'main', 'foreground', 'hidden'], function(index, value) {
                self._loadCanvas(value);
            });
        },

        _loadCanvas: function(id) {
            var $canvas = $('#'+id+'-canvas');
            var canvas = $canvas.get(0);
            var ctx = canvas.getContext('2d');

            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;

            ctx.scale(2,1); // Important: Makes the width and height equal

            ctx.font = FONT_SIZE + 'px monospace';
            ctx.fillStyle = "#000";
            ctx.translate(0.5, -2.5); // TODO needed to make non-blurry?

            this._canvases[id] = {
                $canvas: $canvas,
                ctx:ctx
            };
        },

        _loadPlayer: function() {
            this._player = new Space.Units.Player();
            this._screen = new Space.Screens.Screen1();
        },

        _initializeTiming: function() {
            var self = this;

            /*. Fallback support, window.requestAnimationFrame isn't fully supported by all browsers .*/
            window.requestFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    function (c) {
                        window.setTimeout(c, 50);
                    };
            })();

            /*. Time based variables, all in milliseconds .*/
            this._timing = {
                now: Date.now() || (new Date).getTime(), // Current tick's time
                then: Date.now() || (new Date).getTime(), // Last tick's time
                delta: 0, // Time since last tick
                total: 0, // Total time elapsed
                periodicFns: [] // functions to call periodically
            };


            /*. Main function .*/
            this._run = function () {
                /*. Calculate time since last tick .*/
                self._timing.now = Date.now() || (new Date).getTime(); // Get current time
                self._timing.delta = self._timing.now - self._timing.then; // Get time since last tick
                self._timing.then = self._timing.now; // Reset last tick time
                self._timing.total += self._timing.delta;

                self._gameLoop();

                /*. Run function again as soon as possible without lagging .*/
                window.requestFrame(self._run);
            };
        },

        _newGame: function() {
            //this._player.x = this._canvases.main.canvas.width / 2;
            //this._player.y = this._canvases.main.canvas.height / 2;
            this._player.x = 50;
            this._player.y = 50;

            this._createPeriodicFn(Space.Util.makeCallback(this, this._eachSecond), 1000);
        },

        _gameLoop: function() {
            this._iteratePeriodicFns();

            var modifier = this._timing.delta / 1000;

            if (this._isOverlapped(this._player, this._screen)) {
                modifier = 0;
            }

            //console.log('x: '+this._player.x + ', y: '+this._player.y);

            var keysDown = this._keyboard.keysDown;
            if (38 in keysDown) { // Player holding up
                this._player.y -= this._player.speed * modifier;
            }
            if (40 in keysDown) { // Player holding down
                this._player.y += this._player.speed * modifier;
            }
            if (37 in keysDown) { // Player holding left
                this._player.x -= this._player.speed * modifier;
            }
            if (39 in keysDown) { // Player holding right
                this._player.x += this._player.speed * modifier;
            }

            // Gravity
            //this._player.y += 200 * modifier;

            this._drawMain();
        },

        _drawBackground: function() {
            var ctx = this._canvases.background.ctx;
            var $canvas = this._canvases.background.$canvas;

            ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
            this._drawImage(this._screen.background, ctx)
        },

        _drawMain: function() {
            var ctx = this._canvases.main.ctx;
            var $canvas = this._canvases.main.$canvas;

            ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
            this._drawImage(this._player.image, ctx, this._player.x, this._player.y);
        },

        _drawImage: function(charArray, ctx, x, y) {
            x = Space.Util.defaultFor(x, 0);
            y = Space.Util.defaultFor(y, 0);
            y += FONT_SIZE; // So top row not cut off

            //for (var row = 0; row < charArray.length; row++) {
            //    ctx.fillText(charArray[row], x, y + row * FONT_SIZE);
            //}

            for (var row = 0; row < charArray.length; row++) {
                for (var col = 0; col < charArray[row].length; col++) {
                    ctx.fillText(charArray[row][col], x + col * FONT_WIDTH, y + row * FONT_SIZE);
                }
            }
        },


        _eachSecond: function(iterations) {
            this._updateFps();
            this._drawBackground();
        },

        _updateFps: function() {
            var fps = (1000 / this._timing.delta).toFixed(1);
            var total = (this._timing.total / 1000).toFixed(1);

            $('#fps').text(fps);
            $('#total-time').text(total);
        },


        _isOverlapped: function(unit1, unit2) {
            // iterate through collision arrays (adding rounded x/y to each value)

            if (this._outsideBoundingBox(unit1, unit2)) {
                console.log('instant fail');
                return false;
            }

            // check individual chars vs each other

            var roundX1 = Math.round(unit1.x / FONT_WIDTH);
            var roundY1 = Math.round(unit1.y / FONT_SIZE);
            var roundX2 = Math.round(unit2.x / FONT_WIDTH);
            var roundY2 = Math.round(unit2.y / FONT_SIZE);

            for (var row1 = 0; row1 < unit1.collision.length; row1++) {
                for (var col1 = 0; col1 < unit1.collision[row1].length; col1++)
                {
                    if (unit1.collision[row1][col1] !== ' ') {
                        var x = roundX1 + col1;
                        var y = roundY1 + row1;

                        for (var row2 = 0; row2 < unit2.collision.length; row2++) {
                            for (var col2 = 0; col2 < unit2.collision[row2].length; col2++) {

                                if (unit2.collision[row2][col2] !== ' ') {
                                    var x2 = roundX2 + col2;
                                    var y2 = roundY2 + row2;

                                    if ((x === x2) && (y === y2)) {
                                        console.log(unit1.collision[row1][col1]+' : '+unit2.collision[row2][col2]);
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return false;
        },

        // Rapid check to see if collision is possible
        _outsideBoundingBox: function(unit1, unit2) {
            // true if outsideBottom || outsideTop || outsideLeft || outsideRight

            return (
                (unit1.bottom() < unit2.top()) ||
                (unit2.bottom() < unit1.top()) ||
                (unit1.left() > unit2.right()) ||
                (unit2.left() > unit1.right())
            );
        },



        // ---------------------------------------------------------------- Periodic function helpers

        _createPeriodicFn: function(fn, period, cache) {
            cache = Space.Util.defaultFor(cache, false);

            this._timing.periodicFns.push({
                fn: fn,
                period: period,
                current: period,
                cache: cache
            });
        },

        _iteratePeriodicFns: function() {
            var delta = this._timing.delta;

            $.each(this._timing.periodicFns, function(index, periodicFn) {
                periodicFn.current += delta;
                if (periodicFn.current >= periodicFn.period) {
                    if (periodicFn.cache) {
                        periodicFn.current -= periodicFn.period;
                        periodicFn.fn();
                    }
                    else {
                        var iterations = 0;
                        while (periodicFn.current >= periodicFn.period) {
                            iterations += 1;
                            periodicFn.current -= periodicFn.period;
                        }
                        periodicFn.fn(iterations);
                    }
                }
            });
        }

    };

    Space.Init.register('body.application', function($panel) {
        $panel.data('main', new Main($panel));
    });

})(jQuery);