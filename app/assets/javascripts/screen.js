/**
 * Created by robert on 4/16/16.
 */

(function ($) {
    var Screen = function() {

    };
    Screen.prototype = {
        background: [],
        collision: [],
        x: 0,
        y: 0
    };
    $.extend(Screen.prototype, Space.Mixins.Collidable);

    Space.namespace('Screens').Screen = Screen;


    // ---------------------------------------------------------------------------- Screen 1

    var Screen1 = function() {
        Screen.call(this);
    };
    Screen1.prototype = Object.create(Screen.prototype);
    Screen1.prototype.constructor = Screen1;

    $.extend(Screen1.prototype, {
        // overrides

        //background: [
        //    'X                                                             ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '                                                              ',
        //    '¯¯¯¯¯¯¯¯¯¯¯¯¯\\                                               ',
        //    '|¯|¯|¯|¯|¯|¯|¯|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
        //    '                                                              ',
        //    '                                                             X'
        //],
        background: [
            'X                                                 ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',

            'X                                                 ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',

            'X                                                 ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',

            'X                                                 ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',

            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '_______________                                   ',
            '|¯|¯|¯|¯|¯|¯|¯|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
            '                                                  ',
            '                                                 X'
        ],
        collision: [
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '                                                              ',
            '¯¯¯¯¯¯¯¯¯¯¯¯¯¯|                                               ',
            '|¯|¯|¯|¯|¯|¯|¯|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
            '                                                              ',
            '                                                             x'
        ]

        // 62 * 26
    });

    Space.namespace('Screens').Screen1 = Screen1;












    //var SelectorPanel = function (selector, $panel, config) {
    //    this._config = $.extend({}, config);
    //    this._selector = selector;
    //    this._$panel = $panel;
    //
    //    this._init();
    //};
    //SelectorPanel.prototype = {
    //    _config: null,
    //    _selector: null
    //};
    //
    //Ibis.namespace('Types').SelectorPanel = SelectorPanel;
    //
    ////new SelectorPanel(this, $panel, config);
    ////new Ibis.Types.SelectorPanel();
    //
    //var ClsEditorPanel = function (selector, $panel, config) {
    //    Ibis.Types.SelectorPanel.call(this, selector, $panel, config);
    //};
    //ClsEditorPanel.prototype = Object.create(Ibis.Types.SelectorPanel.prototype);
    //ClsEditorPanel.prototype.constructor = ClsEditorPanel;
    //
    //jQuery.extend(ClsEditorPanel.prototype, {
    //    setupContent: function () {
    //        Ibis.Types.SelectorPanel.prototype.setupContent.apply(this, arguments);
    //
    //        this._setupContextMenu();
    //        this._setupReload();
    //        this._setupEditing();
    //        this._setupColorPicker();
    //    }
    //});

}(jQuery));