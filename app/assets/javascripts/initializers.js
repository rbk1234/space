/**
 * Created by robert on 4/7/16.
 */

var GlobalInitializers = {};

function registerInitializer(key, callback) {
    console.log('Registering initializer for ' + key);
    if(key in GlobalInitializers) {
        console.log('  !! - Initializer already exists for ' + key);
    }

    GlobalInitializers[key] = callback;
}

function initOnDocumentLoad() {
    initOnLoad('body.' + $('body').attr('class'), $(document));
}

function initOnLoad(key, $panel, data) {
    if (key in GlobalInitializers) {
        console.log('Firing initializer for ' + key);
        GlobalInitializers[key].apply(this, [].slice.call(arguments).slice(1));
    }
    else {
        console.log('No initializer for ' + key);
    }
}
