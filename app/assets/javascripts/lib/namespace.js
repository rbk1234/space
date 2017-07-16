/**
 * Created by robert on 4/7/16.
 */

var Space = {
    namespace: function (ns) {
        var parts   = ns.split("."),
            object  = this,
            i, len;

        for(i=0, len=parts.length; i < len; i++) {
            if(!object[parts[i]]) {
                object[parts[i]] = {};
            }
            object = object[parts[i]];
        }

        return object;
    }
};