/**
 * Created by liusiwei on 15/12/1.
 */
var util = {
    paramFormat : function (url, param) {
        var ustr = '?';
        var index = 0;
        for( var key in param ) {
            if( index > 0 ) {
                ustr += "&"+key;
                ustr += "=" + param[key];
            }else{
                ustr += key;
                ustr += "=" + param[key];
            }
            index++;
        }
        url += ustr;
        return url;
    }
};

module.exports = util;