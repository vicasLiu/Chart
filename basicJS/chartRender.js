/**
 * LChart图表库
 *
 * @license LChart JS v1.0 (2013-10-24)
 * (c) 2013-2015 liusiwei
 * License: siwei.liu6@gmail.com
 *
 * @desc LChart基于SVG，纯Javascript图表库，提供直观，生动，可交互，可个性化定制的数据统计图表。
 * @author liusiwei (@liusiwei-刘思伟, siwei.liu6@gmail.com)
 */
if(!LChart){
    var LChart = {};
};
/**
 * basic animation function
 */
(function() {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 10 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
var INSTANCE;
LChart.International = function(){
    if( INSTANCE ){
        return INSTANCE;
    };
    INSTANCE = this;
    this._language = "zh-cn";
    this._dataSource = null;
    this._defaultNumberFormat = "###,###.00";
    this.standardDateFormat = "";
    this._fristData = -2208988800000; // 1900-1-1
};
LChart.International.prototype = {
    setLanguage : function(lang){
        this._language = lang;
        var numMapping = this.numberMapping();
        this._defaultNumberFormat = numMapping[lang];
        return this;
    },
    setDataSource : function(data){
        this._dataSource = data;
        return this;
    },
    numberMapping : function(){
        return {
            "en_us" : "###,###.00",
            "en_ca" : "###,###.00",
            "fr_ca" : "### ###,00",
            "fr_fr" : "### ###,00"
        };
    },
    format : function(dt,format){
        var o = {
            "M+" : dt.getMonth()+1, //month   
            "D+" : dt.getDate(),    //day   
            "h+" : dt.getHours(),   //hour   
            "m+" : dt.getMinutes(), //minute   
            "s+" : dt.getSeconds(), //second   
            "w" : dt.getDay(),
            "q+" : Math.floor((dt.getMonth()+3)/3),
            "S" : dt.getMilliseconds() //millisecond   
        }
        if(/(Y+)/.test(format)){
            format=format.replace(RegExp.$1, (dt.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(format)){
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        var m = dt.getMonth()+1;
        var d = dt.getDate();
        var y = dt.getFullYear();
        if(m < 10){
            m = "0" + m;
        }
        if(d < 10){
            d = "0" + d;
        }
        this.standardDateFormat = y + "-" + m + "-" + d;
        return format;
    },
    timeFormat : function(style){
        var len = this._dataSource.length;
        var ds = this._dataSource;
        var lang = this._language;
        var d = null;
        if(typeof(ds) == "string"){
            d = this.stringToDate(ds);
        }else{
            d = new Date(ds);
        }
        var date = "";
        if(style){
            date = this.format(d,style);
            return date;
        }else{
            var o = {
                "y" : d.getFullYear(),
                "M" : d.getMonth()+1, //month   
                "d" : d.getDate(),    //day   
                "h" : d.getHours(),   //hour   
                "m" : d.getMinutes(), //minute   
                "s" : d.getSeconds(), //second 
                "w" : d.getDay(),
                "S" : d.getMilliseconds() //millisecond   
            } ;
            if(o["m"] < 10){
                o["m"] = "0" + o["m"];
            }
            if(o["s"] < 10){
                o["s"] = "0" + o["s"];
            }
            var sdstr = "";
            var ldstr = "";
            var tstr = "";
            var gsLang = "enu";
            var gaLang = new Array();
            // enu 
            gaLang["enu"] = [];
            gaLang["enu"]["months"] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            gaLang["enu"]["shortMonths"] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            gaLang["enu"]["days"] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            gaLang["enu"]["shortDays"] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            gaLang["enu"]["AM"] = "AM";
            gaLang["enu"]["PM"] = "PM";

            gaLang["gmy"] = [];
            gaLang["gmy"]["months"] = ["Januar", "Februar", "März", "April", "Mai", "Juni", "July", "August", "September", "October", "November", "Dezember"];
            gaLang["gmy"]["shortMonths"] = ["Jan", "Feb", "Mär", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            gaLang["gmy"]["days"] = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Sonnabend"];
            gaLang["gmy"]["shortDays"] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            gaLang["gmy"]["AM"] = "AM";
            gaLang["gmy"]["PM"] = "PM";

            gaLang["chs"] = []
            gaLang["chs"]["months"] = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            gaLang["chs"]["shortMonths"] = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
            gaLang["chs"]["days"] = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            gaLang["chs"]["shortDays"] = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            gaLang["chs"]["AM"] = "上午";
            gaLang["chs"]["PM"] = "下午";

            gaLang["ita"] = [];
            gaLang["ita"]["months"] = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
            gaLang["ita"]["shortMonths"] = ["Jan", "Feb", "Mär", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            gaLang["ita"]["days"] = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
            gaLang["ita"]["shortDays"] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            gaLang["ita"]["AM"] = "AM";
            gaLang["ita"]["PM"] = "PM";

            gaLang["fra"] = [];
            gaLang["fra"]["months"] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            gaLang["fra"]["shortMonths"] = ["Jan", "Feb", "Mär", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            gaLang["fra"]["days"] = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
            gaLang["fra"]["shortDays"] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            gaLang["fra"]["AM"] = "AM";
            gaLang["fra"]["PM"] = "PM";

            gaLang["spa"] = [];
            gaLang["spa"]["months"] = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
            gaLang["spa"]["shortMonths"] = ["Jan", "Feb", "Mär", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            gaLang["spa"]["days"] = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
            gaLang["spa"]["shortDays"] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            gaLang["spa"]["AM"] = "AM";
            gaLang["spa"]["PM"] = "PM";

            switch(lang){
                case "en_us":
                case "en_ew":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr = o["M"] +  "/" + o["d"] + "/" + o["y"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    ldstr = this.getLongDate(o["w"],gaLang["enu"]["days"])+ " " + this.getLongDate(o["M"], gaLang["enu"]["months"]) + " " + o["d"] + "," + o["y"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "zh_cn":
                    sdstr =  o["y"] + "-" + o["M"] + "-" + o["d"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    ldstr = o["y"] + "年" + o["M"] + "月" + o["d"] + "日" +" " + this.getLongDate(o["w"],gaLang["chs"]["days"]);
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "fr_ca":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr =  o["d"] + "-"  + o["M"] + "-"  + o["y"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    //ldstr = o["y"] + "年" + o["M"] + "月" + o["d"] + "日" +" " + this.getLongDate(o["w"],gaLang["chs"]["days"]);
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "de_de":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr = o["d"] + "." + o["M"] + "." + o["y"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    ldstr = this.getLongDate(o["w"],gaLang["gmy"]["days"])+ ", " + o["d"] + ". " + this.getLongDate(o["M"], gaLang["gmy"]["months"]) + " " + o["y"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "en_gb":
                case "en_au":
                case "en_ca":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr = o["d"] + "/" + o["M"] + "/" + o["y"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    ldstr = o["d"] + " " + this.getLongDate(o["M"], gaLang["enu"]["months"]) + " " + o["y"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "it_it":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr = o["d"] + "/" + o["M"] + "/" + o["y"];
                    tstr = o["h"] + "." + o["m"] + "." + o["s"];
                    ldstr = this.getLongDate(o["w"],gaLang["ita"]["days"])+ " " + o["d"] + " " + this.getLongDate(o["M"], gaLang["ita"]["months"]) + " " + o["y"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "fr_fr":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr = o["d"] + "/" + o["M"] + "/" + o["y"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    ldstr = this.getLongDate(o["w"],gaLang["fra"]["days"])+ " " + o["d"] + " " + this.getLongDate(o["M"], gaLang["fra"]["months"]) + " " + o["y"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "es_es":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr = o["d"] + "/" + o["M"] + "/" + o["y"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    ldstr = this.getLongDate(o["w"],gaLang["spa"]["days"])+ ", " + o["d"] + " de " + this.getLongDate(o["M"], gaLang["spa"]["months"]) + " de " + o["y"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "af":
                case "eu":
                case "ja":
                case "tn":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr = o["y"] + "/" + o["M"] + "/" + o["d"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "sq":
                case "kn":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr = o["y"] + "-" + o["M"] + "-" + o["d"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "az":
                case "be":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr = o["d"] + "." + o["M"] + "." + o["y"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "bs":
                case "hr":
                case "cs":
                    sdstr = o["d"] + "." + o["M"] + "." + o["y"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "ca":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr = o["d"] + "/" + o["M"] + "/" + o["y"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
                case "da":
                    if(o["M"] < 10){
                        o["M"] = "0" + o["M"];
                    }
                    if(o["d"] < 10){
                        o["d"] = "0" + o["d"];
                    }
                    sdstr = o["d"] + "-" + o["M"] + "-" + o["y"];
                    tstr = o["h"] + ":" + o["m"] + ":" + o["s"];
                    this.standardDateFormat = o["y"] + "-" + o["M"] + "-" + o["d"];
                    break;
            }
            date =  sdstr + " " + tstr;
        }
        return sdstr;
    },
    getLongDate : function(index, data){
        return data[index];
    },
    getStandardDate : function(){
        return this.standardDateFormat;
    },
    numberFormat : function(number, form){
        if(typeof form == "undefined"){
            form = this._defaultNumberFormat;
        }
        var forms = form.split(".");
        var len = forms.length;
        var splitStr = ".";
        var esplitStr = ",";
        if(len > 1){
            if(forms[1].indexOf(',')!=-1){
                splitStr = ",";
                esplitStr = ".";
            }
        }else{
            forms = form.split(",");
            len = forms.length;
            if(len > 1){
                splitStr = ",";
                esplitStr = " ";
            }
        }
        forms = form.split(splitStr);
        var number = '' + number;
        var numbers = number.split('.');
        var nlen = numbers[0].length;
        var _f = forms[0].split(esplitStr);
        var _l = parseInt((nlen/3));
        if(nlen%3){
            _l = _l + 1;
        }
        forms[0] = "";
        for(var i = 0; i < _l; i++){
            if(i == _l-1){
                forms[0] = forms[0] + "###";
            }else{
                forms[0] = forms[0] + "###" +  esplitStr;
            }
        }
        var leftnumber = numbers[0].split('');
        var exec = function (lastMatch) {
            if (lastMatch == '0' || lastMatch == '#') {
                if (leftnumber.length) {
                    return leftnumber.pop();
                } else if (lastMatch == '0') {
                    return lastMatch;
                } else {
                    return '';
                }
            } else {
                return lastMatch;
            }
        };
        var string = "";

        string = forms[0].split('').reverse().join('').replace(/./g, exec).split('').reverse().join('');
        string = leftnumber.join('') + string;
        if(!forms[1]){
            forms[1] = "0";
            if (forms[1] && forms[1].length) {
                leftnumber = (numbers[1] && numbers[1].length) ? numbers[1].split('').reverse() : [];
                string += splitStr;
            }
        }else{
            forms[1] = forms[1] + "0"
            if (forms[1] && forms[1].length) {
                leftnumber = (numbers[1] && numbers[1].length) ? numbers[1].split('').reverse() : [];
                string += splitStr + forms[1].replace(/./g, exec);
            }
        }
        return string.replace(/.$/, '');
    },
    stringToDate:function(DateStr){
        var time = DateStr.match(/\s\d+:\d+:\d+$/,'');
        var date = DateStr.replace(/\s\d+:\d+:\d+$/,'');
        if(time == null){
            time =  DateStr.match(/\s\d+.\d+.\d+$/,'');
            date = DateStr.replace(/\s\d+.\d+.\d+$/,'');
        }
        var converted = Date.parse(DateStr);
        var myDate = new Date(converted);
        if (isNaN(myDate))
        {
            var delimCahar = date.indexOf('/')!=-1?'/':'-';
            var arys= date.split(delimCahar);

            if(time){
                var delimTime = time[0].indexOf(':')!=-1?':':'.';
                var tarys= time[0].split(delimTime);
                myDate = new Date(arys[0],--arys[1],arys[2],tarys[0],tarys[1],tarys[2]);
            }else{
                myDate = new Date(arys[0],--arys[1],arys[2]);
            }
        }
        return myDate;
    },
    dateStringToStandard : function(dateString){
        var lang = this._language;
        switch(lang){
            case "en_us":
            case "en_ew":
                return dateString;
                break;
            case "zh_cn":
            case "sq":
            case "kn":
                var array = dateString.split("-");
                sdstr = array[1] + "/" + array[2] + "/" + array[0];
                break;
            case "fr_ca":
                var array = dateString.split("-");
                sdstr = array[1] + "/" + array[0] + "/" + array[2];
                break;
            case "de_de":
            case "az":
            case "be":
                var array = dateString.split(".");
                sdstr = array[1] + "/" + array[0] + "/" + array[2];
                break;
            case "en_gb":
            case "en_au":
            case "it_it":
            case "fr_fr":
            case "es_es":
            case "en_ca":
            case "ca":
                var array = dateString.split("/");
                sdstr = array[1] + "/" + array[0] + "/" + array[2];
                break;
            case "af":
            case "eu":
            case "ja":
            case "tn":
                var array = dateString.split("/");
                sdstr = array[1] + "/" + array[2] + "/" + array[0];
                break;
            case "da":
                var array = dateString.split("-");
                sdstr = array[1] + "/" + array[0] + "/" + array[2];
                break;
        }
        return sdstr;
    },
    getYear : function(dateString){
        var lang = this._language;
        switch(lang){
            case "en_us":
            case "en_ew":
                var array = dateString.split("/");
                sdstr = array[2];
                break;
            case "zh_cn":
            case "sq":
            case "kn":
                var array = dateString.split("-");
                sdstr = array[0];
                break;
            case "fr_ca":
                var array = dateString.split("-");
                sdstr = array[2];
                break;
            case "de_de":
            case "az":
            case "be":
                var array = dateString.split(".");
                sdstr = array[2];
                break;
            case "en_gb":
            case "en_au":
            case "it_it":
            case "fr_fr":
            case "es_es":
            case "ca":
            case "en_ca":
                var array = dateString.split("/");
                sdstr = array[2];
                break;
            case "af":
            case "eu":
            case "ja":
            case "tn":
                var array = dateString.split("/");
                sdstr = array[0];
                break;
            case "da":
                var array = dateString.split("-");
                sdstr = array[2];
                break;
        }
        return sdstr;
    },
    getMonth : function(dateString){
        var lang = this._language;
        switch(lang){
            case "en_us":
            case "en_ew":
                var array = dateString.split("/");
                sdstr = array[0] + "/" + array[2];
                break;
            case "zh_cn":
            case "sq":
            case "kn":
                var array = dateString.split("-");
                sdstr = array[0] +  "-" + array[1] ;
                break;
            case "fr_ca":
                var array = dateString.split("-");
                sdstr = array[1] +  "-" + array[2] ;
                break;
            case "de_de":
            case "az":
            case "be":
                var array = dateString.split(".");
                sdstr = array[1] + "." + array[2];
                break;
            case "en_gb":
            case "en_au":
            case "it_it":
            case "fr_fr":
            case "es_es":
            case "en_ca":
            case "ca":
                var array = dateString.split("/");
                sdstr = array[1] + "/" + array[2];
                break;
            case "af":
            case "eu":
            case "ja":
            case "tn":
                var array = dateString.split("/");
                sdstr = array[0] + "/" + array[1];
                break;
            case "da":
                var array = dateString.split("-");
                sdstr = array[1] + "-" + array[2];
                break;
        }
        return sdstr;
    }
};
(function( window, undefined ){
    var DTD = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
        , XMLNS = 'http://www.w3.org/2000/svg'
        , PRODUCT = 'BI'
        , VERSION = '1.0'
        , DIV = 'div'
        , ABSOLUTE = 'absolute'
        , RELATIVE = 'relative'
        , HIDDEN = 'hidden'
        , VISIBLE = 'visible'
        , PX = 'px'
        , NONE = 'none'
        , TRANSPARENT = 'transparent'
        , globalAnimation
        , UNDEFINED
        , doc = document
        , win = window
        , math = Math
        , mathRound = math.round
        , mathFloor = math.floor
        , mathCeil = math.ceil
        , mathMax = math.max
        , mathMin = math.min
        , mathAbs = math.abs
        , mathCos = math.cos
        , mathSin = math.sin
        , mathPI = math.PI
        , MAX = Number.MAX_VALUE
        , MIN = -Number.MAX_VALUE
        , deg2rad = mathPI * 2 / 360
        , CHARTOBJ = {}
        , $ = window.$
        ;

    /*EVENT FUNCTION*/
    var Publisher = {
        subscribe: function(eventName, callback, inst) {
            var ev, suber, subscribeId, pointer = inst;
            subscribeId = pointer.getSubId();
            if (!subscribeId) {
                return
            }
            if (!Publisher.subers) {
                Publisher.subers = {}
            }
            if (!Publisher.subers[subscribeId]) {
                Publisher.subers[subscribeId] = {};
                Publisher.subers[subscribeId].callbacks = {}
            }
            suber = Publisher.subers[subscribeId];
            (suber.callbacks[eventName] || (suber.callbacks[eventName] = [])).push({
                'scope': inst,
                'fun': callback
            })
        },
        publish: function() {
            var eventName, args, pointer, list, i, suber, subscribeId, inst, temp, cid, aPointer;
            var argArr = Array.prototype.slice.call(arguments, 0);
            if (arguments.length > 1) {
                eventName = argArr.shift();
                args = argArr;
                inst = argArr.pop();
                pointer = inst
            } else {
                return
            }
            subscribeId = pointer.getSubId();
            suber = Publisher.subers && Publisher.subers[subscribeId];
            if (!suber || !suber.callbacks) {
                return
            }
            if (suber.callbacks[eventName]) {
                list = suber.callbacks[eventName];
                for(i = 0; i < list.length; i++){
                    list[i].fun.apply(list[i].scope, args);
                }
            }
        },
        unsubscribe: function() {
            var eventName, fun, subscribeId, pointer, i;
            if (arguments.length == 3) {
                eventName = arguments[0];
                fun = arguments[1];
                pointer = arguments[2]
            } else if (arguments.length == 2) {
                eventName = arguments[0];
                pointer = arguments[1]
            } else {
                return
            }
            subscribeId = pointer.getSubId();
            var suber = Publisher.subers && Publisher.subers[subscribeId];
            if (!suber || !suber.callbacks) {
                return
            }
            var callbacks = suber && suber.callbacks;
            for (name in callbacks) {
                if (name === eventName) {
                    for (i = 0; i < callbacks[eventName].length; i++) {
                        if (pointer.componentId === callbacks[eventName][i].scope.componentId) {
                            callbacks[eventName].splice(i, 1);
                            i--
                        }
                    }
                }
            }
            return this;
        }
    };
    /*END*/
    var getChartObj = function( pointer ) {
        return CHARTOBJ[pointer];
    };
    var getPosition = function( container_, e_ ) {
        var offset = {
            left: 0,
            top: 0
        };
        try {
            if (container_) {
                offset = $(container_).offset();
            }
        }
        catch (e_) {
        }
        return {
            x: e_.pageX - offset.left,
            y: e_.pageY - offset.top
        };
        return p;
    };
    /******************BROWSER Event Mode**********************/
    var touchable = "ontouchstart" in window;
    var clickEvent = touchable ? "touchstart" : "click",
        mouseDownEvent = touchable ? "touchstart" : "mousedown",
        mouseUpEvent = touchable ? "touchend" : "mouseup",
        mouseMoveEvent = touchable ? "touchmove" : "mousemove",
        mouseMoveOutEvent = touchable ? "touchleave" : "mouseout";

    var _returnData = function(evt){
        var neweEvt = {};
        var cev = evt.originalEvent;
        if( cev == undefined ) {
            cev = evt;
        }
        if(cev.changedTouches){
            neweEvt.pageX = cev.changedTouches[0].pageX;
            neweEvt.pageY = cev.changedTouches[0].pageY;
            neweEvt.clientX = cev.changedTouches[0].clientX;
            neweEvt.clientY = cev.changedTouches[0].clientY;
        }else{
            neweEvt.pageX = evt.pageX;
            neweEvt.pageY = evt.pageY;
            neweEvt.clientX = evt.clientX;
            neweEvt.clientY = evt.clientY;
        }
        neweEvt.evt = evt;
        return neweEvt;
    };
    var getTouchPos = function(e){
        return { x : e.clientX , y: e.clientY };
    }
    //计算两点之间距离
    var getDist = function(p1 , p2){
        if(!p1 || !p2) return 0;
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    };
    //获取swipe的方向
    var getSwipeDirection = function(p2,p1){
        var dx = p2.x - p1.x;
        var dy = -p2.y + p1.y;
        var angle = Math.atan2(dy , dx) * 180 / Math.PI;

        if(angle < 45 && angle > -45) return "right";
        if(angle >= 45 && angle < 135) return "top";
        if(angle >= 135 || angle < -135) return "left";
        if(angle >= -135 && angle <= -45) return "bottom";
    };
    var getAngle = function(p2,p1){
        var dx = p2.x - p1.x;
        var dy = -p2.y + p1.y;
        var angle = Math.atan2(dy , dx) * 180 / Math.PI;
        return angle;
    };
    var _onClick = function(dom, evt, callback){
        startTime = Date.parse(new Date());
        var neweEvt = _returnData(evt);
        callback(dom, neweEvt);
    };
    var _onClickDown = function(dom, evt, callback){
        var neweEvt = _returnData(evt);
        callback(dom, neweEvt);
    };
    var _onClickUp = function(dom, evt, callback){
        var neweEvt = _returnData(evt);
        callback(dom, neweEvt);
    };
    var _onMove = function(dom, evt, callback){
        var neweEvt = _returnData(evt);
        callback(dom, neweEvt);
    };
    var _onOut = function(evt, callback){
        var neweEvt = _returnData(evt);
        callback(dom, neweEvt);
    };
    var Events = {
        bindEvent : function(rootEle, element, type, eventHandle){
            switch(type){
                case "mousemove" :
                case "touchmove" :
                    rootEle.off(mouseMoveEvent, element).on(mouseMoveEvent, element, function(e){
                        _onMove($(this), e, eventHandle);
                    });
                    break;
                case "click" :
                case "tap" :
                    //按下松开之间的移动距离小于20，认为发生了tap
                    var TAP_DISTANCE = 20;
                    var pt_pos;
                    var ct_pos;
                    var startEvtHandler = function(e){
                        var ev = _returnData(e);
                        ct_pos = getTouchPos(ev);
                    };
                    var endEvtHandler = function(dom_,e, fn){
                        // e.stopPropagation();
                        var ev = _returnData(e);
                        var now = Date.now();
                        var pt_pos = getTouchPos(ev);
                        var dist = getDist(ct_pos , pt_pos);
                        if(dist < TAP_DISTANCE){
                            _onClick(dom_, e, eventHandle);
                        }
                    };
                    rootEle.off(mouseDownEvent, element).on(mouseDownEvent, element, function(e){
                        startEvtHandler(e);
                    });
                    rootEle.off(mouseUpEvent, element).on(mouseUpEvent, element, function(e){
                        //_onClick($(this), e, eventHandle);
                        var $this = $(this);
                        endEvtHandler($this,e,eventHandle);
                    });
                    break;
                case "mousedown" :
                case "touchstart" :
                    rootEle.off(mouseDownEvent, element).on(mouseDownEvent, element, function(e){
                        _onClickDown($(this), e, eventHandle);
                    });
                    break;
                case "mouseup" :
                case "touchend" :
                    rootEle.off(mouseUpEvent, element).on(mouseUpEvent, element, function(e){
                        _onClickUp($(this), e, eventHandle);
                    });
                    break;
                case "mouseout" :
                    rootEle.off(mouseMoveOutEvent, element).on(mouseMoveOutEvent, element, function(e){
                        endEvtHandler(e, eventHandle);
                    });
                    break;
                case "swipe":
                    var arg = eventHandle();
                    var startEvent = arg["sCallback"],
                        moveEvent = arg["mCallback"],
                        endEvent = arg["eCallback"];
                    //按下之后移动30px之后就认为swipe开始
                    var SWIPE_DISTANCE = 30;
                    //swipe最大经历时间
                    var SWIPE_TIME = 500;
                    var pt_pos;
                    var ct_pos;
                    var pt_time;
                    var pt_up_time;
                    var pt_up_pos;
                    var pt_move_pos;
                    var startEvtHandler = function(dom_, e){
                        e.stopPropagation();
                        var ev = _returnData(e);
                        pt_pos = ct_pos = getTouchPos(ev);
                        pt_move_pos = pt_pos;
                        pt_time = Date.now();
                        startEvent(dom_, ev);
                    }
                    var moveEvtHandler = function(dom_, e){
                        e.stopPropagation();
                        e.preventDefault();
                        var ev = _returnData(e);
                        ct_pos = getTouchPos(ev);
                        if(pt_pos == undefined) {
                            return;
                        }
                        var dir = getSwipeDirection(ct_pos,pt_pos);
                        var dist = getDist(pt_pos,ct_pos);
                        var angle = getAngle(ct_pos,pt_move_pos);
                        ev.dir = dir;
                        ev.angle = angle;
                        ev.dist = getDist(pt_pos,pt_up_pos);
                        moveEvent(dom_, ev);
                        pt_move_pos = ct_pos;
                    }
                    var endEvtHandler = function(dom_, e){
                        e.stopPropagation();
                        var dir;
                        var ev = _returnData(e);
                        pt_up_pos = ct_pos;
                        pt_up_time = Date.now();
                        if(getDist(pt_pos,pt_up_pos) > SWIPE_DISTANCE){
                            //pt_up_time - pt_time
                            dir = getSwipeDirection(pt_up_pos,pt_pos);
                            ev.dir = dir;
                            ev.dist = getDist(pt_pos,pt_up_pos);
                            ev.tm = pt_up_time - pt_time;
                            endEvent(dom_, ev);
                        }
                        pt_pos = undefined;
                    }
                    rootEle.off(mouseDownEvent, element).on(mouseDownEvent, element, function(e){
                        var $this = $(this);
                        startEvtHandler($this, e);
                    });
                    rootEle.off(mouseMoveEvent, element).on(mouseMoveEvent, element, function(e){
                        var $this = $(this);
                        moveEvtHandler($this, e);
                    });
                    rootEle.off(mouseUpEvent, element).on(mouseUpEvent, element, function(e){
                        var $this = $(this);
                        endEvtHandler($this, e);
                    });
                    break;
                case "hold" :
                    //按下松开之间的移动距离小于20，认为点击生效
                    var HOLD_DISTANCE = 20;
                    //按下两秒后hold触发
                    var HOLD_TIME = 2000;
                    var holdTimeId;
                    var pt_pos;
                    var ct_pos;
                    var startEvtHandler = function(dom_,e,fn){
                        e.stopPropagation();
                        var ev = _returnData(e);
                        var touches = e.touches;
                        if(!touches || touches.length == 1){//鼠标点击或者单指点击
                            pt_pos = ct_pos = getTouchPos(ev);
                            pt_time = Date.now();
                            holdTimeId = setTimeout(function(){
                                if(touches && touches.length != 1) return;
                                if(getDist(pt_pos,ct_pos) < HOLD_DISTANCE){
                                    fn(dom_, ev);
                                }
                            },HOLD_TIME);
                        }
                    }
                    var endEvtHandler = function(e){
                        e.stopPropagation();
                        clearTimeout(holdTimeId);
                    }
                    rootEle.off(mouseDownEvent, element).on(mouseDownEvent, element, function(e){
                        var $this = $(this);
                        startEvtHandler($this,e,eventHandle);
                    });
                    rootEle.off(mouseUpEvent, element).on(mouseUpEvent, element, function(e){
                        endEvtHandler(e);
                    });
                    break;
            };
        }
    };
    /*END*/
    var tools = {
        distance : function(a, b) {
            var dx = a.x - b.x;
            var dy = a.y - b.y;
            return Math.sqrt(dx * dx + dy * dy);
        },
        outrect : function(target, container, partly) {
            if (target && container) {
                if (partly) {
                    if (target.x < container.x || target.x + target.width > container.x + container.width || target.y < container.y || target.y + target.height > container.y + container.height) {
                        return true;
                    }
                } else {
                    if (target.x + target.width < container.x || target.x > container.x + container.width || target.y + target.height < container.y || target.y > container.y + container.height) {
                        return true;
                    }
                }
            }
            return false;
        },
        array : function(data) {
            if (data && !(data instanceof Array)) {
                data = [data];
            }
            return data;
        },
        tohas : function(data) {
            var result = {};
            if (data) {
                if (typeof (data) === S.OBJECT) {
                    if (data instanceof Array) {
                        for ( var i = 0, l = data.length; i < l; i++) {
                            var n = data[i];
                            if (n) {
                                result[n] = true;
                            }
                        }
                    } else {
                        for ( var k in data) {
                            result[k] = true;
                        }
                    }
                } else {
                    result[data] = true;
                }
            }
            return result;
        },
        //if is number
        isnum : function(num) {
            if (typeof (num) !== S.NUMBER) {
                return false;
            }
            if (isNaN(num)) {
                return false;
            }
            return true;
        },
        // format to number
        // if int then try to parse to int
        tonum : function(num, ints) {
            if (typeof (num) !== "number") {
                if (ints) {
                    num = parseInt(num);
                } else {
                    num = parseFloat(num);
                }
            }
            if (isNaN(num)) {
                num = 0;
            } else {
                num = this.clamp(num, -Number.MAX_VALUE, Number.MAX_VALUE);
            }
            return num;
        },
        numfix : function(num, fix) {
            var n = this.tonum;
            return n(n(num).toFixed(n(fix, true)));
        },
        log10 : function(x) {
            //Math.log(x) / Math.log(10)
            return Math.log(x) / Math.LN10;
        },
        clamp : function(num, min, max) {
            return Math.max(Math.min(num, max), min);
        },
        per : function(num) {
            num = this.tonum(num);
            num = this.clamp(num, 0, 1);
            return num;
        },
        //if have same attributes with a target
        same : function(o, t) {
            if (o === t || o == t) {
                return true;
            }
            if (!o || !t || (o instanceof Element) || (t instanceof Element) || (o instanceof jQuery) || (t instanceof jQuery) || this.hasfun(o) || this.hasfun(t)) {
                return false;
            }
            for ( var k in o) {
                var ok = o[k];
                var tk = t[k];
                if (typeof (ok) === S.OBJECT && typeof (tk) === S.OBJECT) {
                    if (!this.same(ok, tk)) {
                        return false;
                    }
                } else if (ok != tk) {
                    return false;
                }
            }
            return true;
        },
        hasfun : function(obj) {
            if (typeof (obj) === S.OBJECT) {
                for ( var k in obj) {
                    if (typeof (obj[k]) === S.FUNCTION) {
                        return true;
                    }
                }
            }
            return false;
        },
        //copy a object
        copy : function() {
            var c = {};
            var l = arguments.length;
            if (!l) {
                return c;
            }
            var deep = true;
            if (arguments[l - 1] === false) {
                deep = false;
            }
            for ( var i = 0; i < l; i++) {
                var o = arguments[i];
                if (!o || typeof (o) !== S.OBJECT) {
                    continue;
                }
                //copy
                for ( var n in o) {
                    var v = o[n];
                    if (v === c[n]) {
                        continue;
                    }
                    if (v === null) {
                        //delete
                        delete c[n];
                    } else if (deep && typeof (v) === S.OBJECT) {
                        //deep copy
                        if (v instanceof Array) {
                            c[n] = [].concat(v);
                        } else {
                            c[n] = this.copy(c[n], v);
                        }
                    } else {
                        c[n] = v;
                    }
                }
            }
            return c;
        },
        /*
         * fit with scalemode
         */
        //0: no scale
        //1: scale with keep width/height (default)
        //2: scale without keep width/height
        //3: scale with keep width/height and cut outside
        fit : function(pw, ph, tw, th, scalemode) {
            scalemode = parseInt(scalemode);
            var rect = {
                x : 0,
                y : 0,
                width : tw,
                height : th,
                sx : 1,
                sy : 1,
                pw : pw,
                ph : ph
            };
            if (scalemode < 0 || scalemode > 3) {
                return rect;
            }
            //no sacle=========================
            //0: no scale
            if (scalemode == 0) {
                return rect;
            }
            //scale============================
            //2: scale without keep width/height
            rect.sx = pw / tw;
            rect.sy = ph / th;
            if (scalemode == 1) {
                //1: scale with keep width/height
                if (rect.sx > rect.sy) {
                    rect.sx = rect.sy;
                } else if (rect.sx < rect.sy) {
                    rect.sy = rect.sx;
                }
                rect.x = (pw - tw * rect.sx) * 0.5;
                rect.y = (ph - th * rect.sy) * 0.5;
            } else if (scalemode == 3) {
                //3: scale with keep width/height and cut outside
                if (rect.sx > rect.sy) {
                    rect.sy = rect.sx;
                } else if (rect.sx < rect.sy) {
                    rect.sx = rect.sy;
                }
                rect.x = (pw - tw * rect.sx) * 0.5;
                rect.y = (ph - th * rect.sy) * 0.5;
            }
            return rect;
        },
        /*
         * return a nice number list for coordinate axis
         */
        // http://gurge.com/blog/2008/04/02/google-chart-tips-for-ruby-hackers/
        // http://wiki.tcl.tk/9503
        // http://mustafashaik.wordpress.com/2010/11/20/nice-numbers-for-graph-labels/
        nicenum : function(min, max, num) {
            function nice(x, round) {
                var expv = Math.floor(Math.log(x) / Math.log(10));
                var f = x / Math.pow(10, expv);
                var nf;
                if (round) {
                    if (f < 1.5) {
                        nf = 1;
                    } else if (f < 3) {
                        nf = 2;
                    } else if (f < 7) {
                        nf = 5;
                    } else {
                        nf = 10;
                    }
                } else {
                    if (f <= 1) {
                        nf = 1;
                    } else if (f <= 2) {
                        nf = 2;
                    } else if (f <= 5) {
                        nf = 5;
                    } else {
                        nf = 10;
                    }
                }
                return nf * Math.pow(10, expv);
            }
            // default is 4
            num = num || 4;
            if (min == max) {
                max = min + 1;
            } else if (min > max) {
                var n = min;
                min = max;
                max = n;
            }
            var r = nice(max - min, false);
            var d = nice(r / (num - 1), true);
            var s = this.mul(Math.floor(min / d), d);
            var e = this.mul(Math.ceil(max / d), d);
            var arr = [];
            var v = s;
            while (v <= e) {
                arr.push(v);
                v = this.add(v, d);
            }
            //$.d(s + ", " + d + ", " + e + "\n" + arr);
            return arr;
        },
        /*
         * float number fixing, Floating-Point Arithmetic
         * http://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
         */
        // return float part length
        flen : function(n) {
            var a = String(n).split(".");
            if (a.length > 1) {
                return a[1].length;
            }
            return 0;
        },
        // return float as int
        fint : function(n) {
            return parseInt(Number(String(n).replace(".", "")));
        },
        // +
        add : function(n1, n2) {
            var r1 = this.flen(n1);
            var r2 = this.flen(n2);
            if (r1 + r2 == 0) {
                return n1 + n2;
            } else {
                var m = Math.pow(10, Math.max(r1, r2));
                return (Math.round(n1 * m) + Math.round(n2 * m)) / m;
            }
        },
        // -
        sub : function(n1, n2) {
            return this.add(n1, -n2);
            /*
             var r1 = NS.Tools.flen(n1);
             var r2 = NS.Tools.flen(n2);
             if (r1 + r2 == 0) {
             return n1 - n2;
             } else {
             var m = Math.pow(10, Math.max(r1, r2));
             var n = (r1 >= r2) ? r1 : r2;
             return ((n1 * m - n2 * m) / m).toFixed(n);
             }
             */
        },
        // *
        mul : function(n1, n2) {
            var m=0,s1=n1.toString(),s2=n2.toString();
            try{
                m+=s1.split(".")[1].length;
            }catch(e){

            }
            try{
                m+=s2.split(".")[1].length;
            }catch(e){

            }
            return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
            /*var r1 = this.flen(n1);
             var r2 = this.flen(n2);
             if (r1 + r2 == 0) {
             return n1 * n2;
             } else {
             var m1 = this.fint(n1);
             var m2 = this.fint(n2);
             return (m1 * m2) / Math.pow(10, r1 + r2);
             }*/
        },
        // /
        div : function(n1, n2) {
            var r1 = this.flen(n1);
            var r2 = this.flen(n2);
            if (r1 + r2 == 0) {
                return n1 / n2;
            } else {
                var m1 = this.fint(n1);
                var m2 = this.fint(n2);
                return (m1 / m2) * Math.pow(10, r2 - r1);
            }
        },
        //zero fixed
        zero : function(s, l) {
            s += "";
            if (s.length < l) {
                var n = l - s.length;
                s = Math.pow(10, n).toString().substr(1) + s;
            }
            return s;
        },
        equalWith : function(num1, num2){
            return Math.abs(num1 - num2) < 0.00001;
        },
        isNull: function(obj){
            return obj == null || typeof(obj) == "undefined";
        },
        copyArray: function(arr){
            var tempArr=[];
            for(var i=0; i<arr.length; i++){
                tempArr.push(arr[i]);
            }
            return tempArr;
        },
        dateToString : function(date){
            if(typeof date == 'String'){
                date = Date.parse(date);
            }
            var dt = new Date(date);
            var m = (dt.getMonth() + 1),
                d = dt.getDate();
            if(m < 10){
                m = '0' + m;
            }
            if(d < 10){
                d = '0' + d;
            }
            var dtStr = m + '/' + d + '/' + dt.getFullYear().toString();
            return dtStr;
        },
        stringToDate : function(DateStr){
            var me = this;
            var time = DateStr.match(/\s\d+:\d+:\d+$/,'');
            var date = DateStr.replace(/\s\d+:\d+:\d+$/,'');
            if(time == null){
                time =  DateStr.match(/\s\d+.\d+.\d+$/,'');
                date = DateStr.replace(/\s\d+.\d+.\d+$/,'');
            }
            var delimCahar = date.indexOf('/')!=-1?'/':'-';
            var arys= date.split(delimCahar);
            if(time){
                var delimTime = time[0].indexOf(':')!=-1?':':'.';
                var tarys= time[0].split(delimTime);
                myDate = new Date(arys[0],--arys[1],arys[2],tarys[0],tarys[1],tarys[2]);
            }else{
                if(delimCahar == '/'){
                    myDate = new Date(arys[2],--arys[0],arys[1]);
                }else{
                    myDate = new Date(arys[0],--arys[1],arys[2]);
                }

            }
            var tempDate = Date.parse(myDate);
            return tempDate;
        },
        stringToString : function(str){
            var delimCahar = str.indexOf('/')!=-1?'/':'-';
            if(delimCahar == '-'){
                return str;
            }
            var strarry = str.split('/');
            var s = '';
            s =  strarry[2] + '-' + strarry[0] + '-' + strarry[1];
            return s;
        },
        formatDate : function(num){
            if(num < 86400000){
                return num;
            }
            num = Math.round(num);
            var t = num / 86400000;
            t = Math.round(t);
            num = t * 86400000;
            return num;
        },
        inPolygon : function(pts, n, point){
            var _multiplyCross = function(pt1, pt2, pt0){
                return ((pt1.x - pt0.x) * (pt2.y - pt0.y) - (pt2.x - pt0.x) * (pt1.y - pt0.y));
            };
            var _isOnLine = function(pt, line){
                return ((Math.abs(_multiplyCross(line.pt1, line.pt2, pt)) < 0.00001) &&
                    ((pt.x - line.pt1.x) * (pt.x - line.pt2.x) <= 0) &&
                    ((pt.y - line.pt1.y) * (pt.y - line.pt2.y) <= 0));
            };
            var _intersect = function(line1, line2){
                return ((Math.max(line1.pt1.x, line1.pt2.x) >= Math.min(line2.pt1.x, line2.pt2.x)) &&
                    (Math.max(line2.pt1.x, line2.pt2.x) >= Math.min(line1.pt1.x, line1.pt2.x)) &&
                    (Math.max(line1.pt1.y, line1.pt2.y) >= Math.min(line2.pt1.y, line2.pt2.y)) &&
                    (Math.max(line2.pt1.y, line2.pt2.y) >= Math.min(line1.pt1.y, line1.pt2.y)) &&
                    (_multiplyCross(line2.pt1, line1.pt2, line1.pt1) * _multiplyCross(line1.pt2, line2.pt2, line1.pt1) >= 0) &&
                    (_multiplyCross(line1.pt1, line2.pt2, line2.pt1) * _multiplyCross(line2.pt2, line1.pt2, line2.pt1) >= 0));
            };

            if (n == 1) {
                return ((Math.abs(pts[0].x - point.x) < 0.00001) && (fabs(pts[0].y - point.y) < 0.00001));
            }
            else {
                if (n == 2) {
                    var side = {
                        pt1: pts[0],
                        pt2: pts[1]
                    };
                    return _isOnLine(point, side);
                }
            }

            var count = 0;
            var line = {
                pt1: point,
                pt2: {
                    x: -10000000000,
                    y: point.y
                }
            };

            for (var i = 0; i < n; i++) {
                var side = {
                    pt1: pts[i],
                    pt2: pts[(i + 1) % n]
                };

                if (_isOnLine(point, side)) {
                    return true;
                }

                if (Math.abs(side.pt1.y - side.pt2.y) < 0.00001) {
                    continue;
                }

                if (_isOnLine(side.pt1, line)) {
                    if (side.pt1.y > side.pt2.y) {
                        count++;
                    }
                }
                else{
                    if (_isOnLine(side.pt2, line)) {
                        if (side.pt2.y > side.pt1.y) {
                            count++;
                        }
                    }
                    else{
                        if (_intersect(line, side)) {
                            count++;
                        }
                    }
                }
            }
            return (count % 2 == 1);
        },
        random : function() {
            var jschars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var res = "";
            for(var i = 0; i < 10 ; i ++) {
                var id = Math.ceil(Math.random()*35);
                res += jschars[id];
            }
            return res;
        },
        textEllipsis : function( text, textWidth, width ) {
            var textLen = text.length;
            var eachTextWidth = textWidth / textLen;
            var maxNum = Math.floor(width / eachTextWidth) - 2;
            if( maxNum >= textLen || text == "" || text == " ") {
                return text;
            }
            var str = text.substring(0, maxNum) + "...";
            return str;
        }
    };
    var CLONE = {
        cloneArray : function(original){
            var me = this;
            var newArray = new Array();
            for (var i = 0; i < original.length; i++){
                if(typeof(original[i]) == "object"){
                    if (original[i].length != undefined){
                        newArray[i] = me.cloneArray(original[i]);
                    }
                    else{
                        newArray[i] = me.cloneObject(original[i]);
                    }
                }
                else{
                    newArray[i] = original[i];
                }
            }
            return newArray;
        },
        cloneObject : function(original){
            var me = this;
            var newObj = new Object();
            for(var ele in original){
                if(typeof(original[ele]) == "object") {
                    if ( original[ele] != null && original[ele].length != undefined){
                        newObj[ele] = me.cloneArray(original[ele]);
                    }
                    else{
                        newObj[ele] = me.cloneObject(original[ele]);
                    }
                }
                else{
                    newObj[ele] = original[ele];
                }
            }
            return newObj;
        },
        clone : function(original){
            var me = this;
            if(typeof(original) == "object"){
                if (original.length != undefined){
                    return me.cloneArray(original);
                }
                return me.cloneObject(original);
            }
            return original;
        }
    };
    var Tween = {
        Linear: function(t,b,c,d){ return c*t/d + b; },
        Quad: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            }
        },
        Quart: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            }
        },
        Quint: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            }
        },
        Sine: {
            easeIn: function(t,b,c,d){
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOut: function(t,b,c,d){
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOut: function(t,b,c,d){
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function(t,b,c,d){
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOut: function(t,b,c,d){
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function(t,b,c,d){
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },
            easeOut: function(t,b,c,d){
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            }
        },
        Elastic: {
            easeIn: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            easeOut: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
            },
            easeInOut: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
            }
        },
        Back: {
            easeIn: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            easeOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            easeInOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            }
        },
        Bounce: {
            easeIn: function(t,b,c,d){
                return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
            },
            easeOut: function(t,b,c,d){
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            easeInOut: function(t,b,c,d){
                if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
                else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        }
    };
    /*
     * @brief: 定义队列类
     * @remark:实现队列基本功能
     */
    var Queue = function() {
        var self = this;
        var arr = new Array();
        var status = "stop";
        self.queue = function( arg ) {
            arr.push(arg);
            if(arr.length == 1 && status == "stop"){
                this.excute( arr.pop() );
            }
        };
        self.dequeue = function() {
            if(arr.length == 0){
                status = "stop";
                return;
            };
            var a = arr.shift();
            status = "stop";
            self.excute(a);
        };
        self.excute = function( arg ) {
            status = "running";

        };
    };
    /*COLOR*/
    var JColor = {};
    JColor.make = function(r, g, b, a) {
        var o = {};
        o.r = r || 0;
        o.g = g || 0;
        o.b = b || 0;
        o.a = a != null ? a : 1;

        o.add = function(c, d) {
            for (var i = 0; i < c.length; ++i)
                o[c.charAt(i)] += d;
            return o.normalize();
        };

        o.scale = function(c, f) {
            for (var i = 0; i < c.length; ++i)
                o[c.charAt(i)] *= f;
            return o.normalize();
        };

        o.toString = function() {
            if (o.a >= 1.0) {
                return "rgb(" + [o.r, o.g, o.b].join(",") + ")";
            } else {
                return "rgba(" + [o.r, o.g, o.b, o.a].join(",") + ")";
            }
        };

        o.normalize = function() {
            function clamp(min, value, max) {
                return value < min ? min : (value > max ? max : value);
            }

            o.r = clamp(0, parseInt(o.r), 255);
            o.g = clamp(0, parseInt(o.g), 255);
            o.b = clamp(0, parseInt(o.b), 255);
            o.a = clamp(0, o.a, 1);
            return o;
        };

        o.clone = function() {
            return JColor.make(o.r, o.b, o.g, o.a);
        };

        return o.normalize();
    };
    JColor.getLinearColor = function(iValue, iStartValue, iEndValue, stratrColor, endColor){
        var getLinearColor = function(iValue, iStartValue, iEndValue,
                                      iStartColor, iEndColor){

            var iNumber = parseInt(iStartColor + (iValue - iStartValue) /
                (iEndValue - iStartValue) * (iEndColor - iStartColor));

            if(iNumber > 255){
                iNumber = 255;
            }
            else if (iNumber < 0){
                iNumber = 0;
            }

            return iNumber;
        }

        var oStartColor = null;
        var oEndColor = null;
        if (typeof stratrColor == "string"){
            oStartColor = JColor.color.parse(stratrColor);
        }
        else{
            oStartColor = stratrColor;
        }
        if (typeof endColor == "string"){
            oEndColor = JColor.color.parse(endColor);
        }
        else{
            oEndColor = endColor;
        }

        var red = getLinearColor(iValue, iStartValue, iEndValue, oStartColor.r, oEndColor.r);
        var green = getLinearColor(iValue, iStartValue, iEndValue, oStartColor.g, oEndColor.g);
        var blue = getLinearColor(iValue, iStartValue, iEndValue, oStartColor.b, oEndColor.b);

        return JColor.make(red, green, blue);
    };
    JColor.getMidColor = function(stratrColor, endColor){
        return JColor.getLinearColor(128,0, 256, stratrColor, endColor);
    }
    JColor.extract = function(elem, css) {
        var c;
        do {
            c = elem.css(css).toLowerCase();
            // keep going until we find an element that has color, or
            // we hit the body
            if (c != '' && c != 'transparent')
                break;
            elem = elem.parent();
        } while (!$.nodeName(elem.get(0), "body"));

        // catch Safari's way of signalling transparent
        if (c == "rgba(0, 0, 0, 0)")
            c = "transparent";

        return JColor.parse(c);
    };
    JColor.parse = function(str) {
        var res, m = JColor.make;
        if (res = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(str))
            return m(parseInt(res[1], 10), parseInt(res[2], 10), parseInt(res[3], 10));

        // Look for rgba(num,num,num,num)
        if (res = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))
            return m(parseInt(res[1], 10), parseInt(res[2], 10), parseInt(res[3], 10), parseFloat(res[4]));

        // Look for rgb(num%,num%,num%)
        if (res = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(str))
            return m(parseFloat(res[1]) * 2.55, parseFloat(res[2]) * 2.55, parseFloat(res[3]) * 2.55);

        // Look for rgba(num%,num%,num%,num)
        if (res = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))
            return m(parseFloat(res[1]) * 2.55, parseFloat(res[2]) * 2.55, parseFloat(res[3]) * 2.55, parseFloat(res[4]));

        // Look for #FFa0b1c2
        if (res = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str))
            return m(parseInt(res[2], 16), parseInt(res[3], 16), parseInt(res[4], 16), parseInt(res[1], 16) / 255);

        // Look for #a0b1c2
        if (res = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str))
            return m(parseInt(res[1], 16), parseInt(res[2], 16), parseInt(res[3], 16));

        // Look for #fff
        if (res = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(str))
            return m(parseInt(res[1] + res[1], 16), parseInt(res[2] + res[2], 16), parseInt(res[3] + res[3], 16));

        var name = JColor.trim(str).toLowerCase();
        if(name == "" || name == null || name == "undefined"){return null;}
        if (name == "transparent"){
            return m(255, 255, 255, 0);
        }
        if(parseInt(name)){
            var name = parseInt(name);
            var index = name > 20 ? (name%20) : name;
            if(index == 0) {index = 20;};
            str = lookupColors[index];
            if(res = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str)){
                return m(parseInt(res[1], 16), parseInt(res[2], 16), parseInt(res[3], 16));
            }
        }else{
            res = lookupColors2[name];
            return m(res[0], res[1], res[2]);
        }
    };
    var lookupColors = {
        1 : "#0A1E60",
        2 : "#A6BC09",
        3 : "#FEA620",
        4 : "#FF1300",
        5 : "#738FB6",
        6 : "#006065",
        7 : "#47A888",
        8 : "#FFD100",
        9 : "#D13973",
        10 : "#73A87F",
        11 : "#4A4A7B",
        12 : "#3E841C",
        13 : "#F0F065",
        14 : "#770000",
        15 : "#81ABBA",
        16 : "#949FB7",
        17 : "#CFD47F",
        18 : "#F4B287",
        19 : "#CD7F99",
        20 : "#7FAFB2"
    };
    var lookupColors2 = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    };
    /*******/
    var isInObjectArray = function( str, array, filed ) {
        for (var i = array.length - 1; i >= 0; i--) {
            if( array[i][filed] == str ) {
                return i;
                break;
            }
        };
        return -1;
    };
    /*MAPPING*/
    var Mapping = function(mode) {
        this.mode = mode == 1 ? 1 : 0;
    };
    Mapping.prototype = {
        mode : 0,
        //start coord
        sCoord : 0,
        //end coord
        eCoord : 0,
        //start value
        sValue : 0,
        //end value
        eValue : 0,
        // cache
        perCoord : 0,
        perValue : 0,
        fixValue : 0,
        setRange : function(sCoord, eCoord, sValue, eValue) {
            this.sCoord = tools.tonum(sCoord);
            this.eCoord = tools.tonum(eCoord);
            this.sValue = tools.tonum(sValue);
            this.eValue = tools.tonum(eValue);
            //$.d(sCoord, eCoord, sValue, eValue);
            // cache
            if (this.eCoord != this.sCoord) {
                this.perCoord = 1 / (this.eCoord - this.sCoord) * (this.eValue - this.sValue);
            } else {
                this.perCoord = 0;
            }
            if (this.eValue == this.sValue) {
                this.perValue = 0;
            } else {
                this.perValue = 1 / (this.eValue - this.sValue) * (this.eCoord - this.sCoord);
            }
            //
            if (this.mode == 1) {
                this.fixValue = 0;
                if (this.sValue < 1) {
                    this.fixValue = 1 - this.sValue;
                }
            }
        },
        getRange : function() {
            return {
                sCoord : this.sCoord,
                eCoord : this.eCoord,
                sValue : this.sValue,
                eValue : this.eValue
            };
        },
        getValue : function(num) {
            num = tools.tonum(num);
            if (this.mode == 1) {
                if (this.eCoord != this.sCoord) {
                    var n = (num - this.sCoord) * (Math.log(this.eValue) - Math.log(this.sValue));
                    var m = this.eCoord - this.sCoord;
                    return Math.pow(Math.E, Math.log(this.sValue) + n / m);
                } else {
                    return 0;
                }
            } else {
                return this.sValue + (num - this.sCoord) * this.perCoord;
            }
        },
        getCoordinate : function(num) {
            num = tools.tonum(num);
            if (this.mode == 1) {
                if (this.eValue != this.sValue) {
                    var n = Math.log(num + this.fixValue) - Math.log(this.sValue + this.fixValue);
                    var m = (this.eCoord - this.sCoord) / (Math.log(this.eValue + this.fixValue) - Math.log(this.sValue + this.fixValue));
                    return this.sCoord + n * m;
                } else {
                    return 0;
                }
            } else {
                return this.sCoord + (num - this.sValue) * this.perValue;
            }
        },
        toString : function() {
            return "[object Mapping]";
        }
    };
    /*********/
    var Zoom = function( target, pointer ) {
        this.$pointer = pointer;
        this.$container = target;
    };
    Zoom.prototype = {
        getSubId : function() {
            return this.$pointer;
        },
        setOptions : function( options ) {
            this.options = options;
        },
        moveLeft : function() {

        },
        moveRight : function() {

        }
    };
    /*CAL COORDINATE FUNCTION*/
    var _coordinateAlgorithm = {
        _scientificNotation : function( num ) {
            if(num==0){
                return{num:0,power:0};
            }
            else{
                var sign=num>0?true:false;
                var maxPower=20;//only process data within 10 power of 10 or -10
                var s=Math.abs(num)<1?true:false;
                var re={num:null,power:null};
                for(i=0;i<=maxPower;i++){
                    if(s){
                        var res=Math.abs(tools.mul(num, Math.pow(10,i)));
                        if(res>=1&&res<10){
                            re.num=sign?res:-res;
                            re.power=-i;
                            break
                        }
                    }
                    else{
                        var res=Math.abs(tools.div(num,Math.pow(10,i)));
                        if(res>=1&&res<10){//this is bug
                            re.num=sign?res:-res;
                            re.power=i;
                            break
                        }
                    }
                }
                return re;
            }
        },
        _calculate : function( max, min, count ) {
            var acceptableInterval=[2.5,-2.5];
            var _max= max;
            var _min= min;
            var n = count;
            var first;
            var itnum=tools.div((_max-_min),n);
            //
            itnum = Number(itnum.toFixed(4));
            var o=this._scientificNotation(itnum);
            var step=Math.ceil(o.num);
            if(step == 0){
                step = 1;
            }
            for(var i=0;i<acceptableInterval.length;i++){
                if(o.num==acceptableInterval[i]){
                    step=o.num;
                    break
                }
            }
            step=tools.mul(step,Math.pow(10,o.power));
            step = Number(step.toFixed(2));
            if(step == 0){
                step = 1;
            }
            if(_min>=0){
                if(step>_min){
                    first=0;
                }
                else{
                    var test = tools.div(_min, step);
                    if(parseInt(test)==test){
                        first=_min;
                    }
                    else{
                        first= tools.mul(Math.floor(test),step);
                    }
                }
            }
            else{
                if(step>=Math.abs(_min)){
                    first=-step;
                }
                else{
                    var test = tools.div(_min, step);
                    if(parseInt(test)==test){
                        first=_min;
                    }
                    else{
                        first= tools.mul(Math.floor(test), step);
                    }
                }
            }
            var re=[];
            var circle=true,i=0;
//            if(first == min){
//                first = first - step;
//            };
            while(circle){
                var calibration= tools.add(first ,tools.mul(i, step));
                if(calibration > _max){
                    if(re[i-1][0] <= _max){
                        re.push([calibration, calibration+""]);
                    }
                    circle=false;
                }
                else{
                    re.push([calibration, calibration+""]);
                }
                i++;
            }
            return re;
        },
        getRange : function( range, count ) {
            if(typeof(range.first)!="number"||typeof(range.second)!="number"){
                return[];
            }
            if(typeof(count)=="undefined"||count<=0){
                count=4;
            }
            count=Math.round(count);
            var second=range.second>range.first?range.second:range.first;
            var first=range.first<range.second?range.first:range.second;
            if(second==first){
                if(second==0&&first==0){
                    first=-1;second=1;return [[0,"0"],[1,"1"],[2,"2"]];
                }
                var mid=first;second+=second*0.1;first-=first*0.1;
                if(first>second){
                    first=parseFloat(second.toFixed(4));
                    second=parseFloat(first.toFixed(4));
                };
                return [[first, first+""],[mid, mid+""],[second, second+""]];
            }
            return this._calculate(second, first, count);
        },
        segmentByNumber : function( range, count ) {
            if(typeof(range.first)!="number"||typeof(range.second)!="number"){
                return[];
            }
            if(typeof(count)=="undefined"||count<=0){
                count=4;
            }
            var second=range.second>range.first?range.second:range.first;
            var first=range.first<range.second?range.first:range.second;
            if(second==first){
                if(second==0&&first==0){
                    first=-1;second=1;return [-1,0,1];
                }
                var mid=first;second+=second*0.1;first-=first*0.1;
                if(first>second){
                    first=parseFloat(second.toFixed(4));
                    second=parseFloat(first.toFixed(4));
                };
                return [first,mid,second];
            }
            var step = Math.ceil((second - first) / count);
            if(step == 0){
                step = 1;
            }
            var circle=true,i=0, re = [];
            while(circle){
                var calibration= tools.add(first ,tools.mul(i, step));
                if(calibration > second){
                    if(re[i-1][0] < second){
                        re.push([second, second+""]);
                    }
                    circle=false;
                }
                else{
                    re.push([calibration, calibration+""]);
                }
                i++;
            }
            return re;
        },
        segmentationByCus : function( range, count, data ) {
            if(typeof(count) === "undefined") {
                count = Math.floor(this._placeHolder.width() / 100);
            }
            var minMax_data=[],ca=[],tempca=[];
            var _graph = data;
            var _graphLen=_graph.length;
            var _specaCa=[];
            for(var n=0; n<_graphLen;n++){
                minMax_data.push(_graph[n].data[0]);
                minMax_data.push(_graph[n].data[_graph[n].data.length-1]);
            }
            minMax_data.sort(function(a,b){
                return a[0]-b[0];
            });
            var lastArr=[];
            var _minMaxLen=minMax_data.length;
            var allDataLen=minMax_data[_minMaxLen-1][0]-minMax_data[0][0];
            var itemStep=Math.ceil(allDataLen/count);
            var newStep=null;
            if(itemStep <= 0){
                itemStep = 1;
            }
            for(var n=0; n< _graphLen; n++){
                if(newStep!=null){
                    for(var x=0; x< _graph[n].data.length; x=x+newStep){
                        if(_graph[n].data[x]){
                            tempca.push([_graph[n].data[x][0],_graph[n].data[x][1]]);
                            if(x+itemStep>=_graph[n].data.length){
                                lastArr=[_graph[n].data[x][0],_graph[n].data[x][1]];
                            }
                        }
                    }
                }
                else{
                    for(var x=0; x< allDataLen; x=x+itemStep){
                        if(_graph[n].data[x]){
                            tempca.push([_graph[n].data[x][0],_graph[n].data[x][1]]);
                            if(x+itemStep>=_graph[n].data.length){
                                lastArr=[_graph[n].data[x][0],_graph[n].data[x][1]];
                            }
                        }
                    }
                }
            }
            if(minMax_data[_minMaxLen-1][0] != lastArr[0]){
                tempca.push([minMax_data[_minMaxLen-1][0],minMax_data[_minMaxLen-1][1]]);
            }
            tempca.sort(function(a,b){
                return a[0]-b[0];
            });
            ca.push(tempca[0]);
            for(var i=0; i<tempca.length; i++){
                if(newStep != null){
                    if(tempca[i][0]>=ca[ca.length-1][0]+(newStep*itemIntev)){
                        ca.push(tempca[i]);
                    }
                }
                else{
                    if(tempca[i][0]>=ca[ca.length-1][0]+itemStep){
                        ca.push(tempca[i]);
                    }
                }
            }
            if(ca[ca.length-1][0] != tempca[tempca.length-1][0]){
                ca.push(tempca[tempca.length-1]);
            }
            if(ca.length==1){
                ca.push([ca[0][0]+1,""]);
            }
            reca = ca;
            return reca;
        },
        segmentationByDay : function( range ) {
            var startDate = range.first, endDate = range.second;
            if(typeof startDate == 'string'){
                startDate = tools.stringToDate(startDate);
            }
            if(typeof endDate == 'string'){
                endDate = tools.stringToDate(endDate);
            }
            if(startDate > endDate){
                return;
            }
            var sDate = new Date(startDate), eDate = new Date(endDate),
                sy = sDate.getFullYear(), sm = sDate.getMonth(), sd = sDate.getDate(),
                ey = eDate.getFullYear(), em = eDate.getMonth(), ed = eDate.getDate(),
                gap = (endDate - startDate) / 86400000, i = 0, ca = [], tempDateString = '', _tempDate = null;

            for(; i < gap; i++){
                _tempDate = startDate + i * 86400000;
                tempDateString = tools.dateToString(_tempDate);
                ca.push([_tempDate,tempDateString]);
            }
            ca.push([endDate, tools.dateToString(endDate)]);
            return ca;
        },
        segmentationByWeek : function( range ) {
            var startDate = range.first, endDate = range.second;
            if(typeof startDate == 'string'){
                startDate = tools.stringToDate(startDate);
            }
            if(typeof endDate == 'string'){
                endDate = tools.stringToDate(endDate);
            }
            if(startDate > endDate){
                return;
            }
            var sDate = new Date(startDate), eDate = new Date(endDate),
                sy = sDate.getFullYear(), sm = sDate.getMonth(), sd = sDate.getDate(),
                ey = eDate.getFullYear(), em = eDate.getMonth(), ed = eDate.getDate(),
                day = 6 - sDate.getDay(),
                gap = ey - sy + 1, i = 0, index = sm, ca = [], tempDateString = '', _tempDate = null,
                sDay = startDate + (day - 1) * 86400000;

            ca.push([startDate, tools.dateToString(startDate)]);
            ca.push([sDay,tools.dateToString(sDay)]);
            while(sDay < endDate){
                sDay = sDay + 7 * 86400000;
                tempDateString = tools.dateToString(sDay);
                if(sDay > endDate){
                    break;
                }
                ca.push([sDay, tempDateString]);
            }
            ca.push([endDate, tools.dateToString(endDate)]);
            return ca;
        },
        segmentationByMonth : function( range ) {
            var startDate = range.first, endDate = range.second;
            if(typeof startDate == 'string'){
                startDate = tools.stringToDate(startDate);
            }
            if(typeof endDate == 'string'){
                endDate = tools.stringToDate(endDate);
            }
            if(startDate > endDate){
                return;
            }
            var sDate = new Date(startDate), eDate = new Date(endDate),
                sy = sDate.getFullYear(), sm = sDate.getMonth(), sd = sDate.getDate(),
                ey = eDate.getFullYear(), em = eDate.getMonth(), ed = eDate.getDate(),
                gap = ey - sy + 1, i = 0, index = sm, ca = [], tempDateString = '', _tempDate = null, temp = '',
                arrayMonth = [31,28,31,30,31,30,31,31,30,31,30,31], arrayLeapMonth = [31,29,31,30,31,30,31,31,30,31,30,31];

            ca.push([startDate, tools.dateToString(startDate)]);
            if(gap == 1){
                for(; index < em; index++){
                    _tempDate = new Date(sy, index,arrayMonth[index]);
                    _tempDate = Date.parse(_tempDate);
                    temp = (index + 1);
                    if(temp < 10){
                        temp = '0' + temp;
                    }
                    tempDateString = temp + '/' + arrayMonth[index] + '/' + sy;
                    ca.push([_tempDate,tempDateString]);
                }
            }else{
                for(var i = sm; i < 12; i++){
                    _tempDate = new Date(sy,i,arrayMonth[i]);
                    _tempDate = Date.parse(_tempDate);
                    temp = i + 1;
                    if(temp < 10){
                        temp = '0' + temp;
                    }
                    tempDateString = temp + '/' + arrayMonth[i] + '/' + sy;
                    ca.push([_tempDate,tempDateString]);
                }
                sy++;
                for(var i = 1; i < gap; i++){
                    for(var j = 0; j < 12; j++){
                        _tempDate = new Date(sy,j,arrayMonth[j]);
                        _tempDate = Date.parse(_tempDate);
                        if(_tempDate > endDate){
                            break;
                        }
                        temp = j + 1;
                        if(temp < 10){
                            temp = '0' + temp;
                        }
                        tempDateString = temp + '/' + arrayMonth[j] + '/' + sy;
                        ca.push([_tempDate,tempDateString]);
                    }
                    sy++;
                }
            }
            ca.push([endDate, tools.dateToString(endDate)]);
            return ca;
        },
        segmentationByQuarter : function( range ) {
            var startDate = range.first, endDate = range.second;
            if(typeof startDate == 'string'){
                startDate = tools.stringToDate(startDate);
            }
            if(typeof endDate == 'string'){
                endDate = tools.stringToDate(endDate);
            }
            if(startDate > endDate){
                return;
            }
            var sDate = new Date(startDate), eDate = new Date(endDate),
                sy = sDate.getFullYear(), sm = sDate.getMonth(), sd = sDate.getDate(),
                ey = eDate.getFullYear(), em = eDate.getMonth(), ed = eDate.getDate(),
                gap = ey - sy + 1, i = 1, ca = [], tempDateString = '', _ca = [], _tempDate = null,
                tempArray = [];
            _ca = segmentationByMonth(startDate, endDate);
            if(_ca.length < 2){
                ca = _ca;
            }else{
                ca.push(_ca[0]);
                for(; i < _ca.length - 1; i++){
                    tempDateString = _ca[i][1];
                    tempArray = tempDateString.split("/");
                    if(Number(tempArray[0]) % 3 == 0){
                        ca.push(_ca[i]);
                    }
                }
                ca.push(_ca[_ca.length - 1]);
            }
            return ca;
        },
        segmentationByYear : function( range ) {
            var startDate = range.first, endDate = range.second;
            if(typeof startDate == 'string'){
                startDate = tools.stringToDate(startDate);
            }
            if(typeof endDate == 'string'){
                endDate = tools.stringToDate(endDate);
            }
            if(startDate > endDate){
                return;
            }
            var sDate = new Date(startDate), eDate = new Date(endDate),
                sy = sDate.getFullYear(), sm = sDate.getMonth(), sd = sDate.getDate(),
                ey = eDate.getFullYear(), em = eDate.getMonth(), ed = eDate.getDate(),
                gap = ey - sy + 1, i = 0, ca = [], tempDateString = '';

            for(; i < gap; i++){
                if(i == 0){
                    tempDateString = tools.dateToString(startDate);
                    ca.push([startDate,tempDateString]);
                }else{
                    var _ny = sy + i;
                    var ny = "01" + "/" + "01" + "/" + _ny;
                    var _dt = new Date(ny);
                    var tempDate = Date.parse(_dt);
                    tempDate = tempDate -  24 * 60 * 60 * 1000;
                    _tempDate = new Date(tempDate);
                    var _m = _tempDate.getMonth()+1;
                    var _d = _tempDate.getDate();
                    var _y = _tempDate.getFullYear();
                    if(_m < 10){
                        _m = "0" + _m;
                    }
                    if(_d < 10){
                        _d = "0" + _d;
                    }
                    var _sd = _m + '/' + _d + '/' + _y;
                    if(tempDateString == _sd){
                        ca.pop();
                    }
                    tempDateString = _sd;
                    ca.push([tempDate, tempDateString]);
                }
            }
            tempDateString = tools.dateToString(endDate);
            ca.push([endDate, tempDateString]);
            return ca;
        }
    };
    var calSecCal = function( s, v, e, f, p ) {
        var ca = [];
        var start = s;
        for( var i = f; i <= e; i = i + p ) {
            start = s + i*v;
            var dt = new Date(start);
            var temp = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            ca.push([i,temp]);
            if( (i + p) > e ) {
                start = s + e*v;
                var dt = new Date(start);
                var temp = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                ca.push([e,temp]);
            }
        }
        return ca;
    };
    var calMinCal = function( s, v, e, f, p ) {
        var ca = [];
        var start = s;
        for( var i = f; i <= e; i = i + p ) {
            start = s + i*v;
            var dt = new Date(start);
            var temp = dt.getHours() + ":" + dt.getMinutes();
            ca.push([i,temp]);
            if( (i + p) > e ) {
                start = s + e*v;
                var dt = new Date(start);
                var temp = dt.getHours() + ":" + dt.getMinutes();
                ca.push([e,temp]);
            }
        }
        return ca;
    };
    var calHourCal = function( s, v, e, f, p ) {
        var ca = [];
        var start = s;
        for( var i = f; i <= e; i = i + p ) {
            start = s + i*v;
            var dt = new Date(start);
            var temp = "";
            if( dt.getHours() > 12 ) {
                if( dt.getHours() == 12 ){
                    temp = dt.getHours() + "PM";
                }else{
                    temp = (dt.getHours() - 12) + "PM";
                }
            }else{
                temp = dt.getHours() + "AM";
            }
            ca.push([i,temp]);
            if( (i + p) > e ) {
                start = s + e*v;
                var dt = new Date(start);
                var temp = dt.getHours();
                if( dt.getHours() > 12 ) {
                    if( dt.getHours() == 12 ){
                        temp = dt.getHours() + "PM";
                    }else{
                        temp = (dt.getHours() - 12) + "PM";
                    }
                }else{
                    temp = dt.getHours() + "AM";
                }
                ca.push([e,temp]);
            }
        }
        return ca;
    };
    var calCoordinate = {
        getCalibration : function( range, gridCount, type, data ) {
            var ca = null;
            switch(type){
                case "year" :
                    ca = _coordinateAlgorithm.segmentationByYear(range);
                    break;
                case "quarter" :
                    ca = _coordinateAlgorithm.segmentationByQuarter(range);
                    break;
                case "month" :
                    ca = _coordinateAlgorithm.segmentationByMonth(range);
                    break;
                case "week" :
                    ca = _coordinateAlgorithm.segmentationByWeek(range);
                    break;
                case "day" :
                    ca = _coordinateAlgorithm.segmentationByDay(range);
                    break;
                case "number" :
                    ca = _coordinateAlgorithm.segmentByNumber(range, gridCount);
                    break;
                case "customer" :
                    ca = _coordinateAlgorithm.segmentationByCus( range, gridCount, data );
                    break;
                default:
                    ca = _coordinateAlgorithm.getRange(range, gridCount);
                    break;
            }
            return ca;
        },
        getDateTime : function( range, count, arg ) {
            var s = arg.startDate;
            if(typeof(range.first)!="number"||typeof(range.second)!="number"){
                return[];
            }
            if(typeof(count)=="undefined"||count<=0){
                count=4;
            }
            var second = range.second>range.first?range.second:range.first;
            var first = range.first<range.second?range.first:range.second;
            if(second==first){
                if(second==0&&first==0){
                    first=-1;second=1;return [-1,0,1];
                }
                var mid=first;second+=second*0.1;first-=first*0.1;
                if(first>second){
                    first=parseFloat(second.toFixed(4));
                    second=parseFloat(first.toFixed(4));
                };
                return [first,mid,second];
            }
            var step = Math.ceil((second - first) / count);
            if(step == 0){
                step = 1;
            }
            var interval = arg.interval;
            var arr = interval.split(".");
            var defaultInter = "m";
            var interUnit = arr[1];
            var interV = Number(arr[0]);
            var ca = null;
            if( interUnit == undefined ) {
                interUnit = defaultInter;
            }
            switch( interUnit ) {
                case "s":
                    interV = interV * 1000;
                    ca = calSecCal(s, interV, second, first, step);
                    break;
                case "m" :
                    interV = interV * 60 * 1000;
                    ca = calMinCal(s, interV, second, first, step);
                    break;
                case "h":
                    interV = interV * 60 * 60 * 1000;
                    ca = calHourCal(s, interV, second, first, step);
                    break;
            }
            return ca;
        }
    };
    var calXCal = function( arg, data ) {
        var ca = arg.calibration,
            range = arg.value,
            type = arg.type,
            count = arg.count;
        var arrType = type.split("|");
        type = arrType[0];
        var subType = arrType[1];
        if( $.isArray(ca) ) {
            return ca;
        }
        var _resolveStacked = function() {
            var _range = {}, min = MAX, max = 0;
            for( var i = 0; i < data.length; i++ ) {
                var temp = data[i];
                if( temp.minX < min ) {
                    min = temp.minX;
                }
                if( max < 0 && temp.maxX) {
                    max = max - temp.maxX;
                }else{
                    max += temp.maxX;
                }
            }
            _range = {
                first : min,
                second : max
            };
            return _range;
        };
        if( type == "stacked" ) {
            range = _resolveStacked();
        }
        if( type == "dateTime" ) {
            ca = calCoordinate.getDateTime(range, count, arg);
        }else{
            ca = calCoordinate.getCalibration(range, count, type, data);
        }
        if( subType == "bar" ) {
            if( ca.length == 1 ) {
                ca.push([1,""]);
            }else{
                var step = ca[1][0] - ca[0][0];
                ca.push([ca[ca.length-1][0]+step, ""]);
            }
        }
        return ca;
    };
    var calYCal = function( arg, data ) {
        var ca = arg.calibration,
            range = arg.value,
            count = arg.count,
            type = arg.type
            ;
        if( $.isArray(ca) ) {
            return ca;
        }
        var _resolveStacked = function() {
            var _range = {}, min = MAX, max = 0;
            for( var i = 0; i < data.length; i++ ) {
                var temp = data[i];
                if( temp.minY < min ) {
                    min = temp.minY;
                }
                if( max < 0 && temp.maxY) {
                    max = max - temp.maxY;
                }else{
                    max += temp.maxY;
                }
            }
            _range = {
                first : min,
                second : max
            };
            return _range;
        };
        if( type == "stacked" ) {
            range = _resolveStacked();
        }
        ca = calCoordinate.getCalibration(range, count, type, data);
        return ca;
    };
    /*END*/
    /*DATA MODULE*/
    var DataModule = function() {
        this.$chartData = null;
        var __findMaxData = function( data ) {
            var datum = {}, dlen = data.length, datumItem = null, isnum=false, yID = '';
            for(var j = 0; j < dlen; j++){
                yID = data[j].yId;
                if( datum[yID] == undefined ) {
                    datum[yID] = {};
                    datum[yID].maxX =  datum[yID].maxY = MIN;
                    datum[yID].minX =  datum[yID].minY = MAX;
                }
                var _data = data[j].data;
                len = _data.length;
                for (var i = 0; i < len; i++) {
                    datumItem = _data[i];
                    if (datumItem instanceof Array) {
                        if (isNaN(datumItem[2])) {
                            continue;
                        }
                        datum[yID].maxY = datumItem[2] > datum[yID].maxY ? datumItem[2] : datum[yID].maxY;
                        datum[yID].minY = datumItem[2] < datum[yID].minY ? datumItem[2] : datum[yID].minY;
                        datum[yID].minX = datumItem[0] < datum[yID].minX ? datumItem[0] : datum[yID].minX;
                        datum[yID].maxX = datumItem[0] > datum[yID].maxX ? datumItem[0] : datum[yID].maxX;
                    } else {
                        if (typeof(datumItem) === "number") {
                            isnum=true;
                            datum[yID].maxY = datumItem > datum[yID].maxY ? datumItem : datum[yID].maxY;
                            datum[yID].minY = datumItem < datum[yID].minY ? datumItem : datum[yID].minY;
                        }
                    }
                }
                data[j].maxY = datum[yID].maxY;
                data[j].minY = datum[yID].minY;
                data[j].maxX = datum[yID].maxX;
                data[j].minX = datum[yID].minX;
            }
            return datum;
        };
        var __matchData = function(data){
            var len = data.length;
            var tempData = new Array();
            var dlen = 0;
            var temp = null;
            var retData = [];
            for(var i = 0; i < len; i++){
                tempData = [];
                temp = data[i].data;
                dlen = temp.length;
                if(len > 0){
                    if(temp[0] instanceof Array){
                        return data;
                    }else if(dlen < 1){
                        return data;
                    }else{
                        for(var j = 0; j < dlen; j++){
                            tempData.push([j, j+'', temp[j]]);
                        }
                        retData.push({dataId:data[i].dataId, data : tempData, xId : data[i].xId, yId : data[i].yId});
                    }

                }
            }
            return retData;
        };
        var __findDataByPoint = function( data, pt ) {
            var res=[];
            var findX= function(s) {
                var re = null;
                var data = s.pt;
                var start = 0;
                var end = data.length - 1;
                var d = index = null;
                while (end - start >= 2) {
                    var mid = start + Math.floor((end - start) / 2);
                    if (data[mid].x < pt.x) {
                        start = mid;
                    } else {
                        end = mid;
                    }
                }
                if (end - start < 2) {
                    var ds = (data[start].x - pt.x) * (data[start].x - pt.x) + (data[start].y - pt.y) * (data[start].y - pt.y);
                    var de = (data[end].x - pt.x) * (data[end].x - pt.x) + (data[end].y - pt.y) * (data[end].y - pt.y);
                    var xs = (data[start].x - pt.x) * (data[start].x - pt.x);
                    var xe = (data[end].x - pt.x) * (data[end].x - pt.x);
                    re = {};
                    re.ds = ds;
                    re.de = de;
                    re.xs = xs;
                    re.xe = xe;
                    re.start = start;
                    re.end = end;
                }
                return re;
            };
            $.each(data, function(i,s) {
                if(s.pt != null && s.pt.length > 1){
                    var dis = findX(s);
                    res.push(dis);
                }
            });
            return res;
        };
        this.setData = function( data ) {
            this.$chartData = __matchData(data);
        };
        this.getData = function() {
            return this.$chartData;
        };
        this.getRange = function() {
            var range = __findMaxData(this.$chartData);
            return range;
        };
        this.findData = function( data, pt ) {
            return __findDataByPoint( data, pt );
        };
    };
    /*END*/
    /*SVG BASIC*/
    var arctempFn = function (center, r){
        var cx = parseFloat(center.x, 10);
        var cy = parseFloat(center.y, 10);
        var rx = parseFloat(0, 10);
        var ry = parseFloat(0, 10);
        var r = parseFloat(r, 10);
        if (r>0){
            rx = r;
            ry = r;
        }
        var output = "M" + (cx-rx).toString() + "," + cy.toString();
        output += "a" + rx.toString() + "," + ry.toString() + " 0 1,0 " + (2 * rx).toString() + ",0";
        output += "a" + rx.toString() + "," + ry.toString() + " 0 1,0 " + (-2 * rx).toString() + ",0";
        return output;
    }
    var SVGElement = {
        createRootNode : function( target_, postion_, width_, height_, bgColor_ ) {
            function makeSVG(width, height){
                var svgNode = document.createElementNS(XMLNS, 'svg');
                svgNode.setAttribute('width', width);
                svgNode.setAttribute('height', height);
                svgNode.setAttribute('version', '1.1');
                return svgNode;
            }
            return $(makeSVG(width_, height_)).css({
                "float":"left",
                "position": postion_,
                "width": width_,
                "height": height_,
                "background-color": bgColor_ ? bgColor_ : "transparent"
            }).appendTo(target_).get(0);
        },
        createElement : function( type, attr ) {
            var ele = document.createElementNS(XMLNS, type);
            this.attr(ele, attr);
            return ele;
        },
        attr : function( ele, obj ) {
            for( var i in obj ) {
                ele.setAttribute(i, obj[i]);
            }
        },
        circle : function( ptCenter, radius, strokeColor, strokeWidth, fillColor, alpha ) {
            var circle = this.createElement('circle');
            var attr = {
                "cx" : ptCenter.x,
                "cy" : ptCenter.y,
                "r" : radius
            };
            if (fillColor) {
                attr["fill"] = fillColor;
            }
            if (strokeWidth > 0) {
                attr["stroke"] = strokeColor;
                attr["stroke-width"] = strokeWidth;
            }
            if(alpha){
                attr["opacity"] = alpha;
            }
            this.attr(circle, attr);
            return circle;
        },
        rect : function(x,y,w,h,strokeColor, strokeWidth, fillColor, rx, ry){
            if(rx === undefined){
                rx = 0;
            }
            if(ry === undefined){
                ry = 0;
            }
            var rect = this.createElement('rect');
            var attr = {
                "x" : x,
                "y" : y,
                "width" : w,
                "height" : h,
                "rx" : rx,
                "ry" : ry
            };
            if (fillColor) {
                attr["fill"] = fillColor;
            }else{
                attr["fill"] = "none";
            }
            if (strokeWidth > 0) {
                attr["stroke"] = strokeColor;
                attr["stroke-width"] = strokeWidth;
            }
            this.attr(rect, attr);
            return rect;
        },
        g : function( target, attr ) {
            var g = this.createElement("g", attr);
            target.appendChild(g);
            return g;
        },
        image : function() {},
        path : function( d, strokeWidth, strokeColor, fillColor ) {
            var path = this.createElement('path');
            var attr = {
                "d" : d,
                "stroke" : strokeColor,
                "stroke-width" : strokeWidth,
                "fill" : fillColor,
                "stroke-linejoin" : "round",
                "stroke-linecap" : "round"
            };
            this.attr(path,attr);
            return path;
        },
        clipRect : function() {},
        text : function( text_, x_, y_ ) {
            var text = this.createElement("text");
            $(text).text(text_);
            var attr = {
                x : x_,
                y : y_
            };
            this.attr(text, attr);
            return text;
        },
        line : function( sPoint, ePoint, lineColor, lineWidth ) {
            var line = this.createElement("line");
            var attr = {
                "x1" : sPoint.x,
                "y1" : sPoint.y,
                "x2" : ePoint.x,
                "y2" : ePoint.y,
                "stroke" : lineColor,
                "stroke-width" : lineWidth,
                "stroke-linejoin" : "round",
                "stroke-linecap" : "round"
            };
            this.attr(line, attr);
            return line;
        },
        ellipse : function( center, radius, lineWidth, lineColor,fillColor ) {
            var ellipse = this.createElement("ellipse");
            var attr = {
                "cx" : center.x,
                "cy" : center.y,
                "rx" : radius.x,
                "ry" : radius.y,
                "stroke" : lineColor,
                "stroke-width" : lineWidth,
                "fill" : fillColor
            };
            this.attr(ellipse, attr);
            return ellipse;
        }
    };
    var SVGAnimation = {
        line : function( w, h, elem ) {
            var id = "clipPath"+math.random();
            elem.attr("clip-path", "url(#"+id+")");
            var cp = SVGElement.createElement("clipPath", {
                id : id
            });
            var rect = SVGElement.createElement("rect",{
                "fill" : "none",
                "x" : "0",
                "y" : "0",
                "width" : "0",
                "height" : h
            });
            cp.appendChild(rect);
            $(cp).appendTo($(elem));
            var str = elem.attr("transform");
            var array = str.split(" ");
            var newStr = array[0]+" scale(1 1)";
            elem.attr("transform", newStr);
            var t = (w / 1000)*50;
            var __w = 0;
            var __fun = function( id ) {
                __w = __w + t;
                if( __w < w ) {
                    $(rect).attr("width", __w);
                    requestAnimationFrame(__fun);
                }else{
                    $(rect).attr("width", w);
                    cancelAnimationFrame(id);
                }
            };
            requestAnimationFrame(__fun);
        },
        bar : function( base, elem, end ) {
            var y = base;
            var sy = 0;
            var t = y / 10;
            end = 0;
            var __fun = function( id ) {
                var dom = elem;
                y = y-t;
                sy = sy+0.1;
                if(sy <= 1) {
                    dom.attr({
                        "transform" : "translate(0,"+(y+end)+") scale(1 "+sy+")"
                    });
                    requestAnimationFrame(__fun);
                }else{
                    y = 0;
                    sy = 1;
                    dom.attr({
                        "transform" : "translate(0, "+end+") scale(1 "+sy+")"
                    });
                    cancelAnimationFrame(id);
                }
            };
            requestAnimationFrame(__fun);
        },
        column : function( base, elem, end ) {
            var sy = 0;
            var x = base;
            var t = base / 10;
            var __fun = function( id ) {
                var dom = elem;
                sy = sy+0.1;
                x = x - t;
                if(sy <= 1) {
                    dom.attr({
                        "transform" : "translate("+(x+end)+",0) scale("+sy+" 1)"
                    });
                    requestAnimationFrame(__fun);
                }else{
                    sy = 1;
                    dom.attr({
                        "transform" : "translate("+end+",0) scale("+sy+" 1)"
                    });
                    cancelAnimationFrame(id);
                }
            };
            requestAnimationFrame(__fun);
        },
        bubble : function( xbase, ybase, elem ) {
            var y = ybase;
            var sy = 0;
            var ty = y / 20;
            var sx = 0;
            var x = xbase;
            var tx = x / 20;
            var __fun = function( id ) {
                var dom = elem;
                sy = sy + 0.05;
                sx = sx + 0.05;
                x = x - tx;
                y = y - ty;
                if( sy <= 1 ) {
                    dom.attr({
                        "transform" : "translate("+(x)+","+(y)+") scale("+sx+" "+sy+")"
                    });
                    requestAnimationFrame(__fun);
                }else{
                    dom.attr({
                        "transform" : "translate(0,0) scale(1 1)"
                    });
                    cancelAnimationFrame(id);
                }
            };
            requestAnimationFrame(__fun);
        },
        pie : function() {}
    };
    var SVGRenderer = {
        drawPath : function( svgDoc, ptCollection, strokeWidth, strokeColor, fillColor, closePath ) {
            var pathPoints = "";
            var checkPoints=function(index){
                var re=null;
                for (var i = index; i < len; i++) {
                    if(typeof(ptCollection[i].y)=="number"){
                        re=i;
                        break;
                    }
                }
                return re;
            };
            pathPoints = "M " + ptCollection[0].x + " " + ptCollection[0].y;
            for(var i = 1; i < ptCollection.length; i++){
                if(typeof(ptCollection[i].y)=="number"){
                    pathPoints += " L " + ptCollection[i].x + " " + ptCollection[i].y;
                }
                else if(ptCollection[i].y==null){
                    var index=checkPoints(i);
                    if(index!=null){
                        pathPoints += " L " + ptCollection[index].x + " " + ptCollection[index].y;
                    }
                }
            }
            if(closePath){
                pathPoints += " Z";
            }
            var path = CE.path(pathPoints, strokeWidth, strokeColor, fillColor);
            svgDoc.appendChild(path);
            return path;
        },
        drawPolygon : function( svgDoc, ptCollection, strokeWidth, strokeColor, fillColor ) {
            this.drawPath(svgDoc, ptCollection, strokeWidth, strokeColor, fillColor, true);
        },
        drawBar : function( svgDoc, ptCollection, strokeWidth, strokeColor, fillColor ) {
            console.info(fillColor);
            for( var i = 0; i < ptCollection.length; i++ ) {
                var temp = ptCollection[i];
                var x = temp[0].x, y = temp[2].y;
                var w = temp[2].x - x, h = temp[0].y - temp[2].y;
                if( h < 0 ) {
                    y = y + h;
                    h = math.abs(h);
                }
                if( w < 0 ) {
                    x = temp[1].x;
                    w = math.abs(w);
                }
                var color = null;
                if($.isArray(fillColor)){
                    color = fillColor[i];
                }else{
                    color = fillColor;
                }
                this.drawRectangle(svgDoc, x,y,w,h,strokeColor, strokeWidth, JColor.parse(color).toString());
            }
            //this.drawPath(svgDoc, ptCollection, strokeColor, strokeWidth, fillColor, true);
        },
        drawRectBar : function( svgDoc, ptCollection, strokeColor, strokeWidth, fillColor, autoAdjust ) {
            for(var i=0;i<ptCollection.length;i++){
                var pt=ptCollection[i];
                if (pt[3] < 0){
                    pt[1] = pt[1] + pt[3];
                    pt[3] = -pt[3];
                }
                if (pt[2] < 0){
                    pt[0] = pt[0] + pt[2];
                    pt[2] = -pt[2];
                }
                this.drawRectangle(svgDoc, pt[0],pt[1],pt[2],pt[3],strokeColor, strokeWidth, fillColor);
            }
        },
        drawPolyline : function( svgDoc, ptCollection, strokeWidth, strokeColor ) {
            var polyline = this.drawPath(svgDoc, ptCollection, strokeWidth, strokeColor, "none", false);
            return polyline;
        },
        drawRectangle : function( svgDoc, x, y, w, h, strokeColor, strokeWidth, fillColor ) {
            var rect = CE.rect(x, y, w, h, strokeColor, strokeWidth, fillColor);
            svgDoc.appendChild(rect);
            return rect;
        },
        drawArcP : function( b, e, w, r, c ) {
            if (e < b){
                var tmp = b;
                b = e;
                e = tmp;
            }
            var fr = r-w;
            var sX1 = c.x + fr * Math.cos(b);
            var sY1 = c.y - fr * Math.sin(b);
            var sX2 = c.x + r * Math.cos(b);
            var sY2 = c.y - r * Math.sin(b);

            var eX1 = c.x + r * Math.cos(e);
            var eY1 = c.y - r * Math.sin(e);
            var eX2 = c.x + fr * Math.cos(e);
            var eY2 = c.y - fr * Math.sin(e);
            var path = "";
            path += "M" + sX1 + " " + sY1 + " ";
            path += "L" + sX2 + " " + sY2 + " ";
            if (e - b >= Math.PI){
                path += "A" + r + " " + r + " 0 1 0 " + eX1 + " " + eY1 + " ";
            }else{
                path += " A " + r + " " + r + " 0 0 0 " + eX1 + " " + eY1 + " ";
            }
            path += "L" + eX2 + " " + eY2 + " ";
            if(e - b >= Math.PI) {
                path += "A" + fr + " " + fr + " 0 1 1  " + sX1 + " " + sY1 + " ";
            }else{
                path += "A" + fr + " " + fr + " 0 0 1 " + sX1 + " " + sY1 + " ";
            }
            path += "z ";
            return path;
        },
        drawArc : function( svgDoc, ptCenter, radius, beginArc, endArc, strokeColor, strokeWidth, fillColor, arcWidth ) {
            if (endArc < beginArc){
                var tmp = beginArc;
                beginArc = endArc;
                endArc = tmp;
            }
            var startX = ptCenter.x + radius * Math.cos(beginArc);
            var startY = ptCenter.y - radius * Math.sin(beginArc);
            var endX = ptCenter.x + radius * Math.cos(endArc);
            var endY = ptCenter.y - radius * Math.sin(endArc);
            var pointPath = "M " + ptCenter.x + " " + ptCenter.y;
            pointPath += " L " + startX + " " + startY;
            if (endArc - beginArc >= Math.PI){
                pointPath += " A " + radius + " " + radius + " 0 1 0 ";
            }else{
                pointPath += " A " + radius + " " + radius + " 0 0 0 ";
            }
            pointPath += endX + " " + endY;
            pointPath += " L " + ptCenter.x + " " + ptCenter.y + " Z";
            if( typeof arcWidth != "undefined" ){
                pointPath = this.drawArcP(beginArc, endArc, arcWidth, radius, ptCenter);
            }else if( endY == startY ) {
                pointPath = arctempFn(ptCenter, radius);
            }
            var path = CE.path(pointPath, strokeWidth, strokeColor, fillColor);
            svgDoc.appendChild(path);
        },
        drawBubbles : function( svgDoc, ptCenter, radius, strokeColor, strokeWidth, fillColor,alpha ) {
            var gAlpha=(parseFloat(alpha)>=0 && parseFloat(alpha)<=1)?parseFloat(alpha):0.5;
            this.drawCircle(svgDoc, ptCenter, radius, strokeColor, strokeWidth, fillColor, alpha);
        },
        drawCircles : function( svgDoc, ptCenter, radius, strokeColor, strokeWidth, fillColor ) {
            if(ptCenter.length>0){
                for(var i=0;i<ptCenter.length;i++){
                    this.drawCircle(svgDoc, ptCenter[i], radius, strokeColor, strokeWidth, fillColor);
                }
            }
        },
        drawCircle : function( svgDoc, ptCenter, radius, strokeColor, strokeWidth, fillColor, alpha ) {
            var circle = CE.circle(ptCenter, radius, strokeColor, strokeWidth, fillColor, alpha);
            svgDoc.appendChild(circle);
        },
        drawVDotLine : function( svgDoc, x, y1, y2, scale, space, lineColor, lineWidth ) {
            var temp1 = y2, temp2 = y2 - scale, unit = scale + space;
            var pathPoints = "";
            while (temp1 > y1) {
                pathPoints += " M " + x + " " + temp2;
                pathPoints += " L " + x + " " + temp1;
                temp1 -= unit;
                temp2 -= unit;
                temp2 = temp2 < y1 ? y1 : temp2;
            }
            var path = CE.path(pointPath, lineWidth, lineColor, lineColor);
            svgDoc.appendChild(path);
        },
        drawCandlestick : function( svgDoc, list, width, lineColor, lineWidth, colorRise, colorFall ) {
            if(!list || !list.length){
                return [];
            }
            var area = [];
            var adjust = lineWidth % 2 == 1 ? 0.5 : 0;
            var hw = width * 0.5;
            if(width < 3){
                width = 1;
            }
            var fix = function(v){
                return parseInt(v) + adjust;
            }
            var i, len, p, x, w, h;
            len = list.length;
            var pathPoints = "";
            for(i = 0; i < len; i++){
                p = list[i];
                if(p.r == 0){
                    x = fix(p.x);
                    pathPoints += " M " + x + " " + fix(p.h);
                    pathPoints += " L " + x + " " + fix(p.l);
                    if(width != 1){
                        pathPoints += " M " + fix(p.x - hw) + " " + fix(p.o);
                        pathPoints += " L " + fix(p.x + hw) + " " + fix(p.o);
                    }
                }
                area.push([p.x, p.l + (p.h - p.l) * 0.5, i]);
            }
            if(pathPoints != "") {
                var path = CE.path(pathPoints, lineWidth, lineColor, "none");
                svgDoc.appendChild(path);
            }
            var risePathPoint = "";
            var erisePathPoint = "";
            for(i = 0; i < len; i++){
                p = list[i];
                if(p.r == 1){
                    x = fix(p.x);
                    w = parseInt(width);
                    h = Math.max(parseInt(p.o - p.y), 1);
                    if (p.s == 1 || width == 1) {
                        risePathPoint += " M " + x + " " + fix(p.h);
                        risePathPoint += " L " + x + " " + fix(p.l);
                        if(width != 1){
                            risePathPoint += " M " + parseInt(p.x - hw) + " " + parseInt(p.y);
                            risePathPoint += " L " + (parseInt(p.x - hw) + w) + " " + parseInt(p.y);
                            risePathPoint += " L " + (parseInt(p.x - hw) + w) + " " + (parseInt(p.y) + h);
                            risePathPoint += " L " + parseInt(p.x - hw) + " " + (parseInt(p.y) + h) + " Z";
                        }
                    }else{
                        erisePathPoint += " M " + x + " " + fix(p.h);
                        erisePathPoint += " L " + x + " " + fix(p.y);
                        erisePathPoint += " M " + x + " " + fix(p.o);
                        erisePathPoint += " L " + x + " " + fix(p.l);

                        erisePathPoint += " M " + fix(p.x - hw) + " " + fix(p.y);
                        erisePathPoint += " L " + (fix(p.x - hw) + w) + " " + fix(p.y);
                        erisePathPoint += " L " + (fix(p.x - hw) + w) + " " + (fix(p.y) + h);
                        erisePathPoint += " L " + fix(p.x - hw) + " " + (fix(p.y) + h) + " Z";
                    }
                }
            }
            var path = CE.path(risePathPoint, lineWidth, colorRise, colorRise);
            svgDoc.appendChild(path);

            var path = CE.path(erisePathPoint, lineWidth, colorRise, "none");
            svgDoc.appendChild(path);

            var fallPathPoint = "";
            var efallPathPoint = "";
            for (i = 0; i < len; i++) {
                p = list[i];
                if(p.r == -1){
                    x = fix(p.x);
                    w = parseInt(width);
                    h = Math.max(parseInt(p.y - p.o), 1);
                    if (p.s == 1 || width == 1) {
                        fallPathPoint += " M " + x + " " + fix(p.h);
                        fallPathPoint += " L " + x + " " + fix(p.l);
                        if(width != 1){
                            fallPathPoint += " M " + parseInt(p.x - hw) + " " + parseInt(p.o);
                            fallPathPoint += " L " + (parseInt(p.x - hw) + w) + " " + parseInt(p.o);
                            fallPathPoint += " L " + (parseInt(p.x - hw) + w) + " " + (parseInt(p.o) + h);
                            fallPathPoint += " L " + parseInt(p.x - hw) + " " + (parseInt(p.o) + h) + " Z";
                        }
                    }else{
                        efallPathPoint += " M " + x + " " + fix(p.h);
                        efallPathPoint += " L " + x + " " + fix(p.o);
                        efallPathPoint += " M " + x + " " + fix(p.y);
                        efallPathPoint += " L " + x + " " + fix(p.l);

                        efallPathPoint += " M " + fix(p.x - hw) + " " + fix(p.o);
                        efallPathPoint += " L " + (fix(p.x - hw) + w) + " " + fix(p.o);
                        efallPathPoint += " L " + (fix(p.x - hw) + w) + " " + (fix(p.o) + h);
                        efallPathPoint += " L " + fix(p.x - hw) + " " + (fix(p.o) + h) + " Z";
                    }
                }
            }
            var path = CE.path(fallPathPoint, lineWidth, colorFall, colorFall);
            svgDoc.appendChild(path);

            var path = CE.path(efallPathPoint, lineWidth, colorFall, "none");
            svgDoc.appendChild(path);
        },
        drawOHLC : function( svgDoc, list, lineColor, lineWidth ) {
            var pathPoints = "";
            for(var i = 1; i < list.length; i++){
                pathPoints += "M " + list[i][0] + " " + list[i][1];
                pathPoints += " L " + list[i][2] + " " + list[i][3];
            }
            var path = CE.path(pathPoints, lineWidth, lineColor );
            svgDoc.appendChild(path);
        },
        drawLines : function( svgDoc, lines, lineColor, lineWidth ) {
            var len = lines.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var ptStart = {
                        x:lines[i][0],
                        y:lines[i][1]
                    };
                    var ptEnd = {
                        x:lines[i][2],
                        y:lines[i][3]
                    };
                    this.drawLine(svgDoc, ptStart, ptEnd, lineColor, lineWidth);
                }
            }
        },
        drawLine : function(  svgDoc, ptStart, ptEnd, lineColor, lineWidth ) {
            var adjust = lineWidth % 2 == 1 ? 0.5 : 0
                , line
                ;
            var start = {
                x : parseInt(ptStart.x) + adjust,
                y : parseInt(ptStart.y) + adjust
            };
            var end = {
                x : parseInt(ptEnd.x) + adjust,
                y : parseInt(ptEnd.y) + adjust
            };
            line = SVGElement.line(start, end, lineColor, lineWidth);
            svgDoc.appendChild(line);
            return line;
        },
        drawRect : function( svgDoc, x, y, w, h, lineColor, lineWidth ) {
            var rect = CE.rect(x, y, w, h, lineColor, lineWidth);
            svgDoc.appendChild(rect);
            return rect;
        },
        drawEllipse : function( svgDoc, center, radiusPoint, strokeWidth, strokeColor, fillColor ) {
            var ellipse = CE.ellipse(center, radiusPoint, strokeWidth, strokeColor, fillColor);
            svgDoc.appendChild(ellipse);
            return ellipse;
        },
        drawGradient : function( ctx, color, top, bottom, divisionColor, minPos ) {
            var root = $(ctx).parent()[0];
            var id = "svggradient" + Math.random();
            var bottomColor = JColor.parse(color.stopColor).toString();
            var topColor = JColor.parse(color.startColor).toString();
            var divisionPos=(bottom-top)/(minPos-top);
            var defs = SVGElement.createElement("defs");
            root.appendChild(defs);
            var lineargradient = SVGElement.createElement("linearGradient");
            defs.appendChild(lineargradient);
            if(divisionColor){
                $(lineargradient).attr({
                    "id": id,
                    "x1" : "0",
                    "x2" : "0",
                    "y1" : "0",
                    "y2" : divisionPos
                });
            }else{
                $(lineargradient).attr({
                    "id": id,
                    "x1" : "0",
                    "x2" : "0",
                    "y1" : "0",
                    "y2" : "1"
                });
            }
            var stop1 = SVGElement.createElement("stop");
            var stop2 = SVGElement.createElement("stop");
            lineargradient.appendChild(stop1);
            if(divisionColor === true) {
                if(divisionPos < 0) {
                    stop1.setAttributeNS(null, 'style', 'stop-color : ' + bottomColor + ";stop-opacity:0.5");
                    stop1.setAttributeNS(null, 'offset',  0.99);
                    stop2.setAttributeNS(null, 'style', 'stop-color : ' + bottomColor + ";stop-opacity:0");
                } else {
                    stop1.setAttributeNS(null, 'style', 'stop-color : ' + topColor+ ";stop-opacity:0.5");
                    stop1.setAttributeNS(null, 'offset',  0.99);
                    stop2.setAttributeNS(null, 'style', 'stop-color : ' + bottomColor + ";stop-opacity:0.5");
                }

            } else {
                stop1.setAttributeNS(null, 'style', 'stop-color : ' + topColor + ";stop-opacity:0.5");
                stop1.setAttributeNS(null, 'offset',  0);
            }
            stop2.setAttributeNS(null, 'offset',  1);
            stop2.setAttributeNS(null, 'style',  'stop-color : ' + bottomColor +';stop-opacity:0;');
            lineargradient.appendChild(stop2);
            return "url(#" + id + ")";
        },
        drawText : function( ctx, text_, x, y ) {
            var text = SVGElement.text( text_, x, y );
            ctx.appendChild(text);
            return text;
        },
        clear : function( ctx ) {
            $(ctx).children().remove();
        }
    };
    var SVGCreate = {
        create : function(target_, postion_, left_, top_, width_, height_, bgColor_){
            function makeSVG(width, height){
                var svgNode = document.createElementNS(XMLNS, 'svg');
                svgNode.setAttribute('version', '1.1');
                svgNode.setAttribute("xmlns", XMLNS);
                svgNode.setAttribute('width', width);
                svgNode.setAttribute("height", height);
                return svgNode;
            }
            width_ = width_ ? width_ : target_.width();
            height_ = height_ ? height_ : target_.height();
            var dom = $(makeSVG(width_, height_)).css({
                "float":"left",
                "position": postion_ ? postion_ : ABSOLUTE,
                "left": left_ ? left_ : 0,
                "top": top_ ? top_ : 0,
                "width": width_,
                "height": height_,
                "background-color": bgColor_ ? bgColor_ : "transparent"
            }).appendTo(target_).get(0);
            return dom;
        },
        createGroup : function(target_, class_, strokeColor_, strokeWidth_, fillColor_){
            function makeSVGGroup(width, height){
                var svgGroupNode = document.createElementNS(XMLNS, 'g');
                return svgGroupNode;
            }
            return $(makeSVGGroup()).attr("class", class_).appendTo(target_).get(0);
        },
        createDiv:function(target_, postion_, left_, top_, width_, height_){
            function makeDiv(width, height){
                var c = document.createElement('DIV');
                c.width = width;
                c.height = height;
                return c;
            }
            return $(makeDiv(width_, height_)).css({
                "float":"left",
                "position": postion_,
                "left": left_,
                "top": top_,
                "width": width_,
                "height": height_
            }).appendTo(target_).get(0);
        },
        createElement : function(target_, elementName){
            var svgGroupNode = document.createElementNS(XMLNS, elementName);
            $(svgGroupNode).appendTo(target_);
            return svgGroupNode;
        },
        resize:function(target_, width_, height_){
            target_.css({
                width:width_,
                height:height_
            });
            target_.each(function(){
                this.width = width_;
                this.height = height_;
            });
        },
        createTextString : function(text_, target_, postion_, left_, top_, width_, height_){
            var str =[];
            str.push("<text x=",left_," y=",top_,"");
            if (width_){
                str.push("width:",width_,"px;");
            }
            if (height_){
                str.push("height:",height_,"px;'");
            }
            str.push(">",text_,"</text>");
            return str.join("");
        },
        createVertical : function(text_, target_, postion_, left_, top_, width_, height_){
            var text = document.createElementNS(XMLNS, 'text');
            text.setAttribute("transform", 'rotate(-90)');
            $(text).appendTo(target_);
            $(text).text(text_);

            text.setAttribute("x", left_);
            text.setAttribute("y", top_);

            return text;
        },
        getTextMeasure : function(text, target_){
            if (!target_){
                target_ = $(document.body)
            }
            var textbox = $(target_).children("#tbGetWidth");
            if (!textbox || textbox.length < 1) {
                textbox = $(MSChart.TextStudio.create(text, target_, "absolute", 10, 90, null, null)).attr({
                    id: "tbGetWidth"
                });
            }
            else {
                textbox.text(text);
            }
            var bbox = textbox.get(0).getBBox();
            var ret = {
                width: bbox.width,
                height: bbox.height
            };
            $(textbox).remove();
            return ret;
        }
    };
    /**********/
    /*CANVAS BASIC*/
    var CANVASElement = {};
    var CANVASAnimation = {};
    var CANVASRenderer = {
        begin:function(ctx){
            ctx.save();
            ctx.beginPath();
        },
        end:function(ctx){
            ctx.restore();
        },
        drawLine:function(ctx, ptStart, ptEnd, lineColor, lineWidth,autoAdjust){

            if(typeof(autoAdjust) == "undefined"){
                autoAdjust = true;
            }
            if (autoAdjust) {
                var adjust = lineWidth % 2 == 1 ? 0.5 : 0;
                ptStart.x = parseInt(ptStart.x) + adjust;
                ptStart.y = parseInt(ptStart.y) + adjust;
                ptEnd.x = parseInt(ptEnd.x) + adjust;
                ptEnd.y = parseInt(ptEnd.y) + adjust;
            }
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = lineColor;
            ctx.moveTo(ptStart.x, ptStart.y);
            ctx.lineTo(ptEnd.x, ptEnd.y);
            ctx.stroke();

        },
        drawLines:function(ctx, lines, lineColor, lineWidth, autoAdjust){
            if(typeof(autoAdjust) == "undefined"){
                autoAdjust = true;
            }
            var len = lines.length;
            if (len > 0) {
                ctx.beginPath();
                if (autoAdjust) {
                    var adjust = lineWidth % 2 == 1 ? 0.5 : 0;
                    for (var i = 0; i < len; i++) {
                        ctx.moveTo(parseInt(lines[i][0])+adjust, parseInt(lines[i][1])+adjust);
                        ctx.lineTo(parseInt(lines[i][2])+adjust, parseInt(lines[i][3])+adjust);
                    }
                }
                else {
                    for (var i = 0; i < len; i++) {
                        ctx.moveTo(parseInt(lines[i][0]), parseInt(lines[i][1]));
                        ctx.lineTo(parseInt(lines[i][2]), parseInt(lines[i][3]));
                    }
                }
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = lineColor;
                ctx.stroke();
            }
        },
        // draw candlestick for ohlc type
        drawCandlestick : function(ctx, list, width, lineColor, lineWidth, colorRise, colorFall) {
            if (!list || !list.length) {
                return [];
            }
            // save graph area
            var area = [];
            var adjust = lineWidth % 2 == 1 ? 0.5 : 0;
            var hw = width * 0.5;
            if (width < 3) {
                width = 1;
            }
            var fix = function(v) {
                return parseInt(v) + adjust;
            }
            var i, len, p, x, w, h;
            len = list.length;
            ctx.lineWidth = lineWidth;
            // when r = 0
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            for (i = 0; i < len; i++) {
                p = list[i];
                if (p.r == 0) {
                    x = fix(p.x);
                    ctx.moveTo(x, fix(p.h));
                    ctx.lineTo(x, fix(p.l));
                    if (width != 1) {
                        ctx.moveTo(fix(p.x - hw), fix(p.o));
                        ctx.lineTo(fix(p.x + hw), fix(p.o));
                    }
                }
                area.push([p.x, p.l + (p.h - p.l) * 0.5, i]);
            }
            ctx.stroke();
            // when r = 1
            ctx.beginPath();
            ctx.strokeStyle = colorRise;
            ctx.fillStyle = colorRise;
            for (i = 0; i < len; i++) {
                p = list[i];
                if (p.r == 1) {
                    x = fix(p.x);
                    w = parseInt(width);
                    h = Math.max(parseInt(p.o - p.y), 1);
                    if (p.s == 1 || width == 1) {
                        ctx.moveTo(x, fix(p.h));
                        ctx.lineTo(x, fix(p.l));
                        if (width != 1) {
                            ctx.fillRect(parseInt(p.x - hw), parseInt(p.y), w, h);
                        }
                    } else {
                        ctx.moveTo(x, fix(p.h));
                        ctx.lineTo(x, fix(p.y));
                        ctx.moveTo(x, fix(p.o));
                        ctx.lineTo(x, fix(p.l));
                        ctx.strokeRect(fix(p.x - hw), fix(p.y), w, h);
                    }
                }
            }
            ctx.stroke();
            ctx.fill();
            // when r = -1
            ctx.beginPath();
            ctx.strokeStyle = colorFall;
            ctx.fillStyle = colorFall;
            for (i = 0; i < len; i++) {
                p = list[i];
                if (p.r == -1) {
                    x = fix(p.x);
                    w = parseInt(width);
                    h = Math.max(parseInt(p.y - p.o), 1);
                    if (p.s == 1 || width == 1) {
                        ctx.moveTo(x, fix(p.h));
                        ctx.lineTo(x, fix(p.l));
                        if (width != 1) {
                            ctx.fillRect(parseInt(p.x - hw), parseInt(p.o), w, h);
                        }
                    } else {
                        ctx.moveTo(x, fix(p.h));
                        ctx.lineTo(x, fix(p.o));
                        ctx.moveTo(x, fix(p.y));
                        ctx.lineTo(x, fix(p.l));
                        ctx.strokeRect(fix(p.x - hw), fix(p.o), w, h);
                    }
                }
            }
            ctx.stroke();
            ctx.fill();
            fx = null;
            return area;
        },
        drawVDotLine:function(ctx, x, y1, y2, scale, space, lineColor, lineWidth){
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = lineColor;
            var temp1 = y2, temp2 = y2 - scale, unit = scale + space;
            while (temp1 > y1) {
                ctx.moveTo(x, temp2);
                ctx.lineTo(x, temp1);
                temp1 -= unit;
                temp2 -= unit;
                temp2 = temp2 < y1 ? y1 : temp2;
            }
            ctx.stroke();
        },
        drawCircle:function(ctx, ptCenter, radius, strokeColor, strokeWidth, fillColor){
            if(ctx && ptCenter){
                ctx.beginPath();
                ctx.arc(ptCenter.x, ptCenter.y, radius, 0, Math.PI * 2, false);
                if (fillColor) {
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                }
                if (strokeWidth > 0) {
                    ctx.lineWidth = strokeWidth;
                    ctx.strokeStyle = strokeColor;
                    ctx.stroke();
                }
                ctx.closePath();
            }
            ctx=null;ptCenter=null;
        },
        drawCircles:function(ctx, ptCenter, radius, strokeColor, strokeWidth, fillColor){
            if(ptCenter.length>0){
                var MPI=(Math.PI * 2);
                ctx.beginPath();
                for(var i=0;i<ptCenter.length;i++){
                    ctx.moveTo(ptCenter[i].x,ptCenter[i].y);
                    ctx.arc(ptCenter[i].x, ptCenter[i].y, radius, 0, MPI, false);
                }
                ctx.closePath();
                if (fillColor){
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                }
                if (strokeWidth > 0) {
                    ctx.lineWidth = strokeWidth;
                    ctx.strokeStyle = strokeColor;
                    ctx.stroke();
                }
                MPI=null;
            }
            ctx=null;ptCenter=null;
        },
        drawBubbles:function(ctx, ptCenter, radius, strokeColor, strokeWidth, fillColor,alpha){
            var gAlpha=(parseFloat(alpha)>=0 && parseFloat(alpha)<=1)?parseFloat(alpha):0.5;
            ctx.beginPath();
            ctx.arc(ptCenter.x, ptCenter.y, radius, 0, Math.PI * 2, false);
            ctx.globalAlpha=gAlpha;
            //ctx.globalCompositeOperation="lighter";
            if (fillColor){
                ctx.fillStyle = fillColor;
                ctx.fill();
            }
            if (strokeWidth > 0) {
                ctx.lineWidth = strokeWidth;
                ctx.strokeStyle = strokeColor;
                ctx.stroke();
            }
            ctx.closePath();
            MPI=null;ctx=null;ptCenter=null;
        },

        drawDotCircle:function(ctx, ptCenter, radius, scale, strokeColor, strokeWidth){
            var coordinate = [], length = Math.floor(Math.PI * 2 / (scale / radius));
            for (var i = 0; i <= length; i++) {
                coordinate[i] = [
                        ptCenter.x + radius * Math.cos(i * scale / radius),
                        ptCenter.y + radius * Math.sin(i * scale / radius)];
            }

            ctx.lineWidth = strokeWidth;
            ctx.strokeStyle = strokeColor;
            for (i = 0; i < length; i++) {
                if (i % 2 == 0) {
                    ctx.moveTo(coordinate[i][0], coordinate[i][1]);
                    ctx.lineTo(coordinate[i + 1][0], coordinate[i + 1][1]);
                }
            }
            ctx.stroke();
        },
        drawArc:function(ctx, ptCenter, radius, beginArc, endArc, strokeColor, strokeWidth, fillColor){
            ctx.moveTo(ptCenter.x,ptCenter.y);
            if (endArc < beginArc){
                var tmp = beginArc;
                beginArc = endArc;
                endArc = tmp;
            }
            if (endArc - beginArc>= Math.PI * 2){
                ctx.arc(ptCenter.x, ptCenter.y, radius, beginArc, (beginArc + endArc)/2, false);
                ctx.arc(ptCenter.x, ptCenter.y, radius, (beginArc + endArc)/2 - 0.0001, endArc, false);
            }
            else{
                ctx.arc(ptCenter.x, ptCenter.y, radius, beginArc, endArc, false);
            }
            if (fillColor) {
                ctx.fillStyle = fillColor;
                ctx.fill();
            }
            else {
                ctx.lineWidth = strokeWidth;
                ctx.strokeStyle = strokeColor;
                ctx.stroke();
            }
        },
        drawEclipse:function(ctx, ptCenter, xRadius, yRadius, lineColor,
                             lineWidth, fillColor){
            var a1=[];
            var a2=[];
            if (yRadius == 0){
                return;
            }
            for(var k = yRadius;k>=0;k -=0.5){
                a2.push(k);
                var tosq = xRadius*xRadius-xRadius*xRadius*k*k/(yRadius*yRadius);
                if(tosq<0){
                    tosq = 0;
                }
                a1.push(Math.sqrt(tosq));
            }
            var or = [ptCenter.x, ptCenter.y];
            ctx.moveTo(or[0] + a1[0], or[1] - a2[0]);
            for(var k  =0;k<a1.length;k++){
                ctx.lineTo(or[0]+a1[k],or[1]-a2[k]);
            }
            for(var k  =a1.length-1;k>=0;k--){
                ctx.lineTo(or[0]+a1[k],or[1]+a2[k]);
            }
            for(var k  =0;k<a1.length;k++){
                ctx.lineTo(or[0]-a1[k],or[1]+a2[k]);
            }
            for(var k  =a1.length-1;k>=0;k--){
                ctx.lineTo(or[0]-a1[k],or[1]-a2[k]);
            }
            if (fillColor) {
                ctx.fillStyle = fillColor;
                ctx.fill();
            }
            else {
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = lineColor;
                ctx.stroke();
            }
        },
        drawRectangle:function(ctx, ptLeftTop, width, height, strokeColor, strokeWidth, fillColor, autoAdjust){
            if(typeof(autoAdjust) == "undefined"){
                autoAdjust = true;
            }
            if (fillColor) {
                ctx.fillStyle = fillColor;
                if (autoAdjust) {
                    ctx.fillRect(parseInt(ptLeftTop.x), parseInt(ptLeftTop.y), parseInt(width), parseInt(height));
                }
                else {
                    ctx.fillRect(ptLeftTop.x, ptLeftTop.y, width, height);
                }
            }
            if (strokeWidth > 0) {
                ctx.lineWidth = strokeWidth;
                ctx.strokeStyle = strokeColor;
                if (autoAdjust) {
                    var adjust = strokeWidth / 2;
                    ctx.strokeRect(parseInt(ptLeftTop.x)+adjust, parseInt(ptLeftTop.y)+adjust, parseInt(width)-strokeWidth, parseInt(height)-strokeWidth);
                }
                else {
                    ctx.strokeRect(ptLeftTop.x, ptLeftTop.y, width, height);
                }
            }
        },
        drawPolyline:function(ctx, ptCollection, strokeWidth, strokeColor){
            ctx.lineWidth = strokeWidth;
            ctx.lineJoin = "round";
            ctx.strokeStyle = strokeColor;
            this.drawPath(ctx,ptCollection,false);
            ctx.stroke();
        },
        drawRectBar:function(ctx, ptCollection, strokeColor, strokeWidth, fillColor, autoAdjust){
            for(var i=0;i<ptCollection.length;i++){
                var pt=ptCollection[i];
                if (pt[3] < 0){
                    pt[1] = pt[1] + pt[3];
                    pt[3] = -pt[3];
                }
                if (pt[2] < 0){
                    pt[0] = pt[0] + pt[2];
                    pt[2] = -pt[2];
                }
                if(typeof(autoAdjust) == "undefined"){
                    autoAdjust = true;
                }
                if (fillColor) {
                    ctx.fillStyle = fillColor;
                    if (autoAdjust) {
                        ctx.fillRect(parseInt(pt[0]), parseInt(pt[1]), parseInt(pt[2]), parseInt(pt[3]));
                    }
                    else {
                        ctx.fillRect(pt[0], pt[1], pt[2], pt[3]);
                    }
                }
                if (strokeWidth > 0) {

                    ctx.lineWidth = strokeWidth;
                    ctx.strokeStyle = strokeColor;
                    if (autoAdjust) {
                        var adjust = strokeWidth / 2;
                        ctx.strokeRect(parseInt(pt[0])+adjust, parseInt(pt[1])+adjust, parseInt(pt[2])-strokeWidth, parseInt(pt[3])-strokeWidth);
                    }
                    else {
                        ctx.strokeRect(pt[0], pt[1], pt[2], pt[3]);
                    }
                }
            }
        },
        drawBar:function(ctx, ptCollection, strokeWidth, strokeColor, fillColor){
            ctx.beginPath();
            for (var i = 0; i < ptCollection.length; i+=4) {
                ctx.moveTo(ptCollection[i].x, ptCollection[i].y);
                ctx.lineTo(ptCollection[i+1].x, ptCollection[i+1].y);
                ctx.lineTo(ptCollection[i+2].x, ptCollection[i+2].y);
                ctx.lineTo(ptCollection[i+3].x, ptCollection[i+3].y);
            }
            ctx.closePath();
            if (fillColor) {
                ctx.fillStyle = fillColor;
                ctx.fill();
            }
            if (strokeWidth > 0) {
                ctx.lineWidth = strokeWidth;
                ctx.lineJoin = "round";
                ctx.strokeStyle = strokeColor;
                ctx.stroke();
            }
            ctx=null;ptCollection=null;
        },
        drawPolygon:function(ctx, ptCollection, strokeWidth, strokeColor, fillColor){
            this.drawPath(ctx,ptCollection,true);
            if (fillColor) {
                ctx.fillStyle = fillColor;
                ctx.fill();
            }
            if (strokeWidth > 0) {
                ctx.lineWidth = strokeWidth;
                ctx.lineJoin = "round";
                ctx.strokeStyle = strokeColor;
                ctx.stroke();
            }
        },
        drawPath:function(ctx, ptCollection, closePath){
            var len = ptCollection.length;
            var checkPoints=function(index){
                var re=null;
                for (var i = index; i < len; i++) {
                    if(typeof(ptCollection[i].y)=="number"){
                        re=i;
                        break;
                    }
                }
                return re;
            };
            ctx.beginPath();
            ctx.moveTo(ptCollection[0].x, ptCollection[0].y);
            for (var i = 1; i < len; i++) {
                if(typeof(ptCollection[i].y)=="number"){
                    ctx.lineTo(ptCollection[i].x, ptCollection[i].y);
                }
                else if(ptCollection[i].y==null){
                    var index=checkPoints(i);
                    if(index!=null){
                        ctx.moveTo(ptCollection[index].x, ptCollection[index].y);
                    }
                }

            }
            if (closePath) {
                ctx.closePath();
            }
        }
    };
    var CANVASCreate = {
        create:function(target_, postion_, left_, top_, width_, height_, bgColor_){
            function makeCanvas(width, height){
                var c = document.createElement('canvas');
                c.width = width;
                c.height = height;
                if (!c.getContext) {
                    c = window.G_vmlCanvasManager.initElement(c);
                }
                return c;
            }

            return $(makeCanvas(width_, height_)).css({
                "float":"left",
                "position": postion_,
                "left": left_,
                "top": top_,
                "width": width_,
                "height": height_,
                "background-color": bgColor_ ? bgColor_ : "transparent"
            }).appendTo(target_).get(0);
        },
        createDiv:function(target_, postion_, left_, top_, width_, height_){
            function makeDiv(width, height){
                var c = document.createElement('DIV');
                c.width = width;
                c.height = height;
                return c;
            }
            return $(makeDiv(width_, height_)).css({
                "float":"left",
                "position": postion_,
                "left": left_,
                "top": top_,
                "width": width_,
                "height": height_
            }).appendTo(target_).get(0);
        },
        resize:function(target_, width_, height_){
            target_.css({
                width:width_,
                height:height_
            });
            target_.each(function(){
                this.width = width_;
                this.height = height_;
            });
        }
    };
    /*************/
    var CR = SVGRenderer;
    var CE = SVGElement;
    var CT = SVGCreate;
    var ICON = {
        line : function( sPoint, ePoint, lineColor, lineWidth ) {
            return CE.line( sPoint, ePoint, lineColor, lineWidth );
        },
        rect : function( x, y, w, h,strokeColor, strokeWidth, fillColor ) {
            return CE.rect( x, y, w, h,strokeColor, strokeWidth, fillColor );
        },
        circle : function( ptCenter, radius, strokeColor, strokeWidth, fillColor, alpha ) {
            return CE.circle(ptCenter, radius, strokeColor, strokeWidth, fillColor, alpha);
        }
    };
    /*DRAW INTERFACE*/
    var Graphics = function( ctx ) {
        this.$ctx = ctx;
    };
    Graphics.prototype = {
        constructor : Graphics,
        createElement : function( tagName, attr ) {
            return CE.createElement(tagName, attr);
        },
        drawLine : function( ptStart, ptEnd, lineColor, lineWidth ) {
            return CR.drawLine(this.$ctx, ptStart, ptEnd, lineColor, lineWidth);
        },
        drawLines : function( lines, lineColor, lineWidth ) {
            CR.drawLines(this.$ctx, lines, lineColor, lineWidth );
        },
        drawRect : function( x, y, w, h, lineColor, lineWidth ) {
            return CR.drawRect(this.$ctx,x, y, w, h, lineColor, lineWidth);
        },
        drawPolygon : function( ptCollection, strokeWidth, strokeColor, fillColor ) {
            CR.drawPolygon(this.$ctx, ptCollection, strokeWidth, strokeColor, fillColor );
        },
        drawBar : function( ptCollection, strokeWidth, strokeColor, fillColor ) {
            CR.drawBar( this.$ctx, ptCollection, strokeWidth, strokeColor, fillColor );
        },
        drawRectBar : function() {},
        drawPolyline : function( ptCollection, strokeWidth, strokeColor ) {
            return CR.drawPolyline( this.$ctx, ptCollection, strokeWidth, strokeColor );
        },
        drawRectangle : function() {},
        drawEllipse : function( center, radiusPoint, strokeWidth, strokeColor, fillColor ) {
            return CR.drawEllipse( this.$ctx, center, radiusPoint, strokeWidth, strokeColor, fillColor );
        },
        drawArc : function(ptCenter, radius, beginArc, endArc, strokeColor, strokeWidth, fillColor, arcWidth) {
            CR.drawArc(this.$ctx, ptCenter, radius, beginArc, endArc, strokeColor, strokeWidth, fillColor, arcWidth);
        },
        drawBubbles : function( ptCenter, radius, strokeColor, strokeWidth, fillColor,alpha ) {
            CR.drawBubbles( this.$ctx, ptCenter, radius, strokeColor, strokeWidth, fillColor, alpha );
        },
        drawCircles : function(ptCenter, radius, strokeColor, strokeWidth, fillColor) {
            CR.drawCircles( this.$ctx, ptCenter, radius, strokeColor, strokeWidth, fillColor );
        },
        drawCircle : function( ptCenter, radius, strokeColor, strokeWidth, fillColor, alpha ) {
            CR.drawCircle(this.$ctx, ptCenter, radius, strokeColor, strokeWidth, fillColor, alpha);
        },
        drawVDotLine : function() {},
        drawCandlestick : function( list, width, lineColor, lineWidth, colorRise, colorFall ) {
            CR.drawCandlestick(this.$ctx, list, width, lineColor, lineWidth, colorRise, colorFall);
        },
        drawOHLC : function( list, lineColor, lineWidth ) {
            CR.drawOHLC( this.$ctx, list, lineColor, lineWidth );
        },
        drawGradient : function( color, top, bottom, divisionColor, minPos ) {
            return CR.drawGradient(this.$ctx, color, top, bottom, divisionColor, minPos );
        },
        drawText : function( text, x, y ) {
            return CR.drawText(this.$ctx, text, x, y);
        },
        clear : function() {
            CR.clear(this.$ctx);
        }
    };
    /***************/
    var __calGridCount = function( size, gridW ) {
        var count = 2;
        if( gridW == UNDEFINED ) {
            gridW = 100;
        };
        return Math.round( size / gridW );
    };
    var __calLabelWH = function( text_, css_ ) {
        var testDiv = $("<div></div>").html(text_).css({
            position: "absolute",
            font: "normal 10px Arial, Helvetica, sans-serif",
            overflow: "hidden"
        });
        if( css_ ) {
            testDiv.css(css_);
        }
        testDiv.appendTo('body');
        var selfWidth = testDiv.width();
        var selfHeight = testDiv.height();
        testDiv.remove();
        return {
            w : selfWidth,
            h : selfHeight
        };
    };
    var __calLabelPosition = function( obj, size, type, cdn ) {
        var p = {};
        switch( type ) {
            case "left" :
                p = {
                    sx : cdn[0],
                    y : cdn[3]+obj.h,
                    ex : cdn[0]+obj.w
                }
                break;
            case "center" :
                p = {
                    sx : (size - obj.w) * 0.5 + cdn[0],
                    y : cdn[3]+obj.h,
                    ex : (size - obj.w) * 0.5 + cdn[0]+obj.w
                };
                break;
            case "right" :
                p = {
                    sx : cdn[0]-obj.w,
                    y : cdn[3]+obj.h,
                    ex : cdn[0]
                };
                break;
        };
        return p;
    };
    var __isXOverlay = function( p ) {
            var temp = null
                , oldT = null
                , flg = false
                , arr = []
                ;
            for( var i = 1; i < p.length; i++ ) {
                if( !flg ) {
                    oldT = p[i-1];
                }
                temp = p[i];
                if( temp.sx >= oldT.ex ) {
                    flg = false;
                }else{
                    flg = true;
                    arr.push(i);
                }
            };
            return arr;
        },
        __filterXLabel = function( labels, hideIndex, align ) {
            var lastLabel = labels[labels.length-1];
            var lastSLabel = labels[labels.length-2];
            var lx = Number(lastLabel.attr("x"));
            var lsx = Number(lastSLabel.attr("x"));
            if( (lsx+lastSLabel.width()) > lx ) {
                if( align == "center" ) {
                    hideIndex = 1;
                };
                if( hideIndex == 1 ) {
                    lastLabel.hide();
                }else{
                    lastSLabel.hide();
                }
            }
        };
    var __mappingXLine = function( axis, pointer ) {
            var lines = []
                , gridX = []
                , xGap = []
                , ca = axis.calibration
                , mapping = axis.mapping
                , position = axis.position
                , i = 0
                , left = 0
                , CO = getChartObj(pointer)
                , w = CO.LEFT+CO.CHARTWIDTH
                , y = CO.CHARTHEIGHT
                , shortLine = axis.shortLine
                ;

            if( position == 1 ) {
                lines.push([CO.LEFT, axis.width, w, axis.width]);
            }else{
                lines.push([CO.LEFT, y, w, y]);
                for( ; i < ca.length; i++ ) {
                    left = mapping.getCoordinate(ca[i][0]);
                    lines.push([left, y - shortLine / 2, left, y + shortLine / 2]);
                    gridX.push([left, CO.TOP, left, y]);
                    if( i != 0 ){
                        xGap.push(left-gridX[i-1][0]);
                    }
                    if( i == (ca.length-1) ) {
                        xGap.push(-1);
                    }
                }
            }
            return {xlines : lines, gridX : gridX, xGap : xGap};
        },
        __mappingYLine = function( axis, pointer ) {
            var lines = []
                , gridY = []
                , yGap = []
                , ca = axis.calibration
                , mapping = axis.mapping
                , position = axis.position
                , i = 0
                , top = 0
                , CO = getChartObj(pointer)
                , w = CO.LEFT+CO.CHARTWIDTH
                , h = CO.CHARTHEIGHT + CO.TOP
                , shortLine = axis.shortLine
                ;

            if( position == 1 ) {
                lines.push([CO.LEFT, CO.TOP, CO.LEFT, h]);
                for( ; i < ca.length; i++ ) {
                    top = mapping.getCoordinate(ca[i][0]);
                    top = top >= h ? h - 0.5 : top;
                    lines.push([CO.LEFT - shortLine, top, CO.LEFT, top]);
                    gridY.push([CO.LEFT,top, w, top]);
                    if( i != 0 ){
                        yGap.push(gridY[i-1][1] - top);
                    }
                    if( i == (ca.length-1) ) {
                        yGap.push(-1);
                    }
                }
            }else{
                i = 0;
                lines.push([CO.LEFT, CO.TOP, CO.LEFT, h]);
                for( ; i < ca.length; i++ ) {
                    top = mapping.getCoordinate(ca[i][0]);
                    top = top >= h ? h - 0.5 : top;
                    lines.push([w, top, w + shortLine, top]);
                    gridY.push([CO.LEFT,top, w, top]);
                }
                if( i != 0 ){
                    yGap.push(gridY[i-1][1] - top);
                }
                if( i == (ca.length-1) ) {
                    yGap.push(-1);
                }
            }
            return {ylines : lines, gridY : gridY, yGap : yGap}
        };
    /*Components*/
    var Components = {};
    Components.Legend = function( container, pointer ) {
        var _container = container.find("svg");
        this.$pointer = pointer;
        var self = this;
        this.getSubId = function() {
            return this.$pointer;
        };
        var rootContainer = CT.createGroup( _container, "chart-legend" );
        var __adpterOp = function( data ) {
            var d = [];
            for( var i = 0; i < data.length; i++ ) {
                if( $.isArray(data[i]) ) {
                    d.push({
                        color : data[i][2],
                        text : data[i][0],
                        id : data[i][0],
                        value : data[i][1]
                    });
                }else{
                    d.push({
                        color : data[i].style.lineColor == undefined ? data[i].style.fillColor : data[i].style.lineColor,
                        text : data[i].name,
                        id : data[i].dataId
                    });
                }
            }
            return d;
        };
        var drawCommLegend = function( op, dt ) {
            var g =  CT.createGroup( rootContainer, "chart-legend-item" );
            var icon = null;
            var tx = 0;
            var tobj = __calLabelWH(dt.text, op.css);
            var left = 0, top = 0;
            if( op.icon.type == "circle" ) {
                icon = CE.circle({x : op.icon.radius, y : tobj.h*0.5}, op.icon.radius, "", 0, dt.color);
                tx = op.icon.radius*2+5;
            }else if(op.icon.type == "rect"){
                icon = CE.rect(0, 0, op.icon.width, op.icon.height, "", 0, dt.color, 0);
                tx = op.icon.width + 5;
            }
            left = tx + tobj.w;
            top = tobj.h;
            var text = CR.drawText(g, dt.text, tx, tobj.h*0.8);
            $(text).attr("fill",dt.color);
            if(op.valueWidth != undefined && op.valueWidth != 0) {
                var valueText = dt.value ? dt.value : "0.00" ;
                var value = CR.drawText(g, valueText, left+5, tobj.h*0.8);
                $(value).attr("class", dt.id).attr("fill",dt.color);
            }
            g.appendChild(icon);
            $(g).css(op.css)
            return {
                g : g,
                l : left,
                t : top
            };
        };
        var drawLegend = function( op, dt ) {
            var obj = null;
            if( op.Items != undefined ) {
                obj = drawCusLegend(op, dt);
            }else{
                obj = drawCommLegend(op,dt);
            }
            return obj;
        };
        var drawCusLegend = function( op, dt ) {
            var g =  CT.createGroup( rootContainer, "chart-legend-item" );
            /*
             * id: "", color : "", text : [], icon : { type : "rect",width : 5,height : 5}
             */
            var icon = null;
            var tx = 0;
            var txW = 0, txH = 0;
            var left = 0, top = 0;
            for( var i = 0; i < dt.text.length; i++ ) {
                var temp = dt.text[i];
                var tobj = __calLabelWH(temp.label, temp.labelClass);
                txW += tobj.w;
                if( txH < tobj.h ) {
                    txH = tobj.h;
                }
            };
            var iconObj = dt.icon;
            if(iconObj != null ) {
                if( iconObj.type == "circle" ) {
                    icon = CE.circle({x : iconObj.radius, y : txH*0.5}, iconObj.radius, "", 0, dt.color);
                    tx = iconObj.radius*2+5;
                }else if(iconObj.type == "rect"){
                    var y = 0;
                    if( (txH-iconObj.height) > 0 ) {
                        y = (txH-iconObj.height)*0.5;
                    }
                    icon = CE.rect(0, y, iconObj.width, iconObj.height, "", 0, dt.color, 0);
                    tx = iconObj.width + 5;
                }
                g.appendChild(icon);
            }
            var tw = 0;
            for( var i = 0; i < dt.text.length; i++ ) {
                var temp = dt.text[i];
                var tobj = __calLabelWH(temp.label, temp.labelClass);
                var text = CR.drawText(g, temp.label, tx+tw, tobj.h*0.8);
                $(text).css(temp.labelClass).attr("class", temp.className);
                tw += tobj.w;
            };
            left = tx + txW;
            top = txH;
            if(op.css) {
                $(g).css(op.css);
            }
            return {
                g : g,
                l : left,
                t : top
            };
        };
        var calTopPosition = function(gs) {
            var left = 0, h = 0;
            var op = self.options;
            if( op.valueWidth == undefined ) {
                op.valueWidth = 0;
            }
            for( var i = 0; i < gs.length; i++ ) {
                if( i != 0 ) {
                    left = left + op.valueWidth;
                    var g = gs[i].g;
                    $(g).attr({
                        transform:"translate("+left+",0)"
                    });
                }
                left += gs[i].l + 10;
            }
            var w = 0;
            if( op.align == "center" ) {
                w = (_container.width() - left) * 0.5 - 5*(i);
                if( w < 0 ) {
                    w = 0;
                }
            };
            if( op.padding && op.padding.left ) {
                w += op.padding.left;
            }
            if( op.padding && op.padding.top ) {
                h += op.padding.top;
            }
            $(rootContainer).attr("transform", "translate("+w+", "+h+")");
        };
        var calRightPosition = function( gs ) {
            var CO = getChartObj(pointer);
            var top = 0;
            var maxWidth = 0;
            var op = self.options;
            if( op.valueWidth == undefined ) {
                op.valueWidth = 0;
            }
            for( var i = 0; i < gs.length; i++ ) {
                if( i != 0 ) {
                    var g = gs[i].g;
                    $(g).attr({
                        transform:"translate(0,"+top+")"
                    });
                }
                top += gs[i].t + 10;
                if( maxWidth < gs[i].l ) {
                    maxWidth = gs[i].l;
                }
            }
            var left = container.width()  - op.valueWidth - op.width;
            var h = 0;
            if( op.align == "center" ) {
                h = (_container.height() - top) * 0.5;
            };
            if( op.padding && op.padding.left ) {
                left += op.padding.left;
            }
            if( op.padding && op.padding.top ) {
                h += op.padding.top;
            }
            $(rootContainer).attr("transform", "translate("+left+", "+h+")");
        };
        var tPosition = function( gs, direction ) {
            switch( direction ) {
                case "top":
                    calTopPosition(gs);
                    break;
                case "left":
                    break;
                case "right":
                    calRightPosition(gs);
                    break;
                case "bottom":
                    break;
            };
        };
        this.setOptions = function( op ) {
            this.options = op.Legend;
            this.data = op.charts || op.data;
            if( op.type == "radar" ) {
                this.data = op.chart.style;
            }
        };
        this.draw = function() {
            var op = this.options;
            var d = __adpterOp(this.data);
            if( op.Items ) {
                d = op.Items;
            }
            var gs = [];
            for( var i = 0; i < d.length; i++ ) {
                var obj = drawLegend(op, d[i]);
                gs.push(obj);
            }
            tPosition(gs, this.options.position);
        };
        Publisher.subscribe("setOptions", function( op ){
            self.setOptions( op );
        }, self);
        Publisher.subscribe("draw", function(){
            self.draw();
        }, self);
    };
    Components.ToolTips = function(container, pointer) {
        this.$pointer = pointer;
        var self = this;
        this.$container = container;
        var createHolder = function() {
            var chartObj = getChartObj(pointer);
            var DIV = '<div class="chartTooltips-div" style="position:absolute;"></div>';
            $(DIV).css({
                "left" : chartObj.LEFT + chartObj.ROOTLEFT,
                "top" : chartObj.TOP+chartObj.ROOTTOP,
                "width" : chartObj.CHARTWIDTH,
                "height" : chartObj.CHARTHEIGHT
            }).appendTo(self.$container);
        };
        this.getSubId = function() {
            return this.$pointer;
        };
        this.setOptions = function( op ) {
            this.options = op.ToolTips;
        };
        this.draw = function() {
            var container = $(this.$container.find(".chartTooltips-div")[0]);
            if( container.length == 0 ) {
                createHolder();
            }
        };
        this.handleMouseData = function( data ) {
            var op = this.options;
            if( $.isFunction(op.callback) ) {
                op.callback(data, this.$container);
            }
        };
        Publisher.subscribe("setOptions", function( op ){
            self.setOptions( op );
        }, self);
        Publisher.subscribe("draw", function(){
            self.draw();
        }, self);
        Publisher.subscribe("publishMouseData", function( data ){
            self.handleMouseData(data);
        }, self);
    };
    Components.CrossHair = function( container, pointer ) {
        var chartObj = getChartObj(pointer);
        var DIV = '<div class="chartCrossHair-div" style="position:absolute;"></div>';
        $(DIV).css({
            "left" : chartObj.LEFT + chartObj.ROOTLEFT,
            "top" : chartObj.TOP+chartObj.ROOTTOP,
            "width" : chartObj.CHARTWIDTH,
            "height" : chartObj.CHARTHEIGHT
        }).appendTo(container);
        this.$pointer = pointer;
        this._container = container.find(".chartCrossHair-div");
        this._range = undefined;
        this._xHolder = null;
        this._yHolder = null;
        this._xShow = true;
        this._yShow = false;
        this._locked = false;
        this._lineColor = "#000000";
        this._lineWidth = 1;
        var self = this;
        Publisher.subscribe("setOptions", function( op ){
            self.setOptions( op );
        }, self);
        Publisher.subscribe("draw", function(){
            self.draw();
        }, self);
        Publisher.subscribe("publishMouseData", function( data ){
            self.setPosition(data.s[0]);
        }, self);
        Publisher.subscribe("setHightLight", function( arg ) {
            var index = arg.index;
            var pt = arg.pt[index];
            var obj = {};
            obj.x = pt.x;
            obj.y = pt.y;
            obj.style = {};
            obj.style.fillColor = arg.style.fillColor;
            self.setPosition( obj );
        }, this);
    };
    Components.CrossHair.prototype = {
        getSubId : function() {
            return this.$pointer;
        },
        _initialize: function(obj){
            var self = this;
            var left = 0, width = this._container.width(),
                top = 0, height = this._container.height(),sh, bottom = 0;
            if(height == 0){
                height = this._container.height();
            }
            if(this._range){
                if(this._range.left){
                    left = this._range.left;
                }
                if(this._range.top){
                    top = this._range.top;
                }
                if(this._range.width){
                    width = this._range.width;
                }
                if(this._range.height){
                    height = this._range.height;
                }
                if(this._range.bottom){
                    bottom = this._range.bottom;
                }
            }

            this._left = left;
            this._top = top;
            var lineStyle = this._lineWidth + 'px solid ' + "#777777";
            if(typeof(obj) === "object"){
                sh = $.extend({crossX:true,crossY:true},obj);
            }else{
                sh = {crossX:true,crossY:true};
            }
            if(sh.crossY){
                this._crossYStyle = {
                    position: "absolute",
                    width: "0px",
                    height: height,
                    "border-left": lineStyle,
                    "overflow": "hidden",
                    "top": top
                };
                this._crossYHtmlStyle = {
                    position: "absolute",
                    "display": "none",
                    "top": 0
                };
                this._xHolder = $("<div></div>").css(this._crossYStyle).appendTo(this._container);
                this._xHtmlHolder = $("<div class='MSChart_xCrossHairDiv'></div>").css(this._crossYHtmlStyle).appendTo(this._container);
            }
            if (sh.crossX) {
                this._crossXStyle = {
                    position: "absolute",
                    height: "0px",
                    width: width,
                    "border-top": lineStyle,
                    "overflow": "hidden",
                    "left": left
                };
                this._crossXHtmlStyle = {
                    position: "absolute",
                    "display": "none",
                    "left": left
                };
                this._yHolder = $("<div></div>").css(this._crossXStyle).appendTo(this._container);
                this._yHtmlHolder = $("<div class='MSChart_yCrossHairDiv'></div>").css(this._crossXHtmlStyle).appendTo(this._container);
            }
            this.hide();
        },
        draw: function(){
            var obj = this.options;
            this._initialize(obj);
            return this;
        },
        setLineColor: function(color){
            this._lineColor = $.color.parse(color).toString();
            return this;
        },
        setLineWidth: function(width){
            this._lineWidth = width;
            return this;
        },
        setPosition: function(p){
            var chartObj = getChartObj(this.$pointer);
            if(p && !this._locked){
                if (p.x && typeof(p.x) === "number" && this._xHolder && this._xShow) {
                    if (p.x < chartObj.LEFT) {
                        p.x = chartObj.LEFT;
                    };
                    var lineStyle = this._lineWidth + 'px solid ' + p.style.fillColor;
                    var css = {
                        left: p.x - 1 - chartObj.LEFT,
                        "border-left": lineStyle
                    };
                    if (p.crossY) {
                        if (typeof(p.crossY.height) === "number") {
                            css.height = p.crossY.height;
                        }
                        if (typeof(p.crossY.top) === "number") {
                            css.top = p.crossY.top;
                        }
                    }
                    this._xHolder.show().css(css);
                    if((p.x + this._xHtmlHolder.width()) > this._container.width()){
                        css = {
                            left: this._container.width() - this._xHtmlHolder.width()
                        };
                    }
                    if($.isFunction(this.options.xcontent)){
                        var htm = this.options.xcontent(p);
                        this._xHtmlHolder.html(htm).show().css(css);
                    }
                }
                if(p.y&&typeof(p.y) === "number" && this._yHolder && this._yShow){
                    if (p.y < chartObj.ROOTTOP) {
                        p.y=chartObj.ROOTTOP;
                    }
                    var css={top:p.y-1};
                    if (p.crossX) {
                        if (typeof(p.crossX.width) === "number") {
                            css.width = p.crossX.width;
                        }
                        if (typeof(p.crossX.left) === "number") {
                            css.left = p.crossX.left;
                        }
                    }
                    this._yHolder.show().css(css);
                    this._yHtmlHolder.show().css(css);
                }
            }
            return this;
        },
        setOptions : function( options ) {
            this.options = options;
        },
        hide: function(){
            if (this._xHolder) {
                this._xHolder.hide();
                this._xHtmlHolder.hide();
            }
            if (this._yHolder) {
                this._yHolder.hide();
                this._yHtmlHolder.hide();
            }
            return this;
        },
        show: function(){
            if (this._xHolder) {
                this._xHolder.show();
            }
            if (this._yHolder) {
                this._yHolder.show();
            }
            return this;
        },
        setLock: function(lock){
            this._locked = lock;
            return this;
        },
        reSetCross:function(attr){
            if(this._xHolder){
                this._xShow = true;
                if(attr.crossY === false){
                    this._xShow = false;
                }
                this._xHolder.css({"border-left": attr.option.lineWidth + 'px solid ' + attr.option.lineColor});
            }
            if(this._yHolder){
                this._yShow = true;
                if(attr.crossX === false){
                    this._yShow = false;
                }
                this._yHolder.css({"border-top": attr.option.lineWidth + 'px solid ' + attr.option.lineColor});
            }
            return this;
        }
    };
    Components.TrackingBall = function( container, pointer ) {
        this.$pointer = pointer;
        var self = this;
        this.target = container.find("svg")[0];
        var init = function() {
            var chartObj = getChartObj(pointer);
            var w = chartObj.CHARTWIDTH;
            var h = chartObj.CHARTHEIGHT;
            var g = CT.createGroup(self.target, "chart-trackingball");
            $(g).attr("transform", "translate("+chartObj.ROOTLEFT+", "+chartObj.ROOTTOP+")");
            return g;
        };
        this.getSubId = function() {
            return this.$pointer;
        };
        this.setOptions = function( op ) {
            var defaultOp = {
                type : 0,
                radius : 6,
                color:"#666666"
            };
            this.options = $.extend(true, {}, defaultOp, op.TrackingBall);
        }
        this.draw = function() {
            var g = init();
            var circle = CE.circle({x:0,y:0}, (this.options.radius), "", "", JColor.parse(this.options.color).toString(), 1);
            g.appendChild(circle);
            circle.setAttribute("class", "chart-trackingBubble");
            this.symbols = $(this.target).find(".chart-trackingBubble").hide();
        };
        this.setPosition = function( data ) {
            var p = data.s == undefined ? data : data.s[0];
            if(p){
                if(p.x&&typeof(p.x)=="number" || p.x == 0){
                    var l = p.x - (this.options.radius/2) * 0.1;
                    $(this.target).find(".chart-trackingBubble").attr({
                        "cx": l,
                        "fill" : JColor.parse(p.style.fillColor).toString()
                    }).show();
                }
                if(p.y&&typeof(p.y)=="number"){
                    if(p.y>$(this.target).height()||p.y<0){
                        //this.hide();
                        return;
                    }
                    var t = p.y + (this.options.radius/2) * 0.1;
                    $(this.target).find(".chart-trackingBubble").attr("cy",t).show();
                }
            }
        }
        Publisher.subscribe("setOptions", function( op ){
            self.setOptions( op );
        }, self);
        Publisher.subscribe("draw", function(){
            self.draw();
        }, self);
        Publisher.subscribe("publishMouseData", function( data ){
            self.setPosition(data);
        }, self);
        Publisher.subscribe("setHightLight", function( arg ) {
            var index = arg.index;
            var pt = arg.pt[index];
            var obj = {};
            obj.x = pt.x;
            obj.y = pt.y;
            obj.style = {};
            obj.style.fillColor = arg.style.fillColor;
            self.setPosition( obj );
        }, this);
    };
    Components.Annotation = function( container, pointer ) {
        this.$container = container;
        this.$pointer = pointer;
        var self = this;
        var _container = container.find("svg");
        var catx = CT.createGroup(_container, "annotationGroup");
        var chartObj = getChartObj(pointer);
        $(catx).attr({
            "transform": "translate("+(chartObj.ROOTLEFT+chartObj.LEFT)+","+chartObj.ROOTTOP+") scale(1 1)"
        });
        this.$ctx = new Graphics(catx);
        var self = this;
        var Note = function( oFahter, pt, nCount ) {
            this.tar = oFahter;
            this.dom=null;
            this.segmentDom={counter:null,title:null,text:null,bottom:null,middle:null,handle:null,counter:null};
            this.drag={drag:false,d:{x:0,y:0},off:{x:0,y:0}};
            this.clickPos={x:0,y:0};
            this.changeSize=false;
            this.isFocus = false;
            this.domBeforeHide={w:100,h:42,hide:false};
            this.changeSizeDelay = null;
            this.mouseoutDelay = null;
            this.mouseoverDelay = null;
            this.haveDrag = false;
            this._NoteTextCount = nCount;
            this.init(pt);
        };
        Note.prototype = {
            init:function(pt){
                this.dom =$("<div class='qs-note-flot qs-note-flot-background' ><div class='qs-note-title'><a style='float:left' class='qs-note-abb'>NOTE</a><span class='qs-note-max-count'></span><a class='hideable qs-note-close' style='float:right'></a><a class='qs-note-minimize hideable' style='float:right'></a></div><div class='qs-note-middle hideable'><textarea class='qs-note-text-input'></textarea><div class='qs-note-pos-handle'>&nbsp;</div></div></div>");
                this.setPosition(pt.x, pt.y);
                this.tar.append(this.dom);
                this.segmentDom.title = this.dom.find(".qs-note-title");
                this.segmentDom.abb = this.dom.find(".qs-note-abb");
                this.segmentDom.text = this.dom.find(".qs-note-text-input");
                this.segmentDom.middle = this.dom.find(".qs-note-middle");
                this.segmentDom.handle = this.dom.find(".qs-note-pos-handle");
                this.segmentDom.counter = this.dom.find(".qs-note-max-count");
                this._bindEvent();
                this.dom.show();
            },
            setPosition:function(x,y){
                this.drag.d={x:x,y:y};
                this.dom.css({left: x + "px",top: y + "px"});
            },
            unBindEvent:function(){
                if(typeof(this)!="undefined" && this !=null&&typeof(this.dom)!="undefined" && this.dom !=null){
                    this.segmentDom.text.unbind(".qs-note-flot-self");
                    this.dom.unbind(".qs-note-flot-self");
                    this.dom.remove();
                }
            },
            _bindEvent:function(){
                this._textChange();//Calculate the number of characters
                this._mouseDown();//mouse click the note
                this._mouseClick();
                this._inputBlur();//note will hide,only show the text
                this._inputSelect();//note focus
                this._mouseOut();
                this._mouseOver();
            },
            _textChange:function(){
                var sf = this;
                this.segmentDom.text.unbind("keydown.qs-note-flot").bind("keydown.qs-note-flot",function(e){
                    if(sf.isFocus){
                        var t = this;
                        setTimeout(function(){
                            var len = t.value.length;
                            if (len <= sf._NoteTextCount) {
                                sf.segmentDom.counter.show();
                                sf.segmentDom.counter.html((sf._NoteTextCount-len) + " char left");
                                sf.segmentDom.abb.hide();
                            } else {
                                t.value = t.value.substr(0, sf._NoteTextCount);
                            }
                        }, 200)
                    }
                });
            },
            _mouseDown:function(){
                var sf = this;
                var evtName = mouseDownEvent+".qs-note-flot-self";
                this.dom.unbind(evtName).bind(evtName,function(e){
                    var tar = $(e.target);
                    var e = _returnData(e);
                    sf.clickPos={x:sf.dom.offset().left,y:sf.dom.offset().top};
                    sf.haveDrag = false;
                    if(tar.hasClass("qs-note-title")||tar.hasClass("qs-note-max-count")){ //click the title ,move
                        sf.drag.drag = true;
                        sf.drag.off.x = sf.dom.position().left-e.pageX;
                        sf.drag.off.y = sf.dom.position().top-e.pageY;
                        sf.segmentDom.title.css("cursor","move");
                        sf._mouseMove();
                        sf._mouseUp();
                    }else if(tar.hasClass("qs-note-pos-handle")){//change note's size
                        sf.changeSize = true;
                        sf._mouseMove();
                        sf._mouseUp();
                    }
                    sf.tar.find(".qs-note-flot").css("z-index",100);
                    sf.dom.css("z-index",101);
                })
            },
            _mouseClick:function(){
                var sf = this;
                this.dom.unbind("click.qs-note-flot-self").bind("click.qs-note-flot-self",function(e){
                    var tar = $(e.target);
                    if(tar.hasClass("qs-note-minimize")){//minimize
                        sf.segmentDom.abb.html("NOTE");
                        sf.domBeforeHide = {w: sf.dom.width(),h:sf.dom.height(),hide:true};
                        sf.dom.find(".hideable").hide();
                        sf.dom.css({width:"auto",height:"auto"});
                        sf.segmentDom.abb.show();
                        sf.segmentDom.counter.hide();
                    }else if(tar.hasClass("qs-note-abb")){ //restore
                        if(sf.domBeforeHide.hide){
                            sf.dom.find(".hideable").show();
                            sf.segmentDom.abb.hide();
                            sf.segmentDom.counter.show();
                            sf.segmentDom.counter.html(100-sf.segmentDom.text.val().length + " char left");
                            sf.dom.css({width:sf.domBeforeHide.w,height:sf.domBeforeHide.h});
                            sf.domBeforeHide.hide=false;
                        }
                    }else if(tar.hasClass("qs-note-close")){//close
                        sf.unBindEvent();
                    }
                })
            },
            _mouseMove:function(){
                var sf = this;
                var tx=0,ty=0,dx=0,dy=0;
                var evtName = mouseMoveEvent+".qs-note-flot";
                $(document.body).unbind(evtName).bind(evtName,function(e){
                    e = _returnData(e);
                    var dg = sf.drag;
                    if(dg.drag){
                        dx=e.pageX+dg.off.x,dy=e.pageY+dg.off.y;
                        if((dx)<0){dx=0;
                            //dg.off.x = e.pageX;
                        }
                        if((dy)<0){dy=0;}
                        if((dx+sf.domBeforeHide.w)>sf.tar.width()){
                            dx = sf.tar.width()-sf.domBeforeHide.w;
                        }
                        if((dy+sf.domBeforeHide.h)>sf.tar.height()){dy = sf.tar.height()-sf.domBeforeHide.h;}
                        sf.dom.css({left:dx+"px",top:dy+"px"});
                    }else if(sf.changeSize){
                        tx = e.pageX-sf.clickPos.x,ty=e.pageY-sf.clickPos.y;
                        clearTimeout(sf.changeSizeDelay);
                        setTimeout(function(){
                            if(tx<90){tx=90;}
                            if(tx>400){tx=400;}
                            if(ty<26){ty=26;}
                            if(ty>180){ty=180;}
                            sf.dom.css({width:tx,height:ty});
                            sf.segmentDom.middle.css({height:ty-12});
                            sf.segmentDom.text.css({height:ty-12});
                        },10);
                    }

                })
            },
            _inputBlur:function(){
                var sf = this;
                this.segmentDom.text.unbind("blur.qs-note-flot-self").bind("blur.qs-note-flot-self",function(){
                    sf.isFocus = false;
                    //sf._titleHide(sf);
                    //sf.dom.find(".hideable").hide();
                })
            },
            _inputSelect:function(){
                var sf = this;
                this.segmentDom.text.unbind("focus.qs-note-flot-self").bind("focus.qs-note-flot-self",function(){
                    sf.isFocus = true;
                    //sf.dom.find(".hideable").show();
                    //sf._titleShow(sf);
                })
            },
            _mouseUp:function(){
                var sf = this;
                var evtName = mouseUpEvent+".qs-note-flot";
                var mEvt = mouseMoveEvent+".qs-note-flot";
                $(document.body).unbind(evtName).one(evtName,function(e){
                    if(sf.drag.drag){
                        sf.drag.drag=false;
                    }
                    if(sf.changeSize){
                        sf.changeSize= false;
                        sf.haveDrag = true;
                        sf.domBeforeHide.w=sf.dom.width();
                        sf.domBeforeHide.h=sf.dom.height();
                    }
                    $(document.body).unbind(mEvt);
                })
            },
            _mouseOut:function(){
                var cname = "",sf=this;
                this.dom.bind("mouseleave.qs-note-flot-self",function(e){
                    clearTimeout(sf.mouseoutDelay);
                    clearTimeout(sf.mouseoverDelay);
                    sf.mouseoutDelay = setTimeout(function(){
                        if (sf.dom.hasClass("qs-note-flot-background")&&sf.segmentDom.text.val().length>0) {
                            sf._titleHide(sf);
                        }
                    },500);
                    if(sf.haveDrag){
                        sf.haveDrag =false;
                    }
                });
            },
            _mouseOver: function(){
                var sf = this;
                this.segmentDom.middle.unbind("mouseover.qs-note-flot-self").bind("mouseover.qs-note-flot-self", function(e){
                    if (!sf.dom.hasClass("qs-note-flot-background")&&!sf.domBeforeHide.hide) {
                        clearTimeout(sf.mouseoverDelay);
                        clearTimeout(sf.mouseoutDelay);
                        sf.mouseoverDelay = setTimeout(function(){
                            sf._titleShow(sf);
                        }, 500);
                    }
                });
            },
            _titleShow:function(sf){
                sf.segmentDom.title.css("visibility","visible");
                sf.segmentDom.handle.css("visibility","visible");
                sf.segmentDom.text.removeClass("qs-note-text-input-blur");
                sf.dom.css({top:sf.dom.position().top - 1,left:sf.dom.position().left - 1})
                sf.dom.addClass("qs-note-flot-background");
            },
            _titleHide: function(sf){
                sf.dom.css({top:sf.dom.position().top + 1,left:sf.dom.position().left + 1})
                sf.segmentDom.title.css("visibility","hidden");
                sf.segmentDom.text.blur();
                sf.segmentDom.text.addClass("qs-note-text-input-blur");
                sf.dom.removeClass("qs-note-flot-background");
                sf.segmentDom.handle.css("visibility","hidden");
            }
        };
        var createContainer = function() {
            var chartObj = getChartObj(pointer);
            var DIV = '<div class="chartAnnotation-div" style="position:absolute;"></div>';
            $(DIV).css({
                "left" : chartObj.LEFT + chartObj.ROOTLEFT,
                "top" : chartObj.TOP+chartObj.ROOTTOP,
                "width" : chartObj.CHARTWIDTH,
                "height" : chartObj.CHARTHEIGHT
            }).appendTo(self.$container);
        };
        var removeContainer = function() {
            self.$container.find(".chartAnnotation-div").remove();
        };
        var bindEvent = function(funs) {
            var target = null;
            Events.bindEvent(container, ".chartAnnotation-div", "mousedown", function( c, e ){
                var ev = getPosition($(c), e);
                funs[0](ev);
            });
            Events.bindEvent(container, ".chartAnnotation-div", "mousemove", function( c, e ){
                var ev = getPosition($(c), e);
                funs[1](ev);
            });
            Events.bindEvent(container, ".chartAnnotation-div", "mouseup", function( c, e ){
                var ev = getPosition($(c), e);
                funs[2](ev);
            });
        };
        this.getSubId = function() {
            return this.$pointer;
        };
        this.setOptions = function( options ) {
            this.options = options;
        };
        this.drawLine = function( arg ) {
            removeContainer();
            createContainer();
            var ctx = self.$ctx;
            var startPoint = null;
            var lineEl = null;
            bindEvent([function( e ){
                var s = {
                    x : e.x,
                    y : e.y
                };
                startPoint = s;
                // ctx.drawLine( s, e, "#ccc", 1 );
            },function(e){
                if( startPoint != null ) {
                    //ctx.clear();
                    if( lineEl == null ) {
                        lineEl = ctx.drawLine( startPoint, e, "#f30", 1 );
                    }else{
                        $(lineEl).attr({
                            "x2" : e.x,
                            "y2" : e.y
                        });
                    }
                }
            }, function(e){
                lineEl = null;
                startPoint = null;
                if( arg != undefined && $.isFunction( arg.cb ) ) {
                    arg.cb();
                }
            }]);
        };
        this.drawRect = function( arg ) {
            removeContainer();
            createContainer();
            var ctx = self.$ctx;
            var startPoint = null;
            var rectEl = null;
            bindEvent([function( e ){
                var s = {
                    x : e.x,
                    y : e.y
                };
                startPoint = s;
            },function(e){
                var end = e;
                if( startPoint != null ) {
                    //ctx.clear();
                    var w = end.x - startPoint.x;
                    var h = end.y - startPoint.y;
                    if( h >= 0) {
                        if( w > 0 ) {
                            if( rectEl == null ) {
                                rectEl = ctx.drawRect( startPoint.x, startPoint.y, w, h, "#f30", 1 );
                            }else{
                                $(rectEl).attr({
                                    "width" : w,
                                    "height" : h
                                });
                            }
                        }else{
                            if( rectEl == null ) {
                                rectEl = ctx.drawRect( end.x, end.y, Math.abs(w), Math.abs(h), "#f30", 1 );
                            }else{
                                $(rectEl).attr({
                                    "x" : end.x,
                                    "width" : Math.abs(w),
                                    "height" : Math.abs(h)
                                });
                            }
                        }
                    }else{
                        if( w > 0 ) {
                            if( rectEl == null ) {
                                rectEl = ctx.drawRect( startPoint.x, e.y, w, Math.abs(h), "#ccc", 1 );
                            }else{
                                $(rectEl).attr({
                                    "y" : e.y,
                                    "width" : w,
                                    "height" : Math.abs(h)
                                });
                            }
                        }else{
                            if( rectEl == null ) {
                                rectEl = ctx.drawRect( e.x, e.y, Math.abs(w), Math.abs(h), "#ccc", 1 );
                            }else{
                                $(rectEl).attr({
                                    "x" : end.x,
                                    "y" : end.y,
                                    "width" : Math.abs(w),
                                    "height" : Math.abs(h)
                                });
                            }
                        }
                    }

                }
            }, function(e){
                rectEl = null;
                startPoint = null;
                if( arg != undefined && $.isFunction( arg.cb ) ) {
                    arg.cb();
                }
            }]);
        };
        this.drawEllipse = function( arg ) {
            removeContainer();
            createContainer();
            var ctx = self.$ctx;
            var startPoint = null;
            var ellipseEl = null;
            bindEvent([function( e ){
                var s = {
                    x : e.x,
                    y : e.y
                };
                startPoint = s;
            },function(e){
                var end = e;
                if( startPoint != null ) {
                    var ptCenter = {
                        x:(startPoint.x + e.x)/2 ,
                        y:(startPoint.y + e.y)/2 };
                    var xRadius = Math.abs(e.x - startPoint.x)/2;
                    var yRadius = Math.abs(e.y - startPoint.y)/2;

                    if( ellipseEl == null ) {
                        ellipseEl = ctx.drawEllipse( ptCenter, { x : xRadius, y : yRadius}, 1, "#f30", "none" );
                    }else{
                        $(ellipseEl).attr({
                            "cx" : ptCenter.x,
                            "cy" : ptCenter.y,
                            "rx" : xRadius,
                            "ry" : yRadius
                        });
                    }
                }
            }, function(e){
                ellipseEl = null;
                startPoint = null;
                if( arg != undefined && $.isFunction( arg.cb ) ) {
                    arg.cb();
                }
            }]);
        };
        this.drawNote = function( arg ) {
            if( !touchable ) {
                var point = null;
                var oNote = new Note(container.find(".chartTooltips-div"), {x:0, y:0}, 140);
            }else{
                removeContainer();
                createContainer();
                var ctx = self.$ctx;
                var startPoint = null;
                var lineEl = null;
                var ptCollection = [];
                bindEvent([function( e ){
                    var s = {
                        x : e.x,
                        y : e.y
                    };
                    startPoint = s;
                    ptCollection.push(startPoint);
                    // ctx.drawLine( s, e, "#ccc", 1 );
                },function(e){
                    if( startPoint != null ) {
                        //ptCollection, strokeWidth, strokeColor 
                        var d = " L " + e.x + " " + e.y;
                        if( lineEl == null ) {
                            lineEl = ctx.drawPolyline( ptCollection, 3 , "#f30");
                            console.info(lineEl);
                        }else{
                            var od = $(lineEl).attr("d");
                            var nd = od + d;
                            $(lineEl).attr("d", nd);
                        }
                    }
                }, function(e){
                    lineEl = null;
                    startPoint = null;
                    ptCollection = [];
                    if( arg != undefined && $.isFunction( arg.cb ) ) {
                        arg.cb();
                    }
                }]);
            }
        };
        Publisher.subscribe("drawLine", function( arg ){
            self.drawLine( arg );
        }, self);
        Publisher.subscribe("drawRect", function( arg ){
            self.drawRect( arg );
        }, self);
        Publisher.subscribe("drawEllipse", function( arg ){
            self.drawEllipse( arg );
        }, self);
        Publisher.subscribe("drawNote", function( arg ){
            self.drawNote( arg );
        }, self);
    };
    Components.Title = function( container, pointer ) {
        
    };
    /**/
    /*COORDINATE*/
    var Coordinate = function( container, pointer ) {
        this.$container = container;
        this.$pointer = pointer;
        this.init();
        var self = this;
        Publisher.subscribe("RTDChange", function() {
            self.RTDChange();
        }, self);
    };
    Coordinate.prototype = {
        constructor : Coordinate,
        getSubId : function() {
            return this.$pointer;
        },
        init : function() {
            var chartObj = getChartObj(this.$pointer);
            this.width = chartObj.ROOTWIDTH - 5;
            this.height = chartObj.ROOTHEIGHT;
            var ct = this.$container;
            var ctx = CT.createGroup(ct, "coordinateGraph");
            $(ctx).attr({
                "transform": "translate("+chartObj.ROOTLEFT+","+chartObj.ROOTTOP+") scale(1 1)"
            });
            this.$ctx = new Graphics(ctx);
            var self = this;
            Publisher.subscribe("draw", function(){
                self.draw();
            }, self);
        },
        getDXoption : function() {
            return {
                show : true,
                width : 25,
                lineWidth : 1,
                shortLine : 0,
                lineColor : "#ccc",
                position: 2,
                labelFormat: null,
                calibration: null,
                labelPadding : {
                    left : 0,
                    top : 0
                },
                type: "number"
            };
        },
        getDYoption : function() {
            return {
                position:1,
                mode:null, //0 is log
                labelFormat:null,
                calibration: null,
                show: true,
                shortLine : 0,
                showMarker: true,
                lineWidth: 0,
                width: 25,
                labelPadding : {
                    left : 0,
                    top : 0
                },
                lineColor: "#ccc"
            };
        },
        getDGoption : function() {
            return {
                lineColor : "#ccc",
                gridY : true,
                gridX : false,
                gridReference : {
                    x : "x1",
                    y : "y1"
                }
            };
        },
        setOptions : function( options ) {
            this.xlines = [];
            this.ylines = [];
            this.options = options;
            this.options.grid = $.extend(true, {}, this.getDGoption(), options.grid);
            var xaxis = options.xaxis
                , yaxis = options.yaxis
                , w = this.width
                , h = this.height
                , pointer = this.$pointer
                , self = this
                , chartWidth = 0
                , chartHeight = 0
                , left = 0
                , right = 0
                , top = 0
                , buttom = 0
                ;
            if( !$.isArray( xaxis ) ) {
                xaxis = [xaxis];
            }
            if( !$.isArray( yaxis ) ) {
                yaxis = [yaxis];
            };
            $.each(xaxis, function(index, x){
                var _xaxis = self.getDXoption();
                xaxis[index] = $.extend(true, {}, _xaxis, xaxis[index]);
                if(xaxis[index].position == 1){
                    top += x.width;
                }else{
                    buttom += x.width;
                }
            });
            $.each(yaxis, function(index, y){
                var _yaxis = self.getDYoption();
                yaxis[index] = $.extend(true, {}, _yaxis,yaxis[index]);
                if(yaxis[index].position == 1){
                    left += y.width;
                }else{
                    right += y.width;
                }
            });
            chartWidth = w - left - right;
            chartHeight = h - top - buttom;
            CHARTOBJ[pointer] = $.extend(true,{}, CHARTOBJ[pointer], {
                CHARTWIDTH : chartWidth,
                CHARTHEIGHT : chartHeight,
                LEFT : left,
                RIGHT : right,
                TOP : top,
                BUTTOM : buttom
            });
            this.createCMapping();
        },
        setData : function( data ) {
            this.data = data;
        },
        createCMapping : function() {
            var op = this.options
                , w = this.width
                , h = this.height
                , xMapping = null
                , XMAPPING = {}
                , YMAPPING = {}
                , yMapping = null
                , xaxis = op.xaxis
                , yaxis = op.yaxis
                , data = this.data
                , i = 0
                , temp = null
                , ca = null
                , count = 4
                , CO = getChartObj(this.$pointer)
                ;

            for( ; i < xaxis.length; i++ ) {
                temp = null;
                count = Math.floor((w-CO.RIGHT-CO.LEFT) / 100);
                temp = xaxis[i];
                temp.count = count;
                ca = calXCal(temp, data );
                temp.calibration = ca;
                xMapping = new Mapping();
                xMapping.setRange(CO.LEFT, w-CO.RIGHT, ca[0][0], ca[ca.length-1][0]);
                XMAPPING[temp.id] = xMapping;
                CO["XMAPPING"] = XMAPPING;
                temp.mapping = xMapping;
                this.mCoordinate(temp, "x");
            }
            i = 0;
            for( ; i < yaxis.length; i++ ) {
                temp = yaxis[i];
                ca = calYCal(temp, data);
                temp.calibration = ca;
                yMapping = new Mapping(temp.mode);
                yMapping.setRange(CO.TOP, h-CO.BUTTOM, ca[ca.length-1][0], ca[0][0]);
                YMAPPING[temp.id] = yMapping;
                CO["YMAPPING"] = YMAPPING;
                temp.mapping = yMapping;
                this.mCoordinate(temp, "y");
            }
        },
        mCoordinate : function( axis, type ) {
            var  lines = []
                , mapping = axis.mapping
                , position = axis.position
                , ca = axis.calibration
                , xline = {}
                , yline = {}
                ;

            ca.sort(function(a, b){
                if (a instanceof Array) {
                    a = a[0];
                }
                if (b instanceof Array) {
                    b = b[0];
                }
                return a - b
            });
            if( type == "x" ) {
                xline = __mappingXLine(axis, this.$pointer);
                this.xlines.push(xline);
            }else{
                yline = __mappingYLine(axis, this.$pointer);
                this.ylines.push(yline);
            }
        },
        drawXAxis : function() {
            var linePt = this.xlines
                , op = this.options
                , xaxis = op.xaxis
                , grid = op.grid
                , temp = null
                , i = 0
                ;
            for( ; i < linePt.length; i++ ) {
                temp = linePt[i];
                var ca = xaxis[i].calibration;
                if( xaxis[i].show ) {
                    this.$ctx.drawLines(temp.xlines, xaxis[i].lineColor, 1);
                }
                if( grid.gridX ) {
                    for( var j = 0; j < ca.length; j++ ) {
                        var color = op.grid.lineColor;
                        var width = 1;
                        if( ca[j][2] ) {
                            color = JColor.parse(ca[j][2]);
                            if( ca[j][3] ){
                                width = ca[j][3];
                            }
                        }
                        this.$ctx.drawLine({x:temp.gridX[j][0], y:temp.gridX[j][1]},{x:temp.gridX[j][2], y:temp.gridX[j][3]}, color, width);
                    }
                }
            }
        },
        drawYAxis : function() {
            var linePt = this.ylines
                , op = this.options
                , yaxis = op.yaxis
                , grid = op.grid
                , temp = null
                , i = 0
                ;
            for( ; i < linePt.length; i++ ) {
                temp = linePt[i];
                var ca = yaxis[i].calibration;
                if( yaxis[i].show ) {
                    this.$ctx.drawLine({x:temp.ylines[0][0], y:temp.ylines[0][1]},{x:temp.ylines[0][2], y:temp.ylines[0][3]}, yaxis[i].lineColor, 1);
                    //this.$ctx.drawLine(temp.ylines, yaxis[i].lineColor, 1);
                }
                if( yaxis[i].showMarker ) {
                    for( var j = 1; j < temp.ylines.length; j++ ) {
                        this.$ctx.drawLine({x:temp.ylines[j][0], y:temp.ylines[j][1]},{x:temp.ylines[j][2], y:temp.ylines[j][3]}, yaxis[i].lineColor, 1);
                    }
                }
                if( grid.gridY && grid.gridReference.y == yaxis[i].id ) {
                    for( var j = 0; j < ca.length; j++ ) {
                        var color = op.grid.lineColor;
                        var width = 1;
                        if( ca[j][2] ) {
                            color = JColor.parse(ca[j][2]);
                            if( ca[j][3] ){
                                width = ca[j][3];
                            }
                        }
                        this.$ctx.drawLine({x:temp.gridY[j][0], y:temp.gridY[j][1]},{x:temp.gridY[j][2], y:temp.gridY[j][3]}, color, width);
                    }
                    //this.$ctx.drawLines(temp.gridY, op.grid.lineColor, 1);
                }
            }
        },
        drawLabels : function() {
            var op = this.options
                , ctx = this.$ctx
                , xaxis = op.xaxis
                , yaxis = op.yaxis
                , xlines = this.xlines
                , ylines = this.ylines
                , gap = null
                , text = ""
                , obj = {}
                , ca = null
                , temp = null
                , point = null
                , p = null
                , labels = []
                , i = 0
                , ap = []
                , oa = []
                , color = "#000"
                , chartObj = getChartObj(this.$pointer)
                ;

            for( ; i < xaxis.length; i++ ) {
                temp = xlines[i].xGap;
                point = xlines[i].gridX;
                ca = xaxis[i].calibration;
                var textArry = [];
                var gridW = chartObj.CHARTWIDTH / (ca.length -1);
                for( var j = 0; j < ca.length; j++ ) {
                    color = "#000";
                    if( ca[j][2] ) {
                        color = JColor.parse(ca[j][2]);
                    }
                    text = ca[j][1];
                    if( $.isFunction(xaxis[i].labelFormat) ) {
                        text = xaxis[i].labelFormat(text);
                    }
                    if( xaxis[i].labelEllipsis === true ) {
                        obj = __calLabelWH(text, xaxis[i].labelCss);
                        text = tools.textEllipsis( text, obj.w, gridW );
                    }
                    textArry.push(text);
                    gap = temp[j];
                    obj = __calLabelWH(text, xaxis[i].labelCss);
                    var labelPadding = xaxis[i].labelPadding;
                    if( gap == -1 && text == "" ) {
                        continue;
                    }else if( gap == -1 ){
                        p = {
                            sx : point[j][0] - obj.w,
                            y : point[j][3]+obj.h,
                            ex : point[j][0]
                        };
                    }else{
                        p = __calLabelPosition(obj, gap, xaxis[i].labelAlign, point[j]);
                        p.sx += labelPadding.left;
                        p.y += labelPadding.top;
                        p.ex += labelPadding.left;
                    }
                    ap.push(p);
                };
                oa = __isXOverlay(ap);
                for( var j = 0; j < ca.length; j++ ) {
                    if( $.inArray( j, oa ) == -1 || j == ca.length-1 ) {
                        if(ap[j]) {
                            labels.push($(ctx.drawText(textArry[j], ap[j].sx, ap[j].y)).css(xaxis[i].labelCss).attr("fill", color));
                        }
                    }
                }
                __filterXLabel(labels, 2, xaxis[i].labelAlign);
            };
            i = 0;
            for( ; i < yaxis.length; i++ ) {
                temp = ylines[i].yGap;
                point = ylines[i].gridY;
                ca = yaxis[i].calibration;
                for( var j = 0; j < ca.length; j++ ) {
                    color = "#000";
                    if( ca[j][2] ) {
                        color = JColor.parse(ca[j][2]);
                    }
                    text = ca[j][1];
                    if( $.isFunction(yaxis[i].labelFormat) ) {
                        text = yaxis[i].labelFormat(text);
                    }else if(!isNaN(Number(text)) &&  (text+"").split(".").length > 1){
                        text = Number(text).toFixed(2);
                    }
                    if( yaxis[i].labelEllipsis === true ) {
                        obj = __calLabelWH(text, yaxis[i].labelCss);
                        text = tools.textEllipsis( text, obj.w, yaxis[i].width );
                    }
                    gap = temp[j];
                    obj = __calLabelWH(text, yaxis[i].labelCss);
                    var labelPadding = yaxis[i].labelPadding;
                    if( yaxis[i].labelAlign == "lineCenter" ) {
                        if( yaxis[i].position == 1 ) {
                            p = {
                                x : point[j][0] - obj.w + labelPadding.left,
                                y : point[j][1] + (obj.h*0.5) + labelPadding.top
                            };
                        }else{
                            p = {
                                x : point[j][2] + labelPadding.left,
                                y : point[j][1] + (obj.h*0.5) + labelPadding.top
                            };
                        }
                        $(ctx.drawText(text, p.x, p.y)).css(yaxis[i].labelCss).attr("fill", color);
                    }
                    if( yaxis[i].labelAlign == "center" ) {
                        if( yaxis[i].position == 1 ) {
                            p = {
                                x : point[j][0] - obj.w  + labelPadding.left,
                                y : point[j][1] - (gap-obj.h)*0.5 + labelPadding.top
                            };
                        }else{
                            p = {
                                x : point[j][2]  + labelPadding.left,
                                y : point[j][1] - (gap-obj.h)*0.5 + labelPadding.top
                            };
                        }
                        $(ctx.drawText(text, p.x, p.y)).css(yaxis[i].labelCss).attr("fill", color);
                    }

                }
            }
        },
        draw : function() {
            this.drawXAxis();
            this.drawYAxis();
            this.drawLabels();
        },
        RTDChange : function() {
            $(this.$container).find(".coordinateGraph").children().remove();
            this.draw();
        },
        addAxis : function() {

        },
        removeAxis : function() {

        },
        resize : function() {

        }
    };
    /***********/
    /*SERIALCHART*/
    var __dataToPoint = function( data, mapping, type ){
            var len = data.length, xmapping  = mapping.xmapping, ymapping = mapping.ymapping, pt = [],
                xvalue = null, yvalue = null, xpoint = null, ypoint = null;

            for(var i = 0; i < len; i++){
                xvalue = data[i][0];
                yvalue = data[i][2];
                if(type == "OHLC"){
                    var o,h,l,e;
                    if (data[i].length > 3 && typeof data[i][3] == "object") {
                        e = $.extend(true,{},data[i][3]);
                        // o: open
                        if (e.o) {
                            e.o = ymapping.getCoordinate(e.o);
                        }
                        // h: high
                        if (e.h) {
                            e.h = ymapping.getCoordinate(e.h);
                        }
                        // l: low
                        if (e.l) {
                            e.l = ymapping.getCoordinate(e.l);
                        }
                        // c: close, using y
                        // x, y
                        if (typeof yvalue == "number") {
                            xpoint = xmapping.getCoordinate(xvalue);
                            ypoint = ymapping.getCoordinate(yvalue);
                        } else if (yvalue === "NaN") {
                            xpoint = xmapping.getCoordinate(xvalue);
                            ypoint= null;
                        }
                        e.x = xpoint;e.y = ypoint;
                        pt.push(e);
                        e=null;
                    }
                }else{
                    if (typeof yvalue == "number") {
                        xpoint = xmapping.getCoordinate(xvalue);
                        ypoint = ymapping.getCoordinate(yvalue);
                    } else if (yvalue === "NaN") {
                        xpoint = xmapping.getCoordinate(xvalue);
                        ypoint = null;
                    }
                    pt.push({x : xpoint, y : ypoint});
                }
            }
            return pt;
        },
        __mappingData = function( data, pointer ) {
            var  i = 0
                , temp = null
                , xId = "x1"
                , yId = "y1"
                , xMapping = null
                , yMapping = null
                , pt = []
                , CO = getChartObj(pointer)
                ;

            for( ; i < data.length; i++ ) {
                pt = [];
                temp = data[i];
                xId = temp.xId;
                yId = temp.yId;
                xMapping = CO.XMAPPING[xId];
                yMapping = CO.YMAPPING[yId];
                pt = __dataToPoint( temp.data, {xmapping : xMapping, ymapping : yMapping}, data[i].chartType );
                temp.pt = pt;
            };
        };
    var getMoustMoveData = {
        line : function( obj, index_ ) {
            var mousePosition = obj.pt;
            var data = obj.chartData;
            var correspondData = obj.re;
            var re = [];
            var radius = 5;
            var type=String(arguments[3] || "nearx").toLowerCase();
            var v = correspondData[index_],d,index;
            if (v === null) {
                return false;
            }
            /*
             * modify by vicas.liu start 2011-12-16
             */
            switch (type) {
                case "nearx":
                    d = v.xs >= v.xe ? v.xe : v.xs;
                    if (d == v.xs) {
                        index = v.start;
                    } else {
                        index = v.end;
                    }
                    break;
                case "farx":
                    d = v.xs <= v.xe ? v.xe : v.xs;
                    if (d == v.xs) {
                        index = v.start;
                    } else {
                        index = v.end;
                    }
                    break;
                default:
                    d = v.ds >= v.de ? v.de : v.ds;
                    if (d == v.ds) {
                        index = v.start;
                    } else {
                        index = v.end;
                    }
                    break;
            }
            //d = v.ds >= v.de ? v.ds : v.de;
            if(v.ds >= v.de){
                d = v.de;
            }else{
                if(v.xs <= v.xe){
                    if(v.xs < 25){
                        d = v.ds;
                    }else{
                        d = v.de;
                    }

                }else{
                    d = v.ds;
                }
            }
            var xvalue = data.data[index][1];
            var yvalue = data.data[index][2];
            var firstvalue = data.data[index][0];
            //me.hover(s.pt);
            re.push({
                arraySubIndex : index,
                distance : d < 25 ? -1 : d,
                firstValue : firstvalue,
                xvalue : xvalue,
                dataId : data.dataId,
                yvalue : yvalue,
                x : data.pt[index].x,
                y : data.pt[index].y,
                style : data.style,
                mousePosition : mousePosition
            });
            return re;
        },
        bar : function( obj, index_ ) {
            var mousePosition = obj.pt;
            var s = obj.chartData;
            var correspondData = obj.re;
            var re = [];
            var type=arguments[3]||"",type=type.toLowerCase();
            var v = correspondData[index_],d;
            if (v === null) {
                return false;
            }
            var index = null;
            switch (type) {
                case "nearx":
                    d = v.xs >= v.xe ? v.xe : v.xs;
                    if (d == v.xs) {
                        index = v.start;
                    } else {
                        index = v.end;
                    };
                    break;
                default:
                    if(s.barPt[v.start].length == 0){
                        return;
                    }else if (tools.inPolygon(s.barPt[v.start], 4, mousePosition)) {
                        d = 0;
                        index = v.start;
                    } else {
                        if(s.barPt[v.end].length == 0){
                            return;
                        }else if (tools.inPolygon(s.barPt[v.end], 4, mousePosition)) {
                            d = 0;
                            index = v.end;
                        }
                    }
                    break;
            }
            //index = 0;
            if (index != null) {
                var xvalue = s.data[index][1];
                var yvalue = s.data[index][2];
                var firstvalue = s.data[index][0];
                var itemId=s.data[index][3]?s.data[index][3]:"";
                var itemName=s.data[index][4]?s.data[index][4]:"Item";
                var dataId = s.dataId;
                re.push({
                    arraySubIndex:index,
                    distance: d,
                    firstValue: firstvalue,
                    itemId:itemId,
                    itemName: itemName,
                    xvalue: xvalue,
                    yvalue: yvalue,
                    x: mousePosition.x,
                    y: mousePosition.y,
                    style : s.style,
                    dataId : dataId,
                    index : (index_ * s.data.length) + firstvalue,
                    mousePosition: mousePosition
                });
            }
            return re;
        },
        stacked : function( obj, index_ ) {
            var mousePosition = obj.pt;
            var s = obj.chartData;
            var correspondData = obj.re;
            var re = [];
            var type=arguments[3]||"nearx";
            var v = correspondData[index_],d;
            if (v === null) {
                return false;
            }
            var index = null;
            switch (type.toLowerCase()) {
                case "nearx":
                    d = v.xs >= v.xe ? v.xe : v.xs;
                    if (d == v.xs) {
                        index = v.start;
                    } else {
                        index = v.end;
                    }
                    break;
                case "farx":
                    d = v.xs <= v.xe ? v.xe : v.xs;
                    if (d == v.xs) {
                        index = v.start;
                    } else {
                        index = v.end;
                    }
                    break;
                default:
                    d = v.ds >= v.de ? v.de : v.ds;
                    if (d == v.ds) {
                        index = v.start;
                    } else {
                        index = v.end;
                    }
                    break;
            }
            var p = null;
            if (tools.inPolygon(s.stackedAreaPolygon, s.stackedAreaPolygon.length, mousePosition)) {
                p = index;
            }
            if (p != null) {
                var itemId=s.data[p][3]?s.data[p][3]:"";
                re.push($.extend({
                    arraySubIndex:p,
                    mousePosition: mousePosition,
                    firstValue: s.data[p][0],
                    itemId:itemId,
                    xvalue: s.data[p][1],
                    yvalue: s.data[p][2],
                    x: s.stackedPt[p].x,
                    y: s.stackedPt[p].y,
                    distance: 0
                }, s));
            }
            return re;
        },
        column : function( obj, index_ ) {

        }
    };
    var ChartGraphics = function( ctx, pointer ) {
        this.$ctx = ctx;
        var $pointer = pointer;
        var CBARINDEX = 0;
        var CHARTINDEX = 0;
        var $CO = getChartObj(pointer);
        var CHARTWIDTH = $CO.CHARTWIDTH, CHARTHEIGHT = $CO.CHARTHEIGHT;
        var YMAPPING = $CO.YMAPPING, XMAPPING = $CO.XMAPPING;
        var TARGET = $CO.TARGET;
        var dataArray = [], STACKINDEX = 0;
        var res = [];
        var self = this;
        var chart = {
            line : function( ctx ) {
                var lineG = TARGET.find(".serialGraph");
                var catx = CT.createGroup(lineG, "lineSerialGraph");
                $(catx).attr("transform", "translate(0,0) scale(0 1)");
                var lineObj = this;
                this.$ctx = new Graphics(catx);
                var getDefaultOp = function( options ) {
                    var defaultOp = {
                        areaLine: false,
                        baseLine:null,
                        lineWidth: 1,
                        hoverLineWidth: 2,
                        hoverLineColor: "#000000",
                        lineColor: "#cccccc",
                        areaColor: "#cccccc",
                        gradient: true,
                        divisionColor:false,
                        marker: {
                            show: false,
                            showDesc : false,
                            textColor : "#666",
                            shape: 2,
                            width: 8,
                            height: 8,
                            radius : 2,
                            color: "#000000"
                        }
                    };
                    return $.extend(true, {}, defaultOp, options);
                };
                var calBarLinePoints = function( obj ) {
                    //增加柱状性线图
                };
                var calTheLinePoints = function(obj, yMapping, op){
                    //var op = lineObj.options;
                    if(op.areaLine){
                        var ptCollection = [];
                        var pt = obj.pt;
                        var topPos = yMapping.getCoordinate(obj.maxY);
                        var minPos = yMapping.getCoordinate(obj.minY);
                        var yrange = yMapping.getRange();
                        var bottomPos = yrange.eCoord;
                        if (typeof (op.baseLine) == "number") {
                            bottomPos = yMapping.getCoordinate(op.baseLine);
                        }
                        bottomPos = tools.clamp(bottomPos, yrange.sCoord, yrange.eCoord);
                        ptCollection.push({
                            x: pt[pt.length - 1].x,
                            y: bottomPos
                        });
                        ptCollection.push({
                            x: pt[0].x,
                            y: bottomPos
                        });
                        var areaPt = pt.concat(ptCollection),len=areaPt.length,lw=op.lineWidth*0.1;
                        $.each(areaPt, function(i,s) {
                            if(i >= len-2) {
                                return false;
                            }
                            s.y += lw;
                        });
                        return areaPt;
                    }else{
                        return obj.pt;
                    }
                };
                var drawLine = function( data, op ) {
                    var temp = null
                        , i = 0
                        , pt = null
                        , graphic = lineObj.$ctx
                        ;

                    if( data.pt == null || data.pt.length == 0 ) {
                        return;
                    }
                    pt = data.pt;
                    if(pt == null || pt.length == 0){
                        return;
                    }
                    graphic.drawPolyline(pt, op.lineWidth, JColor.parse(op.lineColor).toString());
                };
                var drawArea = function( obj, op ) {
                    var ChartObj = getChartObj(pointer);
                    var YMAPPING = ChartObj["YMAPPING"];
                    var ptCollection = []
                        , color= {startColor:"#80cccccc",stopColor:"#00ffffff"}
                        , yMapping = YMAPPING[obj.yId]
                        , graphic = lineObj.$ctx
                        , pt = obj.pt
                        ;

                    if( !op.areaLine ) {
                        return;
                    };
                    if(typeof(op.areaColor) === "string") {
                        color= {
                            startColor:op.areaColor,
                            stopColor:op.areaColor
                        };
                    } else {
                        if(op.areaColor.startColor&&op.areaColor.stopColor) {
                            color=op.areaColor;
                        }
                    }
                    var topPos = yMapping.getCoordinate(obj.maxY);
                    var minPos=yMapping.getCoordinate(obj.minY);
                    var yrange = yMapping.getRange();
                    var bottomPos = yrange.eCoord;
                    if (typeof (op.baseLine) == "number") {
                        bottomPos = yMapping.getCoordinate(op.baseLine);
                    }
                    bottomPos = tools.clamp(bottomPos, yrange.sCoord, yrange.eCoord);
                    ptCollection.push({
                        x: pt[pt.length - 1].x,
                        y: bottomPos
                    });
                    ptCollection.push({
                        x: pt[0].x,
                        y: bottomPos
                    });
                    if (op.gradient) {
                        color = graphic.drawGradient(color, topPos, bottomPos, op.divisionColor, minPos);
                    } else {
                        color = $.color.parse(color.startColor).toString();
                    }
                    var areaPt = calTheLinePoints(obj, yMapping, op);
                    graphic.drawPolygon(areaPt, 0, "", color);
                };
                var drawMark = function( data, op ) {
                    if(op.marker.show){
                        var pt = data.pt;
                        var dotPt = [];
                        $.each(pt, function(j, data) {
                            if (data.y === null || data.x === null) {
                                return;
                            }
                            dotPt.push({
                                x: data.x,
                                y: data.y
                            });
                        });
                        var radius=op.marker.radius;
                        if(op.marker.showDesc){
                            for(var j = 0; j < dotPt.length; j++){
                                var text = "";
                                if(data.data[0].length > 3){
                                    text = data.data[j][3];
                                }else{
                                    text = data.data[j][2];
                                }
                                var y = dotPt[j].y - radius;
                                $(lineObj.$ctx.drawText(text, dotPt[j].x, y)).attr("fill", op.marker.textColor);
                            }
                        }
                        var color = JColor.parse(op.lineColor).toString();
                        lineObj.$ctx.drawCircles(dotPt,radius,color,0,color);
                    }
                };
                var drawLines = function() {
                    var data = lineObj.data
                        , op = lineObj.options
                        ;
                    for( var i = 0; i < data.length; i++ ) {
                        var dop = getDefaultOp(op[i]);
                        drawLine( data[i], dop );
                        drawArea( data[i], dop );
                        drawMark( data[i], dop );
                    }
                };
                this.getSubId = function() {
                    return pointer;
                };
                this.setOptions = function( options ) {
                    this.options = options;
                };
                this.setData = function( data ) {
                    this.data = data;
                };
                this.draw = function() {
                    drawLines();
                    SVGAnimation.line($CO.CHARTWIDTH+$CO.LEFT, $CO.CHARTHEIGHT, TARGET.find(".lineSerialGraph"));
                };
                this.setChartOp = function( chartOp ) {
                    var len = chartOp.length;
                    this.lineDataLen = len;
                    var temp = null;
                    for( var i = 0; i < len; i++ ) {
                        temp = null;
                        temp = chartOp[i];
                        this.setOptions(temp.op);
                        this.setData(temp.data);
                    }
                };
                this.hightLight = function( obj ) {

                };
                this.RTDChange = function() {
                    TARGET.find(".lineSerialGraph").children().remove();
                    TARGET.find("defs").remove();
                    drawLines();
                };
                Publisher.subscribe("draw", function(){
                    lineObj.draw();
                }, lineObj);
                Publisher.subscribe("publishMouseData", function( data ){
                    lineObj.hightLight(data.s[0]);
                }, lineObj);
                Publisher.subscribe("RTDChange", function() {
                    lineObj.RTDChange();
                }, lineObj);
            },
            bar : function( ctx ) {
                var lineG = TARGET.find(".serialGraph");
                var catx = CT.createGroup(lineG, "barSerialGraph");
                $(catx).attr("transform", "translate(0,0) scale(0 1)");
                this.$ctx = new Graphics(catx);
                var self = this;
                //self.$ctx = ctx;
                var BASELINEPOINT = 0;
                var descPt = [];
                var BBARINDEX = 0;
                var ypointFirst = [], ypointLast = [], dataValue = [], xpointFirst = [], xpointLast = [];
                var getDefaultOp = function( options ) {
                    var barOption = {
                        eachColor:false,
                        barWidth: null,
                        baseLine: null,
                        indentation: true,
                        strokeWidth: 0,
                        selectStrokeWidth:1,
                        strokeColor: "#333333",
                        hoverStrokeWidth:1,
                        hoverStrokeColor:"#333333",
                        hoverColor: "#FF6600",
                        fillColor: "#A3ACC2",
                        section:false,
                        space: null,
                        leftSpace: null,
                        type : 0,  // 0 "Vertical", 1 "Horizontal", 2 "VerticalStack", 3 "HorizontalStack"
                        desc : {
                            showDesc : false,
                            desc : [],
                            descCss : {
                                font:'normal 12px Hiragino Sans GB, sans-serif',
                            },
                            decimalNum : 0,
                            left : 0,
                            textColor : "",
                            top : 0
                        }
                    };
                    return $.extend( true, {}, barOption, options );
                };
                var calBarPoints = function( data, op ) {
                    console.info(op);
                    var ChartObj = getChartObj(pointer);
                    var YMAPPING = ChartObj["YMAPPING"];
                    var XMAPPING = ChartObj["XMAPPING"];
                    var pt = data.pt
                    // , op = self.options
                        , temp = null
                        , barArea = []
                        , yMapping = YMAPPING[data.yId]
                        , _graphXMapping = XMAPPING[data.xId]
                        , barArea = []
                        , allLen = self.barDataLen
                        ;

                    descPt = [];
                    var rx = {
                        first: _graphXMapping.getRange().sCoord,
                        second: _graphXMapping.getRange().eCoord
                    };
                    if (op.baseLine != null) {
                        var y0 = yMapping.getCoordinate(op.baseLine);
                    } else {
                        var y0 = yMapping.getCoordinate(yMapping.eValue);
                    }
                    BASELINEPOINT = y0;
                    var dataNums = allLen;
                    var gridW = CHARTWIDTH / pt.length;
                    leftSpace = (gridW * 0.2);
                    op.leftSpace = leftSpace;
                    var barWidth = (gridW * 0.6) / allLen;
                    op.barWidth = barWidth;
                    for( var i = 0; i < pt.length; i++ ) {
                        var data = pt[i];
                        var barPtCollection = [];
                        if (data.y === null) {
                            barArea.push([]);
                            continue;
                        }
                        var _y0 = null;
                        var _y1 = null;
                        if(op.section) {
                            var curMax=(i+1)*gridW;
                            var marginLeft=0;
                            if(op.space != null){
                                marginLeft = data.x+op.leftSpace;
                                space = op.space;
                            }else{
                                space=(gridW-(barWidth*dataNums))/(dataNums+1);
                                marginLeft=data.x+space;
                            }
                            var xpointFirst = marginLeft;
                            var xpointLast = marginLeft+ barWidth;
                            if(xpointLast >= rx.second) {
                                xpointFirst=xpointFirst-BBARINDEX*(barWidth+space);
                                xpointLast= xpointLast-BBARINDEX*(barWidth+space);
                            } else {
                                xpointFirst=xpointFirst+BBARINDEX*(barWidth+space);
                                xpointLast= xpointLast+BBARINDEX*(barWidth+space);
                            }
                        } else {
                            var xpointFirst = data.x - barWidth;
                            var xpointLast = data.x + barWidth;
                            if (op.indentation) {
                                if (xpointFirst < rx.first) {
                                    xpointFirst = rx.first;
                                    xpointLast = data.x + 2*barWidth;
                                }
                                if (xpointLast > rx.second) {
                                    xpointLast = rx.second;
                                    xpointFirst = data.x - 2*barWidth;
                                }
                            }
                            if(xpointLast >= rx.second) {
                                xpointFirst=xpointFirst-BBARINDEX*barWidth;
                                xpointLast= xpointLast-BBARINDEX*barWidth;
                            } else {
                                xpointFirst=xpointFirst+BBARINDEX*barWidth;
                                xpointLast= xpointLast+BBARINDEX*barWidth;
                            }
                        }
                        _y0 = y0;
                        _y1 = data.y;

                        barArea.push([{
                            x: xpointFirst,
                            y: _y0
                        },{
                            x: xpointFirst,
                            y: _y1
                        },{
                            x: xpointLast,
                            y: _y1
                        },{
                            x: xpointLast,
                            y: _y0
                        }]);
                        if(data.y < y0){
                            descPt.push({
                                x : xpointFirst + op.desc.left,
                                y : _y1 - op.desc.top
                            });
                        }else{
                            descPt.push({
                                x : xpointFirst + op.desc.left,
                                y : _y1 + (op.desc.top/5)
                            });
                        }
                    }
                    BBARINDEX++;
                    return barArea;
                };
                var calSBarPoints = function( data ) {
                    var pt = data.pt
                        , oda = data.data
                        , op = self.options
                        , temp = null
                        , barArea = []
                        , yMapping = YMAPPING[data.yId]
                        , _graphXMapping = XMAPPING[data.xId]
                        , _graphYMapping = yMapping
                        , barArea = []
                        , allLen = self.barDataLen
                        ;

                    var rx = {
                        first: _graphXMapping.getRange().sCoord,
                        second: _graphXMapping.getRange().eCoord
                    };
                    if (op.baseLine != null) {
                        var y0 = yMapping.getCoordinate(op.baseLine);
                    } else {
                        var y0 = yMapping.getRange().eCoord;
                    }
                    BASELINEPOINT = y0;
                    var dataNums = allLen;
                    var gridW = CHARTWIDTH / pt.length;
                    leftSpace = (gridW * 0.2);
                    op.leftSpace = leftSpace;
                    var barWidth = (gridW * 0.6) / allLen;
                    for( var i = 0; i < pt.length; i++ ) {
                        var data = pt[i];
                        var barPtCollection = [];
                        if (data.y === null) {
                            barArea.push([]);
                            continue;
                        }
                        var _y0 = null;
                        var _y1 = null;
                        var space = (gridW - barWidth) / 2;
                        var marginLeft = data.x + space;
                        var xpointFirst = marginLeft;
                        var xpointLast = marginLeft+ barWidth;
                        if(BBARINDEX==0){
                            ypointFirst.push(y0);
                            ypointLast.push(data.y);
                            dataValue.push(oda[i][2]);
                        }else{
                            dataValue[i] = dataValue[i] + math.abs(oda[i][2]);
                            ypointFirst[i] = ypointLast[i];
                            ypointLast[i] = _graphYMapping.getCoordinate(dataValue[i]);
                        }
                        _y0 = ypointFirst[i];
                        _y1 = ypointLast[i];
                        barArea.push([{
                            x: xpointFirst,
                            y: _y0
                        },{
                            x: xpointFirst,
                            y: _y1
                        },{
                            x: xpointLast,
                            y: _y1
                        },{
                            x: xpointLast,
                            y: _y0
                        }]);
                    }
                    BBARINDEX++;
                    return barArea;
                };
                var drawBar = function() {
                    BBARINDEX = 0;
                    var data = self.data
                        , op = self.options
                        , ctx = self.$ctx
                        , pt = null
                        ;
                    for( var i = 0; i < op.length; i ++) {
                        if( op[i].type == 0 ) {
                            var _op = getDefaultOp(op[i]);
                            pt = calBarPoints(data[i], _op);
                            data[i].barPt = pt;
                            ctx.drawBar(pt, 1, "", _op.fillColor);
                            drawText(data[i], _op);
                        }
                    }

                };
                var drawStackBar = function() {
                    BBARINDEX = 0;
                    var data = self.data
                        , op = self.options
                        , ctx = self.$ctx
                        , pt = null
                        ;
                    for( var i = 0; i < op.length; i ++) {
                        if( op[i].type == 1 ) {
                            var _op = getDefaultOp(op[i]);
                            pt = calSBarPoints(data[i], _op);
                            data[i].barPt = pt;
                            ctx.drawBar(pt, 1, "", _op.fillColor);
                        }
                    }
                };
                var drawText = function( data, op ) {
                    var barWidth = op.barWidth
                        ;
                    if(op.desc.showDesc){
                        if(op.desc.desc.length == 0){
                            var len = descPt.length;
                            for(var j = 0; j < len; ++j){
                                var xpoint0 = descPt[j].x + (barWidth * 0.5);
                                var obj = __calLabelWH(data.data[j][2],op.desc.descCss);
                                var x = (xpoint0-obj.w*0.5);
                                var y = descPt[j].y;
                                if( descPt[j].y > BASELINEPOINT ) {
                                    y = descPt[j].y + obj.h*0.5;
                                }
                                $(self.$ctx.drawText(data.data[j][2], x, y)).attr("fill" , op.desc.textColor).css(op.desc.descCss);
                            }
                        }else{
                            var len = descPt.length;
                            for(var j = 0; j < len; ++j){
                                var xpoint0 = descPt[j].x + (barWidth * 0.5);
                                $(self.$ctx.drawText(data.data[j][2], xpoint0, descPt[j].y)).attr("fill" , op.desc.textColor);
                            }
                        }
                    }
                };
                this.getSubId = function() {
                    return pointer;
                };
                this.setOptions = function( options ) {
                    this.options = options;
                };
                this.setData = function( data ) {
                    this.data = data;
                    this.barDataLen = data.length;
                };
                this.draw = function() {
                    drawBar();
                    drawStackBar();
                    SVGAnimation.bar(BASELINEPOINT, TARGET.find(".barSerialGraph"), $CO.ROOTTOP);
                };
                this.hightLight = function( obj ) {
                    var index = obj.index;
                    var target = $CO.TARGET;
                    var graphs = target.find(".barSerialGraph");
                    var newColor = obj.style.hoverColor;
                    var path = $(graphs).find("rect");
                    for( var i = 0; i < path.length; i++ ){
                        if((typeof $(path[i]).attr("oldfill") != "undefined") && ($(path[i]).attr("oldfill") != null) ){
                            $(path[i]).attr("fill",$(path[i]).attr("oldfill"));
                        }
                    }
                    var color = $(graphs).find("rect").eq(index).attr("fill");
                    $(graphs).find("rect").eq(index).attr("fill", newColor).attr("oldfill",color);
                };
                this.RTDChange = function() {
                    TARGET.find(".barSerialGraph").children().remove();
                    drawBar();
                    drawStackBar();
                };
                this.setChartOp = function( chartOp ) {
                    var len = chartOp.length;
                    this.barDataLen = len;
                    this.setOptions(temp.op);
                    this.setData(temp.data);
                };
                Publisher.subscribe("draw", function(){
                    self.draw();
                }, self);
                Publisher.subscribe("publishMouseData", function( data ){
                    self.hightLight(data.s[0]);
                }, self);
                Publisher.subscribe("RTDChange", function() {
                    self.RTDChange();
                }, self);
                Publisher.subscribe("setHightLight", function( obj ) {
                    self.hightLight(obj);
                }, self);
            },
            column : function( ctx ) {
                var lineG = TARGET.find(".serialGraph");
                var catx = CT.createGroup(lineG, "columSerialGraph");
                $(catx).attr("transform", "translate(0,0) scale(0 1)");
                this.$ctx = new Graphics(catx);
                var self = this;
                //self.$ctx = ctx;
                var CBASELINEPOINT = 0;
                var ypointFirst = [], ypointLast = [], dataValue = [], xpointFirst = [], xpointLast = [];
                var getDefaultOp = function( options ) {
                    var defaultOp = {
                        eachColor:false,
                        barWidth: null,
                        baseLine: null,
                        indentation: true,
                        strokeWidth: 0,
                        selectStrokeWidth:1,
                        strokeColor: "#333333",
                        hoverStrokeWidth:1,
                        hoverStrokeColor:"#333333",
                        hoverColor: "#FF6600",
                        fillColor: "#A3ACC2",
                        section:false,
                        stick : false,
                        space: null,
                        leftSpace: null,
                        type : 0,
                        desc : {
                            showDesc : false,
                            desc : [],
                            descCss : "",
                            decimalNum : 0,
                            left : 0,
                            textColor : "",
                            top : 15
                        }
                    };
                    return $.extend( true, {}, defaultOp, options );
                };
                var calColumnPoints = function( obj, op ) {
                    var pt = obj.pt
                    // , op = self.options
                        , allLen = self.allBarLen
                        , temp = {}
                        , barArea = []
                        , yMapping = YMAPPING[obj.yId]
                        , _graphXMapping = XMAPPING[obj.xId]
                        , _graphYMapping = yMapping
                        ;
                    var xMapping = XMAPPING;
                    var rx = {
                        first: _graphYMapping.getRange().sCoord,
                        second: _graphYMapping.getRange().eCoord
                    };
                    console.info(xMapping);
                    if (op.baseLine != null) {
                        var x0 = _graphXMapping.getCoordinate(op.baseLine);
                    } else {
                        var x0 = _graphXMapping.getCoordinate(_graphXMapping.sValue);
                    }
                    CBASELINEPOINT = x0;
                    var dataNums = allLen;
                    var gridW = CHARTHEIGHT / pt.length;
                    leftSpace = (gridW * 0.2);
                    op.leftSpace = leftSpace;
                    var barWidth = (gridW * 0.6) / allLen;
                    for( var i = 0; i < pt.length; i++ ) {
                        var data = pt[i];
                        if(data.x === null){
                            barArea.push([]);
                            return;
                        }
                        var _x0 = null;
                        var _x1 = null;
                        if(op.stick){
                            var space = 5;
                            if(op.space != null){
                                space = op.space;
                            }
                            if(j == 0){
                                mBottom = data.y;
                            }
                            var ypointFirst = mBottom;
                            var ypointLast = mBottom - barWidth;
                            ypointFirst=ypointFirst-j*(barWidth + space);
                            ypointLast= ypointLast-j*(barWidth + space);
                            _x0 = x0;
                            _x1 = data.x;
                        }else{
                            var space = (gridW - (barWidth*dataNums)) / (dataNums+1);
                            var marginBottom = 0;
                            if(op.space != null){
                                marginBottom = data.y - op.leftSpace;
                                space = op.space;
                            }else{
                                marginBottom= data.y - space;
                            }
                            var ypointFirst = marginBottom;
                            var ypointLast = marginBottom - barWidth;
                            ypointFirst=ypointFirst-CBARINDEX*(barWidth+space);
                            ypointLast= ypointLast-CBARINDEX*(barWidth+space);
                            _x0 = x0;
                            _x1 = data.x;
                        }
                        barArea.push([{
                            x: _x0,
                            y: ypointFirst
                        },{
                            x: _x1,
                            y: ypointFirst
                        },{
                            x: _x1,
                            y: ypointLast
                        },{
                            x: _x0,
                            y: ypointLast
                        }]);
                    }
                    CBARINDEX += 1;
                    return barArea;
                };
                var calHColumnPoints = function( obj, op ) {
                    var pt = obj.pt
                        , oda = obj.data
                    // , op = self.options
                        , allLen = obj.allLen
                        , temp = {}
                        , barArea = []
                        , yMapping = YMAPPING[obj.yId]
                        , _graphXMapping = XMAPPING[obj.xId]
                        , _graphYMapping = yMapping
                        ;
                    var xMapping = XMAPPING;
                    var rx = {
                        first: _graphYMapping.getRange().sCoord,
                        second: _graphYMapping.getRange().eCoord
                    };
                    if (op.baseLine != null) {
                        var x0 = _graphXMapping.getCoordinate(op.baseLine);
                    } else {
                        var x0 = _graphXMapping.getCoordinate(_graphXMapping.sValue);
                    }
                    CBASELINEPOINT = x0;
                    var dataNums = allLen;
                    var gridW = CHARTHEIGHT / pt.length;
                    leftSpace = (gridW * 0.2);
                    op.leftSpace = leftSpace;
                    var barWidth = (gridW * 0.6);
                    for( var i = 0; i < pt.length; i++ ) {
                        var data = pt[i];
                        if(data.x === null){
                            barArea.push([]);
                            return;
                        }
                        var _x0 = null;
                        var _x1 = null;
                        var space = (gridW - barWidth) / 2;
                        var marginBottom = data.y - space;
                        var ypointFirst = marginBottom;
                        var ypointLast = marginBottom - barWidth;
                        ypointFirst = ypointFirst;
                        ypointLast= ypointLast;

                        if(CBARINDEX==0){
                            xpointFirst.push(x0);
                            xpointLast.push(data.x);
                            dataValue.push(oda[i][0]);
                        }else{
                            dataValue[i] = dataValue[i] + oda[i][0];
                            xpointFirst[i] = xpointLast[i];
                            xpointLast[i] = _graphXMapping.getCoordinate(dataValue[i]);
                        }
                        _x0 = xpointFirst[i];
                        _x1 = xpointLast[i];
                        barArea.push([{
                            x: _x0,
                            y: ypointFirst
                        },{
                            x: _x1,
                            y: ypointFirst
                        },{
                            x: _x1,
                            y: ypointLast
                        },{
                            x: _x0,
                            y: ypointLast
                        }]);
                    }
                    CBARINDEX += 1;
                    return barArea;
                };
                var drawColumn = function() {
                    var data = self.data
                        , op = self.options
                        , ctx = self.$ctx
                        , pt = null
                        ;
                    for( var i = 0; i < data.length; i++ ) {
                        var dop = getDefaultOp(op[i]);
                        if( dop.type == 0 ) {
                            pt = calColumnPoints(data[i], dop);
                            data[i].columnPt = pt;
                            ctx.drawBar(pt, 1, "", dop.fillColor);
                        }
                    }
                };
                var drawHColumn = function() {
                    var data = self.data
                        , op = self.options
                        , ctx = self.$ctx
                        , pt = null
                        ;
                    for( var i = 0; i < data.length; i++ ) {
                        var dop = getDefaultOp(op[i]);
                        if( dop.type == 1 ) {
                            pt = calHColumnPoints(data[i],dop);
                            data[i].columnPt = pt;
                            ctx.drawBar(pt, 1, "", dop.fillColor);
                        }
                    }

                };
                var drawText = function() {};
                this.getSubId = function() {
                    return pointer;
                };
                this.setOptions = function( options ) {
                    this.options = options;
                };
                this.setData = function( data ) {
                    this.data = data;
                    this.allBarLen = data.length;
                };
                this.draw = function() {
                    drawColumn();
                    drawHColumn();
                    SVGAnimation.column(CBASELINEPOINT, TARGET.find(".columSerialGraph"), 0);
                };
                Publisher.subscribe("draw", function(){
                    self.draw();
                }, self);
            },
            dot : function( ctx ) {
                var self = this;
                self.$ctx = ctx;
                this.setOptions = function() {};
                this.setData = function() {};
                this.draw = function() {};
            },
            bubble : function( ctx ) {
                var lineG = TARGET.find(".serialGraph");
                var catx = CT.createGroup(lineG, "bubbleSerialGraph");
                $(catx).attr("transform", "translate(0,0) scale(1 1)");
                this.$ctx = new Graphics(catx);
                var self = this;
                var getDefaultOp = function( options ) {
                    var defaultOp = {
                        eachColor:false,
                        radius:1,
                        maxBubbles:5000,
                        strokeWidth: 0,
                        selectStrokeWidth:1,
                        hoverStrokeWidth:1,
                        alpha:0.5,
                        strokeColor: "#333333",
                        hoverStrokeColor:"#333333",
                        hoverColor: "#FF6600",
                        fillColor: "#A3ACC2"
                    };
                    return $.extend( true, {}, defaultOp, options );
                };
                var drawBubbles = function( data, op ) {
                    var pt = data.pt
                        , oda = data.data
                        , bubblePt = []
                        , graphic = self.$ctx
                        ;
                    $.each(pt, function(j, data) {
                        if (data.y === null || data.x === null) {
                            return;
                        }
                        bubblePt.push({
                            x: data.x,
                            y: data.y
                        });
                    });
                    if(op.eachColor === false){
                        var color = $.color.parse(op.fillColor).toString();
                    }
                    $.each(oda, function(j,data) {
                        if(op.eachColor != false){
                            if(typeof(data[5]) === "string"){
                                var color = JColor.parse(data[5]).toString();
                            }
                            else{
                                var color = JColor.parse(op.fillColor).toString();
                            }
                        }
                        if(typeof(data[3]) === "number") {
                            if(typeof bubblePt[j] != "undefined"){
                                graphic.drawBubbles(bubblePt[j],data[3],op.lineColor,0,color,op.alpha);
                            }
                        } else {
                            graphic.drawBubbles(bubblePt[j],op.radius*Math.abs(data[2]), op.lineColor,0,color, op.alpha);
                        }
                    });
                };
                var drawBubble = function() {
                    var data = self.data
                        , op = self.options
                        ;
                    for( var i = 0; i < data.length; i++ ) {
                        var dop = getDefaultOp(op[i]);
                        drawBubbles( data[i], dop );
                    }
                };
                this.getSubId = function() {
                    return pointer;
                };
                this.setOptions = function( options ) {
                    this.options = options;
                };
                this.setData = function( data ) {
                    this.data = data;
                };
                this.draw = function() {
                    drawBubble();
                    SVGAnimation.bubble($CO.CHARTWIDTH * 0.5, $CO.CHARTHEIGHT * 0.5, TARGET.find(".bubbleSerialGraph"));
                };
                Publisher.subscribe("draw", function(){
                    self.draw();
                }, self);
            },
            stacked : function( ctx ) {
                var lineG = TARGET.find(".serialGraph");
                var catx = CT.createGroup(lineG, "stackedSerialGraph");
                $(catx).attr("transform", "translate(0,0) scale(0 1)");
                var self = this;
                this.$ctx = new Graphics(catx);
                var getDefaultOp = function( options ) {
                    var defaultOp = {
                        style: "area",
                        baseLine: null,
                        topTobottom : false,
                        fillColor: "#88FF00FF",
                        marker: {
                            show: false,
                            shape: 4,
                            width: 8,
                            height: 8,
                            color: "#FF00FF"
                        },
                        strokeWidth: 1,
                        strokeColor: "#FFFFFF"
                    };
                    return $.extend( true, {}, defaultOp, options );
                };
                var calStackPoints = function( obj, option ) {
                    //var option = self.options
                    var graphic = self.$ctx
                        , yMapping = YMAPPING[obj.yId]
                        , xMapping = XMAPPING[obj.xId]
                        , y = yMapping.getRange()
                        , newYMapping = new Mapping(yMapping.model)
                        , originalData = obj.data
                        , copyData = $.extend(true, [], originalData)
                        , addData = []
                        , ptdraw = []
                        , rePt = []
                        , _pt = []
                        , _rePt = []
                        ;

                    newYMapping.setRange(y.eCoord, y.sCoord, y.eValue, y.sValue);
                    dataArray.push(originalData);
                    for (var j = 0; j < STACKINDEX; j++) {
                        if (addData.length == 0) {
                            addData = $.extend(true, [], dataArray[j]);
                        } else {
                            for (var k = 0; k < addData.length; k++) {
                                addData[k][2] += dataArray[j][k][2];
                            }
                        }
                    }
                    if (addData.length > 0) {
                        for (var k = 0; k < copyData.length; k++) {
                            copyData[k][2] += addData[k][2];
                        }
                        addData.reverse();
                        copyData = copyData.concat(addData);

                    } else {
                        copyData.push([originalData[originalData.length - 1][0], '', newYMapping.getRange().eCoord]);
                        copyData.push([originalData[0][0], '', newYMapping.getRange().eCoord]);
                    }
                    for (var i = 0; i < originalData.length; i++) {
                        _rePt.push({
                            x: xMapping.getCoordinate(copyData[i][0]),
                            y: newYMapping.getCoordinate(copyData[i][2])
                        });
                    };
                    rePt = _rePt;
                    if(option.style == "bar"){
                        rePt = [];
                        if(option.topTobottom){
                            for (var i = 0; i < originalData.length; i++) {
                                if(i > 0){
                                    rePt.push({
                                        x: xMapping.getCoordinate(copyData[i][0]),
                                        y: newYMapping.getCoordinate(copyData[i-1][2])
                                    });
                                    rePt.push({
                                        x: xMapping.getCoordinate(copyData[i][0]),
                                        y: newYMapping.getCoordinate(copyData[i][2])
                                    });
                                }
                                else{
                                    rePt.push({
                                        x: xMapping.getCoordinate(copyData[i][0]),
                                        y: newYMapping.getCoordinate(copyData[i][2])
                                    });
                                }
                            }
                        }else{
                            for (var i = 0; i < originalData.length; i++) {
                                if(i > 0 && i != originalData.length-1 && option.style == "bar"){
                                    rePt.push({
                                        x: xMapping.getCoordinate(copyData[i][0]),
                                        y: newYMapping.getCoordinate(copyData[i][2])
                                    });
                                    rePt.push({
                                        x: xMapping.getCoordinate(copyData[i][0]),
                                        y: newYMapping.getCoordinate(copyData[i+1][2])
                                    });
                                }
                                else{
                                    rePt.push({
                                        x: xMapping.getCoordinate(copyData[i][0]),
                                        y: newYMapping.getCoordinate(copyData[i][2])
                                    });
                                }
                            }
                        }
                    }
                    $.each(copyData, function(i, v) {
                        ptdraw.push({
                            x: xMapping.getCoordinate(v[0]),
                            y: newYMapping.getCoordinate(v[2])
                        });
                    });
                    var _p = ptdraw;
                    var _l = originalData.length;
                    if(option.style == "bar"){
                        for(var i = 0; i < _l; i++){
                            _pt.push({
                                x: ptdraw[i].x,
                                y: ptdraw[i].y
                            });
                            _pt.push({
                                x: ptdraw[i+1].x,
                                y: ptdraw[i].y
                            });
                        }
                        for(var i = _l; i < ptdraw.length; i++){
                            _pt.push({
                                x: ptdraw[i-1].x,
                                y: ptdraw[i].y
                            });
                            _pt.push({
                                x: ptdraw[i].x,
                                y: ptdraw[i].y
                            });
                        }
                        _p = _pt;
                    }
                    STACKINDEX++;
                    return _p;
                };
                var drawStackBar = function() {
                    var data = self.data;
                    var option = self.options;
                    var ctx = self.$ctx;
                    for( var i = 0; i < data.length; i++ ) {
                        var dop = getDefaultOp(option[i])
                        var pt = calStackPoints( data[i], dop );
                        data[i].stackedPt = pt;
                        data[i].stackedAreaPolygon = pt;
                        var temp = JColor.parse(dop.fillColor);
                        var color = temp.toString();
                        ctx.drawPolygon(pt, dop.strokeWidth, dop.strokeColor, color);
                    }

                };
                this.getSubId = function() {
                    return pointer;
                };
                this.setOptions = function( options ) {
                    this.options = options;
                };
                this.setData = function( data ) {
                    this.data = data;
                };
                this.draw = function() {
                    drawStackBar();
                    SVGAnimation.line($CO.CHARTWIDTH+$CO.LEFT, $CO.CHARTHEIGHT, $(".stackedSerialGraph"));
                };
                Publisher.subscribe("draw", function(){
                    self.draw();
                }, self);
            },
            OHLC : function( ctx ) {
                var OHLCG = TARGET.find(".serialGraph");
                var catx = CT.createGroup(OHLCG, "OHLCSerialGraph");
                $(catx).attr("transform", "translate(0,0) scale(0 1)");
                var self = this;
                this.$ctx = new Graphics(catx);
                var getDefaultOp = function( options ) {
                    var defaultOp = {
                        show : true,
                        lineWidth : 1,
                        lineColor : "#000000",
                        colorRise : "#ff0000",
                        colorFall : "#008000",
                        spaceRate : 0.2,
                        ohlcType : ""
                    };
                    return $.extend(true, {}, defaultOp, options);
                };
                var drawCandlestick = function( option, ptWidth, ptArray ) {
                    var graphic = self.$ctx;
                    var op = option;
                    var pw = ptWidth;
                    var sw = pw * op.spaceRate;
                    var tw = Math.round(pw - sw);
                    //list, width, lineColor, lineWidth, colorRise, colorFall
                    graphic.drawCandlestick(ptArray, tw, JColor.parse(op.lineColor), op.lineWidth, JColor.parse(op.colorRise), JColor.parse(op.colorFall));
                };
                var drawOHLC = function( hasOpen, option, ptWidth, ptArray ) {
                    var graphic = self.$ctx;
                    var op = option;
                    var pa = ptArray;
                    var pw = ptWidth;
                    var sw = pw * op.spaceRate;
                    var tw = Math.round(pw - sw);
                    var hw = tw * 0.5;
                    if (tw < 3) {
                        tw = 1;
                    }
                    var list = [];
                    var mapping = [];
                    for ( var i = 0, len = pa.length; i < len; i++) {
                        var p = pa[i];
                        if (tw != 1) {
                            if (hasOpen) {
                                list.push([p.x - hw, p.o, p.x, p.o]);
                            }
                            list.push([p.x, p.y, p.x + hw, p.y]);
                        }
                        list.push([p.x, p.h, p.x, p.l]);
                        mapping.push([p.x, p.l + (p.h - p.l) * 0.5, i]);
                    }
                    graphic.drawOHLC( list, JColor.parse(op.lineColor), op.lineWidth );
                };
                var draw = function( ) {
                    var data = self.data;
                    var option = self.options;
                    for( var i = 0; i < data.length; i++ ) {
                        var obj = data[i];
                        var dop = getDefaultOp(option[i]);
                        var pt = data[i].pt;
                        var ptWidth = (pt[pt.length - 1].x - pt[0].x) / pt.length;
                        if (dop.ohlcType == "candlestick") {
                            drawCandlestick(dop,ptWidth,pt);
                        } else if (dop.ohlcType == "hlc") {
                            drawOHLC(false,dop,ptWidth,pt);
                        } else {
                            drawOHLC(true,dop,ptWidth,pt);
                        }
                    }
                };
                this.getSubId = function() {
                    return pointer;
                };
                this.setOptions = function( options ) {
                    this.options = options;
                };
                this.setData = function( data ) {
                    this.data = data;
                };
                this.draw = function() {
                    draw();
                    SVGAnimation.line($CO.CHARTWIDTH+$CO.LEFT, $CO.CHARTHEIGHT, TARGET.find(".OHLCSerialGraph"));
                };
                Publisher.subscribe("draw", function(){
                    self.draw();
                }, self);
            },
            fall : function( ctx ) {
                var fallG = TARGET.find(".serialGraph");
                var catx = CT.createGroup(fallG, "fallSerialGraph");
                $(catx).attr("transform", "translate(0,0) scale(1 1)");
                this.$ctx = new Graphics(catx);
                var self = this;
                var descPt = [];
                var getDefaultOp = function( options ) {
                    var defaultOp = {
                        fillColor : "",
                        hoverColor : "",
                        barWidth : null,
                        desc : {
                            show : false
                        }
                    };
                    return $.extend(true, {}, defaultOp, options);
                };
                var calLevelPoint = function( data, op ) {};
                var calConsistPoint = function( data, op ) {
                    var pt = data.pt
                        , temp = null
                        , barArea = []
                        , yMapping = YMAPPING[data.yId]
                        , _graphXMapping = XMAPPING[data.xId]
                        , barArea = []
                        , allLen = self.barDataLen
                        ;

                    descPt = [];
                    var rx = {
                        first: _graphXMapping.getRange().sCoord,
                        second: _graphXMapping.getRange().eCoord
                    };
                    var y0 = yMapping.getCoordinate(yMapping.eValue);
                    BASELINEPOINT = y0;
                    var allLen = 1;
                    var dataNums = allLen;
                    var gridW = CHARTWIDTH / pt.length;
                    leftSpace = (gridW * 0.2);
                    op.leftSpace = leftSpace;
                    var barWidth = (gridW * 0.6) / allLen;
                    if( pt.length < 1 ) {
                        return;
                    }
                    var dataValue = data.data;
                    var totalValue = dataValue[0][2];
                    for( var i = 0; i < pt.length; i++ ) {
                        var data = pt[i];
                        var barPtCollection = [];
                        if (data.y === null) {
                            barArea.push([]);
                            continue;
                        }
                        var _y0 = null;
                        var _y1 = null;
                        var curMax=(i+1)*gridW;
                        var marginLeft=0;
                        var space=(gridW-(barWidth*dataNums))/(dataNums+1);
                        marginLeft=data.x+space;
                        var xpointFirst = marginLeft;
                        var xpointLast = marginLeft+ barWidth;
                        if(xpointLast >= rx.second) {
                            xpointFirst=xpointFirst;
                            xpointLast= xpointLast;
                        } else {
                            xpointFirst=xpointFirst;
                            xpointLast= xpointLast;
                        }
                        if( i == 0 ) {
                            _y0 = y0;
                            _y1 = data.y;
                        }else{
                            _y1 = yMapping.getCoordinate(totalValue);
                            totalValue = totalValue - dataValue[i][2];
                            _y0 = yMapping.getCoordinate(totalValue);
                        }
                        barArea.push([{
                            x: xpointFirst,
                            y: _y0
                        },{
                            x: xpointFirst,
                            y: _y1
                        },{
                            x: xpointLast,
                            y: _y1
                        },{
                            x: xpointLast,
                            y: _y0
                        }]);
                    }
                    return barArea;
                };
                var drawLevelFall = function() {
                    var op = self.options
                        , data = self.data
                        , i = 0
                        ;
                    for( ; i < data.length; i++ ) {

                    }
                };
                var drawConsistFall = function() {
                    var op = self.options
                        , data = self.data
                        , ctx = self.$ctx
                        , i = 0
                        ;
                    for( ; i < data.length; i++ ) {
                        var dop = getDefaultOp(op[i]);
                        var pt = calConsistPoint(data[i], dop);
                        data[i].barPt = pt;
                        ctx.drawBar(pt, 1, "", dop.fillColor);
                    }
                };
                this.setData = function( data ) {
                    this.data = data;
                };
                this.setOptions = function( options ) {
                    this.options = options;
                };
                this.draw = function() {
                    drawLevelFall();
                    drawConsistFall();
                    SVGAnimation.bar(BASELINEPOINT, TARGET.find(".fallSerialGraph"), $CO.ROOTTOP);
                };
                this.getSubId = function() {
                    return $pointer;
                };
                this.hightLight = function( obj ) {
                    var index = obj.index;
                    var target = $CO.TARGET;
                    var graphs = target.find(".fallSerialGraph");
                    var newColor = obj.style.hoverColor;
                    var path = $(graphs).find("rect");
                    for( var i = 0; i < path.length; i++ ){
                        if(typeof $(path[i]).attr("oldfill") != "undefined" ){
                            $(path[i]).attr("fill",$(path[i]).attr("oldfill"));
                        }
                    }
                    var color = $(graphs).find("rect").eq(index).attr("fill");
                    $(graphs).find("rect").eq(index).attr("fill", newColor).attr("oldfill",color);
                };
                Publisher.subscribe("draw", function(){
                    self.draw();
                }, self);
                Publisher.subscribe("publishMouseData", function( data ){
                    self.hightLight(data.s[0]);
                }, self);
            }
        };
        this.getChart = function( type ) {
            return new chart[type](this.$ctx);
        }
    };
    var assemblyData = function( data1, data2 ) {
        if( !$.isArray(data1[0]) ) {
            return data2;
        }
        var step = data1[1][0] - data1[0][1];
        var last = data1[data1.length-1][0] + step;
        if( data2.length < 1) {
            return [[last, "NaN"]];
        }
        var retData = [];
        for( var i = 0; i < data2.length; i++ ) {
            if( !$.isArray( data2[i] ) ) {
                retData.push([(last*i)+last, ((last*i)+last)+"", data2[i]]);
            }else{
                retData.push(data2[i]);
            }
        }
        return retData;
    };
    var SerialChart = function( container, pointer ){
        this.$container = container;
        this.$dataMD = new DataModule();
        this.$charts = [];
        this.$pointer = pointer;
        this.init();
        var self = this;
        Publisher.subscribe("realTimeDataChange", function( arg ) {
            self.RTDChange( arg );
        }, this);
        Publisher.subscribe("moveRight", function( arg ) {
            self.moveRight();
        }, this);
        Publisher.subscribe("moveLeft", function( arg ) {
            self.moveLeft();
        }, this);
        Publisher.subscribe("setDefaultData", function( arg ) {
            self.setDefaultData( arg );
        }, this);
        this.stepIndex = 0;
    };
    SerialChart.prototype = {
        constructor : SerialChart,
        getSubId : function() {
            return this.$pointer;
        },
        init : function() {
            var chartObj = getChartObj(this.$pointer);
            var ct = this.$container;
        },
        cutData : function( data, step ) {
            var retData = [];
            var s = this.stepIndex * step;
            var e = s + step;
            for( var i = 0; i < data.length; i++ ) {
                var temp = null;
                temp = data[i];
                retData.push({
                    xId : temp.xId,
                    yId : temp.yId,
                    dataId : temp.dataId,
                    data : temp.data.length > step ? temp.data.slice(s,e) : temp.data
                });
            }
            return retData;
        },
        adpter : function() {
            var op = this.options
                , data = op.data
                , charts = op.charts
                , i = 0
                , j = 0
                , temp = null
                , chart = null
                ;

            for( ; i < charts.length; i++ ) {
                j = 0;
                chart = null;
                temp = charts[i];
                for( ; j < data.length; j++ ) {
                    if( data[i].dataId == temp.dataId ) {
                        data[i].chartType = temp.type;
                    }
                }
            };
        },
        adpterCD : function( op ) {
            var data = this.chartData
                , temp = null
                , i = 0
                , xaxis = op.coordinate.xaxis
                , yaxis = op.coordinate.yaxis
                , axis = null
                , index
                ;

            for( ; i < data.length; i++ ) {
                temp = data[i];
                index = isInObjectArray( temp.xId, xaxis, "id" );
                if( index != -1 ) {
                    axis = xaxis[index];
                    axis.value = {
                        first : temp.minX,
                        second : temp.maxX
                    }
                }
                axis = null;
                index = isInObjectArray( temp.yId, yaxis, "id" );
                if( index != -1 ) {
                    axis = yaxis[index];
//                    if(axis.value==undefined) {
//                        axis.value = {
//                            first : temp.minY,
//                            second : temp.maxY
//                        }
//                    }
                    axis.value = {
                        first : temp.minY,
                        second : temp.maxY
                    }
                }
            }
            return op;
        },
        adpterData : function() {
            var op = this.options
                , data = op.data
                , charts = op.charts
                , retData = []
                , obj = {}
                , temp = null
                , chart = null
                , CG = new ChartGraphics( this.$ctx, this.$pointer )
                ;
            for( var i = 0; i < charts.length; i++ ) {
                temp = charts[i];
                if( obj[temp.type] == undefined ) {
                    obj[temp.type] = {};
                    obj[temp.type].data = [];
                    obj[temp.type].op = [];
                }
                for( var j = 0; j < data.length; j++ ) {
                    if( temp.dataId == data[j].dataId ) {
                        this.chartData[i].allLen = data.length;
                        this.chartData[i].type = temp.type;
                        this.chartData[i].style = temp.style;
                        obj[temp.type].data.push(this.chartData[i]);
                        obj[temp.type].op.push(temp.style);
                    }
                }
            }
            for( var key in obj ) {
                chart = null;
                if( this.chartObjs[key] == undefined ) {
                    chart = CG.getChart(key);
                    this.chartObjs[key] = chart;
                }else{
                    chart = this.chartObjs[key];
                }
                chart.setOptions(obj[key].op);
                chart.setData(obj[key].data);
            }
        },
        getMousePointData : function(data, evtype){
            var objs = data;
            var s = null;
            var d0 = null , r = null;
            for( var i = 0; i < objs.length; i++ ) {
                var v = objs[i][0];
                if( v == undefined || v.length == 0) {
                    continue;
                }
                if (d0  ===  null) {
                    d0 = v.distance;
                    r = i;
                } else {
                    if (d0 >= v.distance) {
                        d0 = v.distance;
                        r = i;
                    }
                }
            }
            s = objs[r];
            if(s === null || typeof s === "undefined"){
                return;
            }
            var data = {s : s, objs : objs, evtType : evtype};
            Publisher.publish("publishMouseData", data, this);
        },
        findData : function( pt, evtype ) {
            var self = this;
            var p = pt;
            var chartObj = getChartObj(self.$pointer);
            var mRes = [];
            p.x = p.x + chartObj.LEFT;
            setTimeout(function(){
                var res = self.$dataMD.findData( self.chartData, p );
                for( var i = 0; i < self.chartData.length; i++ ) {
                    var temp = null;
                    temp = self.chartData[i];
                    var type = temp.type;
                    var obj = {
                        pt : p,
                        re : res,
                        chartData : temp
                    };
                    if( type == "fall" ) {
                        type = "bar";
                    }
                    var re = getMoustMoveData[type](obj, i);
                    mRes.push(re);
                }
                self.getMousePointData(mRes, evtype);
            },100);
        },
        setOptions : function( options ) {
            this.orangeOptions = CLONE.clone(options);
            this.options = options;
            this.chartObjs = {};
            var data = options.data
                , chartData = null
                , range = null
                , chartObj = getChartObj(this.$pointer)
                ;

            if( options.coordinate.top === true ){
                var ctx = CT.createGroup(this.$container, "serialGraph");
                $(ctx).attr({
                    "transform": "translate("+chartObj.ROOTLEFT+","+chartObj.ROOTTOP+") scale(1 1)"
                });
                this.$ctx = new Graphics(ctx);
                this.$CDN = new Coordinate( this.$container, this.$pointer );
            }else{
                this.$CDN = new Coordinate( this.$container, this.$pointer );
                var ctx = CT.createGroup(this.$container, "serialGraph");
                $(ctx).attr({
                    "transform": "translate("+chartObj.ROOTLEFT+","+chartObj.ROOTTOP+") scale(1 1)"
                });
                this.$ctx = new Graphics(ctx);
            };
            var maxLen = 0;
            for( var i = 0; i < data.length; i++ ) {
                if( maxLen < data[i].data.length ) {
                    maxLen = data[i].data.length;
                }
            }
            this.$isDataEnd = false;
            this.dataMaxLen = maxLen;
            this.graphData = data;
            if( options.Zoom && options.Zoom.show ) {
                this.graphData = this.cutData(data, options.Zoom.step);
                this.step = options.Zoom.step;
            }
            this.create();
        },
        create : function() {
            var op = CLONE.clone(this.orangeOptions);
            var data = this.graphData;
            this.adpter();
            this.$dataMD.setData(data);
            this.chartData = this.$dataMD.getData();
            range = this.$dataMD.getRange();
            op = this.adpterCD(op);
            this.$CDN.setData( this.chartData );
            this.$CDN.setOptions( op.coordinate );
            __mappingData( this.chartData, this.$pointer );
            this.adpterData();
        },
        refresh : function() {

        },
        moveLeft : function() {
            if( this.stepIndex == 0 ) {
                return;
            };
            this.$isDataEnd = false;
            var op = this.options;
            var orangeData = this.orangeOptions.data;
            var step = this.step;
            var start = 0;
            var during = 20;
            var self = this;
            var _run = function( id ) {
                var chartData = [];
                start++;
                var gap = Math.round(Tween.Linear(start, 0, step, during));
                var e = (self.stepIndex + 1) * step - gap;
                var s = e - step;
                if( start < during && s >= 0 ) {
                    for( var i = 0; i < orangeData.length; i++ ) {
                        var temp = orangeData[i];
                        chartData.push({
                            xId : temp.xId,
                            yId : temp.yId,
                            dataId : temp.dataId,
                            data : temp.data.slice(s,e)
                        });
                    }
                    self.graphData = chartData;
                    self.create();
                    Publisher.publish("RTDChange", self);
                    requestAnimationFrame(_run);
                }else{
                    self.stepIndex--;
                    cancelAnimationFrame(id);
                }
            };
            requestAnimationFrame(_run);
        },
        moveRight : function() {
            if( this.$isDataEnd ) {
                return;
            }
            var op = this.options;
            var orangeData = this.orangeOptions.data;
            this.stepIndex++;
            var step = this.step;
            var start = 0;
            var during = 20;
            var self = this;
            var _run = function( id ) {
                var chartData = [];
                start++;
                var gap = Math.round(Tween.Linear(start, 0, step, during));
                var s = (self.stepIndex-1) * step + gap;
                var e = s + step;
                if( start < during && e <= self.dataMaxLen ) {
                    for( var i = 0; i < orangeData.length; i++ ) {
                        var temp = orangeData[i];
                        chartData.push({
                            xId : temp.xId,
                            yId : temp.yId,
                            dataId : temp.dataId,
                            data : temp.data.slice(s,e)
                        });
                    }
                    self.graphData = chartData;
                    self.create();
                    Publisher.publish("RTDChange", self);
                    requestAnimationFrame(_run);
                }else{
                    if( e >= self.dataMaxLen ) {
                        self.$isDataEnd = true;
                        Publisher.publish("rightEnd", self);
                    }
                    cancelAnimationFrame(id);
                }
            };
            requestAnimationFrame(_run);
        },
        RTDChange : function( arg ) {
            var data = arg.data;
            var flg = arg.flg;
            var op = this.options;
            var orangeData = this.orangeOptions.data;
            var chartData = this.chartData;
            if( flg != true ) {
                chartData = op.data;
            };
            if( !$.isArray( data ) ) {
                data = [data];
            }
            for( var i = 0; i < data.length; i++ ) {
                var temp = null;
                temp = data[i];
                var tempData = temp.data;
                var index = isInObjectArray( temp.dataId, chartData, "dataId" );
                if( index != -1 ) {
                    tempData = assemblyData(chartData[index].data, tempData);
                    if( flg === true ) {
                        orangeData[index].data = orangeData[index].data.concat(tempData);
                        chartData[index].data = chartData[index].data.concat(tempData);
                        //orangeData[index].data.shift();
                        chartData[index].data.shift();
                    }else{
                        orangeData[index].data = orangeData[index].data.concat(tempData);
                        chartData[index].data = orangeData[index].data.concat(tempData);
                    }
                }
            }
            this.graphData = chartData;
            this.create();
            Publisher.publish("RTDChange", this);
        },
        setDefaultData : function( arg ) {
            if( arg == undefined || arg == null ) {
                return;
            }
            var index = arg.index;
            var id = arg.dataId;
            var data = this.chartData;
            var obj = null;
            for( var i = 0; i < data.length; i++ ) {
                var temp = data[i];
                if( temp.dataId == id ) {
                    obj = temp;
                    obj.index = index;
                    break;
                }
            }
            Publisher.publish("setHightLight", obj, this);
        }
    };
    /*************/
    /*PIECHART*/
    function Turntable(el, options) {
        if (this === window) {
            return new Turntable(el, options);
        }

        // 参数校验
        var tempDOM = document.createElement("div")
            , prefixRotate = ["webkit", "moz", "o", "ms"]
            , rotateKey
            ;
        for (var i = 0, l = prefixRotate.length; i < l; i += 1) {
            if (prefixRotate[i] +"Transform" in tempDOM.style) {
                rotateKey = prefixRotate[i] +"Transform"
                break;
            }
        }
        tempDOM = null;

        options = options || {};
        this.el = el;
        this.currRotate = options.currRotate || 0;
        this.rotateKey = rotateKey || "transform";
        this.arrRoate = options.arrRoate;
    };
    Turntable.fn = Turntable.prototype;
    Turntable.fn.create = function () {

    };
    Turntable.fn.getRotate = function (el) {
        var value = el.style[this.rotateKey] || 0;
        if (typeof value === "string") {
            value = value.match(/rotate\(([-\d.]+)deg\)/);
            if (value) {
                value = value[1];
            }
        }
        return parseInt(value) % 360;
    };
    Turntable.fn.setRotate = function (el, value) {
        value = value % 360;    // 去掉圈数
        el.style[this.rotateKey] = "rotate("+ value +"deg)";
    };
    Turntable.fn.transRotate = function (value) {
        var i, l, item
            , arrRoate = this.arrRoate
            , temp
            ;

        value = Number(value);

        temp = value <= 0 ? Math.abs(value) : 360 - value;

        for (i = 0, l = arrRoate.length; i < l; i += 1) {
            item = arrRoate[i];
            if (item[0] <= temp && item[1] > temp) {
                temp = parseInt((item[0] + item[1]) / 2);
                break;
            }
        }

        return value <= 0 ? -temp : 360 - temp;
    };
    Turntable.fn.posRotate = function (target, angle) {

        var currRotate = this.transRotate(angle || 0);
        this.setRotate(target, currRotate);
        this.currRotate = currRotate;
    };
    // 滚动
    Turntable.fn.turn = function (el, rotate, velocity, callback) {
        var that = this
            , start = 0
            , during = 100
            , tempRotate = 360 * Math.ceil(velocity) / 2    // 根据velocity大小，添加转动圈数
            , befRotate = that.getRotate(el)
            , _run
            ;
        console.log(rotate);

        // 根据方向，控制添加圈数的方向，转动比之前小，则按顺时针添加转动圈数，反则同理
        tempRotate = befRotate > rotate ? tempRotate + rotate : -tempRotate + rotate;

        callback = callback || function () {};

        _run = function() {
            start++;
            var animRotate = Tween.Quart.easeOut(start, befRotate, tempRotate, during);
            animRotate = parseInt(animRotate);
            that.setRotate(el, animRotate);
            if (start < during) {
                el._turnId = requestAnimationFrame(_run);
            } else {
                el._turnId = null;
                callback();
            }
        };
        _run();
    };
    // 停止滚动
    Turntable.fn.stopTurn = function (el) {
        var turnId = el._turnId;
        if (turnId) {
            cancelAnimationFrame(turnId);
            el._turnId = null;
        }
    };
    var calArcPath = function(ptCenter,radius,beginArc,endArc) {
        if (endArc < beginArc){
            var tmp = beginArc;
            beginArc = endArc;
            endArc = tmp;
        }
        var startX = ptCenter.x + radius * Math.cos(beginArc);
        var startY = ptCenter.y - radius * Math.sin(beginArc);
        var endX = ptCenter.x + radius * Math.cos(endArc);
        var endY = ptCenter.y - radius * Math.sin(endArc);
        var pointPath = "M " + ptCenter.x + " " + ptCenter.y;
        pointPath += " L " + startX + " " + startY;
        if (endArc - beginArc >= Math.PI){
            pointPath += " A " + radius + " " + radius + " 0 1 0 ";
        }else{
            pointPath += " A " + radius + " " + radius + " 0 0 0 ";
        }
        pointPath += endX + " " + endY;
        pointPath += " L " + ptCenter.x + " " + ptCenter.y + " Z";
        return pointPath;
    };
    var PieChart = function( containerDOM, pointer, radius ) {
        this.$pointer = pointer;
        this.radius = 0;
        this.outContainer = containerDOM;
        this.dataSource = null;
        this.reservedPix = 10;
        this._option = {
            showBorder:true,
            borderColor:"#cccccc"
        };
        var me = this;
        if (radius) {
            if (isNaN(parseFloat(radius))) {
                throw "invalid radius " + radius;
            } else {
                this.radius = radius;
            }
        } else {
            this.radius = 150;
        }
        var CO = getChartObj(pointer);
        var rootWIDTH = CO.ROOTWIDTH;
        if(CO.ROOTHEIGHT > rootWIDTH){
            this.radius = rootWIDTH * 0.5;
        }else{
            this.radius = CO.ROOTHEIGHT * 0.5;
        }
        this.radius = this.radius - 5;
        if (containerDOM) {
            this.container = containerDOM;
            this.canvas = this.container.get(0);
        }
        this.chartPlace = $('<div class="chartPlace"></div>').appendTo(this.outContainer);
        this.bottomTextPlace = $('<div class="bottomeText ui-center" style="text-align:center;display:none;width:100%;;height:40px">TEXT AREA</div>').appendTo(this.outContainer);
        var canvasWidth = 2 * this.radius + this.reservedPix;
        this.targetHolder = CT.create(this.chartPlace, "relative", 0, 0, this.outContainer.width(), this.outContainer.height());
        this.createHolder();
        this.rotate = [];
        var self = this;
        Publisher.subscribe("draw", function(){
            self.draw();
        }, self);
    };
    PieChart.prototype = {
        getSubId : function() {
            return this.$pointer;
        },
        createHolder : function() {
            //this.bgGroup = CT.createGroup(this.targetHolder, "bgGraph", "none", 0, "none");
            //this.btGraphic = new Graphics(this.bgGroup);
            var chartObj = getChartObj(this.$pointer);
            this.chartGroup = CT.createGroup(this.targetHolder, "graph", "none", 0, "none");
            this.iconGroup = CT.createGroup(this.targetHolder, "iconGraph", "none", 0, "none");
            this.textGroup = CT.createGroup(this.targetHolder, "textGraph", "none", 0, "none");
            this.insideGroup = CT.createGroup(this.targetHolder, "insideGraph", "none", 0, "none");
            this.insideGraphic = new Graphics(this.insideGroup);
            this.graphic = new Graphics(this.chartGroup);
            this.iconGraphic = new Graphics(this.iconGroup);
            this._canvasRef = $(this.targetHolder);
            this._graphics = new  Graphics(this.chartGroup);
            this.tooltipGroup = CT.createGroup(this.targetHolder, "tooltips", "none", 0, "none");
            this.tooltips = new Graphics(this.tooltipGroup);
        },
        getCenter : function () {
            var width = this._canvasRef.height(),height = this._canvasRef.height();
            if( height == 0 ) {
                height = this.outContainer.height();
            }
            if( width == 0 ) {
                width = this.outContainer.width();
            }
            var align = this.options.align;
            if( align == "left" ) {
                return {
                    x: this.radius,
                    y: height * 0.5
                };
            }else{
                return {
                    x: this.radius,
                    y: height * 0.5
                };
            }
        },
        calDataAngle : function( total ) {
            var data = this.data;
            var angle = [];
            for(var i = 0; i < data.length; i++){
                if(i==0){
                    angle.push(((data[i][1]/total)*360)*0.5);
                }else{
                    angle.push(((data[i][1]/total)*360));
                }
            }
            this.angle = angle;
        },
        setData : function( data ) {
            if(!$.isArray(data)){
                return;
            };
            this.data = data;
            var beginArc = -0.5; // * Math.PI;
            var centerBArc = -0.5;
            var centerEArc = 1.50
            var center = [];
            var endArc = 1.50; // * Math.PI;
            var total = 0;
            this.busiData = [];
            var radius = this.radius;
            var ptCenter = this.getCenter();
            var rotate = [];
            var me = this;
            $.each(data, function(i, c) {
                floatValue = parseFloat(data[i][1]);
                if (isNaN(floatValue)) {
                    throw ("Invalid data, need numper")
                }
                data[i][1] = floatValue;
                total += data[i][1];
            });
            var angle = 0;
            var arcDegree = data[0][1] / total * 2;
            beginArc = beginArc - arcDegree * 0.5;
            endArc = beginArc;
            centerEArc = centerBArc;
            this.calDataAngle(total);
            var self = this;
            var beginAngle = 0, percent
                , endAngle;
            $.each(data, function(i, c) {
                if( data[i][1]!=0 ){
                    percent = data[i][1] / total;
                    endAngle = beginAngle + 2 * Math.PI * percent;
                    var pecentage = ((data[i][1] / total).toFixed(2)) + "%";
                    var arcDegree = c[1] / total * 2;
                    endArc += arcDegree;
                    centerEArc += arcDegree;
                    angle = ((endArc) * 180);
                    me.busiData.push([
                        data[i][0],
                        data[i][1],
                        JColor.parse(data[i][2]),
                            beginArc * Math.PI,
                            endArc * Math.PI,
                            (endArc - arcDegree*0.5)* Math.PI,
                        pecentage,
                            centerBArc * Math.PI,
                            (centerEArc - arcDegree)* Math.PI
                    ]);
                    self.rotate[self.rotate.length] = [beginAngle * 180 / Math.PI, endAngle * 180 / Math.PI];
                    beginArc = endArc;
                    centerBArc = centerEArc;
                    beginAngle = endAngle;
                }
            });
        },
        setOptions : function( oOption ) {
            var opts = oOption.chart;
            var data = oOption.data;
            if (!opts) {
                return;
            };
            this.options = opts;
            this.setData(data);
            if( opts.align == "center" ) {
                var w = this._canvasRef.width(),h = this._canvasRef.height(), r= this.radius;
                var lf = (w) * 0.5 - r;
                $(this.chartGroup).attr({
                    "transform": "translate("+lf+",0) scale(1 1)"
                });
                $(this.insideGroup).attr({
                    "transform": "translate("+lf+",0) scale(1 1)"
                });
            }
        },
        draw : function() {
            var ptCenter = this.getCenter();
            var tmpBusiData = this.busiData;
            var lines = [];
            var self = this;
            var data = tmpBusiData.slice(0);
            for( var i = 0; i < data.length; i++ ){
                var temp = data[i];
                // ptCenter, radius, beginArc, endArc, strokeColor, strokeWidth, fillColor
                self._graphics.drawArc(ptCenter, self.radius, temp[3], temp[4], JColor.parse("#60cccccc").toString(), 0, temp[2].toString());
            }
            this.drawBottomText();
            //this.drawBg();
            this.drawInsideC();
            this.bindEvent();
        },
        clear : function() {
            $(this.chartGroup).remove();
            $(this.iconGroup).remove();
            $(this.textGroup).remove();
            $(this.insideGroup).remove();
            $(this.tooltipGroup).remove();
            this.createHolder();
        },
        drawBg : function() {
            this.btGraphic.drawCircle(this.getCenter(), this.radius+3, "#ccc", 2, "#ccc", 0.5);
        },
        drawText : function() {
            var data = this.busiData;
            //var path = $("#graph").find("path");
            var center = this.getCenter();
            this.insideGraphic.setNormalFill("#fff");
            for(var i = 0; i < data.length; i++){

            }
        },
        drawBottomText : function() {
            return;
            var data = this.busiData;
            var current = data[0];
            var place = this.bottomTextPlace;
            var color = current[2].toString();
            var htm = ''+
                '<span style="color:'+color+'; font-size:20px;">￥'+current[1]+'</span>'+
                '<span class="currentName" style="color:#ccc;font-size:12px;display:block;position:relative;top:0px;">'+current[0]+'</span>'+
                '<a href="#"><span class="ui-inter-infos"></span></a>';
            place.html(htm).show();
            var op = this.options;
            if(typeof op.down != "undefined" && !op.down){
                this.container.find('.ui-inter-infos').hide();
            }
            if(typeof op.downCb != "undefined"){
                if($.isFunction(op.downCb)){
                    op.downCb();
                }
            }
        },
        drawInsideC : function() {
            var op = this.options;
            var it = op.totalText;
            var its = it.split(":");
            this.insideGraphic.drawCircle(this.getCenter(), this.radius * 0.4, "#ccc", 0, "#fff", 0.3);
            var top = -20;
        },
        reDraw : function( currentData ) {
            var data = this.data;
            var newData = [];
            var index = 0;
            var flg = false;
            for( var i = 0; i < data.length; i++){
                if(flg || data[i][0] == currentData[0]){
                    if( i == 0) {
                        break;
                    }
                    if(!flg){
                        index = i;
                    }
                    flg = true;
                    newData.push(data[i]);
                }
            };
            if(newData.length == 0){
                return;
            }
            for(var i = 0; i < index; i++) {
                newData.push(data[i]);
            }
            this.clear();
            this.setData(newData);
            this.draw();
        },
        calAngle : function( index ) {
            var angle = this.angle;
            var rangle = angle[index]*0.5;
            for( var i = 0; i < index; i++ ){
                rangle += angle[i];
            }
            return rangle;
        },
        hightLight : function( p ) {
            var op = this.options;
            var index = p.index();
            var data = this.data;
            var paths = this.outContainer.find(".graph").find("path");
            var newColor = "";
            if( data[index][3]) {
                newColor = JColor.parse(data[index][3]).toString();
            }else if(op.hoverColor){
                newColor = JColor.parse(op.hoverColor).toString();
            }
            if( newColor == "" ) {
                return;
            }
            for( var i = 0; i < paths.length; i++ ){
                if(typeof $(paths[i]).attr("oldfill") != "undefined" ){
                    $(paths[i]).attr("fill",$(paths[i]).attr("oldfill"));
                }
            }
            var color = $(p).attr("fill");
            $(p).attr("fill", newColor).attr("oldfill",color);
        },
        clickHandle : function( p, ev ) {
            var self = this;
            var click = self.options.clickFn;
            var data = self.data;
            var id = $(p).index();
            var clickData = null;
            for( var i = 0; i < data.length; i++ ){
                if(i == id){
                    clickData = data[i];
                    break;
                }
            };
            if(i==0){
                click.call( this, clickData );
                return;
            }
            var angle = self.calAngle(i);
            value = angle;
            //knd.nativeAudio('pieSwitch');
            $(self.chartGroup).rotate({animateTo:value});
            setTimeout(function(){
                self.reDraw(clickData);
            },1000);
            if($.isFunction(click)){
                click.call( this, clickData )
            };
        },
        bindEvent : function() {
            var self = this;
            var hammerContainer = this.outContainer.find(".graph")[0];
            var turntable = Turntable(hammerContainer, {
                arrRoate: self.rotate
            });
            var center = this.getCenter();
            var data = self.data;
            $(hammerContainer).css({
                "-webkit-transform-origin": ""+center.x+" "+center.y+"",
                "transform-origin" : ""+center.x+" "+center.y+""
            });
            var hammer = new Hammer(hammerContainer);
            hammer.on('touch release dragleft dragright dragup dragdown swipeleft swiperight swipeup swipedown', handler);
            function handler( ev ) {
                var currentTarget = ev.currentTarget
                    , currRotate = turntable.currRotate
                    , gesture = ev.gesture
                    ;
                if (currentTarget) {
                    switch(ev.type){
                        // 拖动
                        //case 'dragleft':
                        case 'dragright':
                            turntable.stopTurn(currentTarget);
                            var deltaX =  gesture.deltaX;

                            // // 判断鼠标位置在左边还是右边，用于改变值的方向
                            // if (gesture.srcEvent.offsetY < currentTarget.offsetHeight / 2) {
                            //  deltaX = deltaX < 0 ? Math.abs(deltaX) : -deltaX;
                            //  console.log("up:" + deltaX);
                            // } else {
                            //  console.log("down:"+ deltaX);
                            // }
                            var xCurrRotate = currRotate + deltaX;
                            turntable.setRotate(currentTarget, xCurrRotate);
                            currentTarget.isRelease = true;
                            break;
                        case 'dragdown':
                        case 'dragup':
                            turntable.stopTurn(currentTarget);
                            var deltaY = gesture.deltaY;
                            // // 判断鼠标位置在左边还是右边，用于改变值的方向
                            // if (gesture.srcEvent.offsetX < currentTarget.offsetWidth / 2) {
                            //  deltaY = deltaY < 0 ? Math.abs(deltaY) : -deltaY;
                            //  console.log("left:" + deltaY);
                            // } else {
                            //  console.log("right:"+ deltaY);
                            // }

                            yCurrRotate = currRotate + deltaY;
                            turntable.setRotate(currentTarget, yCurrRotate);
                            currentTarget.isRelease = true;
                            break;
                        // 滑动，需要算速度
                        case 'swipeleft':
                        case 'swiperight':
                            currentTarget.isRelease = false;
                            var xCurrRotate = currRotate + gesture.deltaX;
                            xCurrRotate = Math.min(xCurrRotate, 800 + parseInt(Math.random() * 360));   // 最大滚动值在800 + 随机波动，防止用力一划，每次都是一样
                            turntable.turn(currentTarget, xCurrRotate, gesture.velocityX + gesture.velocityY, function () {
                                currentTarget.className = currentTarget.className +" animate";
                                currRotate = turntable.getRotate(currentTarget);
                                turntable.posRotate(currentTarget, currRotate);
                                currentTarget.isRelease = true;
                            });

                            consoleTest(ev.type +", currRotate:"+ currRotate +", deltaX:"+ xCurrRotate +", velocity:"+ (gesture.velocityX + gesture.velocityY));
                            break;
                        case 'swipedown':
                        case 'swipeup':
                            currentTarget.isRelease = false;
                            var yCurrRotate = currRotate + gesture.deltaX;
                            yCurrRotate = Math.min(yCurrRotate, 800 + parseInt(Math.random() * 360));   // 最大滚动值在800 + 随机波动，防止用力一划，每次都是一样
                            turntable.turn(currentTarget, yCurrRotate, gesture.velocityX + gesture.velocityY, function () {
                                currentTarget.className = currentTarget.className +" animate";
                                currRotate = turntable.getRotate(currentTarget);
                                turntable.posRotate(currentTarget, currRotate);
                                currentTarget.isRelease = true;
                            });

                            break;
                        case 'release':
                            if (currentTarget.isRelease) {
                                currentTarget.className = currentTarget.className +" animate";
                                currRotate = turntable.getRotate(currentTarget);
                                turntable.posRotate(currentTarget, currRotate);
                            }
                            break;
                    }
                }
            };
            Events.bindEvent(this.outContainer, "path", "mousemove", function( p, ev ){
                self.hightLight(p);
            });
            Events.bindEvent(this.outContainer, "path", "tap", function( p, ev ){
                self.clickHandle(p, ev);
            });
        }
    };
    /*END******/
    var Annulus = function( containerDOM, pointer ) {
        this.$pointer = pointer;
        this.$target = containerDOM;
        var width = containerDOM.width();
        var height = containerDOM.height();
        var CO = getChartObj(pointer);
        var rootWIDTH = CO.ROOTWIDTH;
        var rootHEIGHT = CO.ROOTHEIGHT;
        if(rootHEIGHT > rootWIDTH){
            this.radius = rootWIDTH * 0.5;
        }else{
            this.radius = rootHEIGHT * 0.5;
        }
        this.radius = this.radius - 5;
        this.init();
        var self = this;
        Publisher.subscribe("draw", function(){
            self.draw();
        }, self);
    };
    Annulus.prototype = {
        constructor : Annulus,
        init : function() {
            var target = this.$target;
            this.targetHolder = CT.create(target, "relative", 0, 0, target.width(), target.height());
            this.bgGroup = CT.createGroup(this.targetHolder, "bgGraph", "none", 0, "none");
            this.btGraphic = new Graphics(this.bgGroup);
            this.chartGroup = CT.createGroup(this.targetHolder, "annulusGraph", "none", 0, "none");
            this.$ctx = new Graphics(this.chartGroup);
            this.insideGroup = CT.createGroup(this.targetHolder, "insideGraph", "none", 0, "none");
            this.insideGraphic = new Graphics(this.insideGroup);
            this.textGroup = CT.createGroup(this.targetHolder, "textGraph", "none", 0, "none");
            this.textGraphic = new Graphics(this.textGroup);
        },
        getCenter : function() {
            var CO = getChartObj(this.$pointer);
            var rootWIDTH = CO.ROOTWIDTH;
            var rootHEIGHT = CO.ROOTHEIGHT;
            var align = this.options.align;
            if( align == "left" ) {
                return {
                    x: this.radius,
                    y: rootHEIGHT * 0.5
                };
            }else{
                return {
                    x: rootWIDTH * 0.5,
                    y: rootHEIGHT * 0.5
                };
            }
        },
        mappingData : function() {
            var data = this.data;
            if(!$.isArray(data)){
                return;
            };
            var beginArc = 0.5; // * Math.PI;
            var endArc = 1.50; // * Math.PI;
            var total = 1;
            var radius = this.radius;
            var ptCenter = this.getCenter();
            var arcDegree = data[0][1] / total * 2;
            endArc = beginArc;
            var annulusData = [];
            var subData = [];
            var me = this;
            $.each(data, function(i, c) {
                if( c[1] != 0 ) {
                    var arcDegree = c[1] / total * 2;
                    endArc += arcDegree;
                    //                angle = ((endArc) * 180);
                    annulusData.push([
                        JColor.parse(data[i][2]),
                            beginArc * Math.PI,
                            endArc * Math.PI
                    ]);
                    if( $.isArray( c[3] ) ) {
                        var _beginArc = beginArc;
                        var _endArc = _beginArc;
                        var _total = c[1];
                        for( var j = 0; j < c[3].length; j++ ) {
                            var _tp = c[3][j];
                            if( _total == 1 && _tp[1] == 1 ) {
                                _tp[1] = 0.9999;
                            }
                            var arcDegree = ( _tp[1] *_total ) / total * 2;
                            _endArc += arcDegree;
                            subData.push([
                                JColor.parse(_tp[2]),
                                    _beginArc * Math.PI,
                                    _endArc * Math.PI
                            ]);
                            _beginArc = _endArc;
                        }
                    }
                    beginArc = endArc;
                }
            });
            this.busiData = annulusData;
            this.subData = subData;
        },
        getSubId : function() {
            return this.$pointer;
        },
        setData : function( data ) {
            this.data = data;
            this.mappingData();
        },
        setOptions : function( options ) {
            var op = options.chart;
            var defualtOptions = {
                color : "",
                hoverColor : "",
                text : "",
                width : null
            };
            this.options = $.extend( true, {}, defualtOptions, op );
            this.setData( options.data );
        },
        drawBg : function() {
            this.btGraphic.drawCircle(this.getCenter(), this.radius, "#ccc", 2, "#ccc", 0.5);
        },
        drawInsideC : function() {
            this.insideGraphic.drawCircle(this.getCenter(), this.radius * 0.75, "#ccc", 0, "#fff", 0);
        },
        drawPecentage : function() {
            var w = (this.radius * 0.25) * (1/3);
            var r = this.radius - w;
            var data = this.subData;
            var ctx = this.$ctx;
            var ptCenter = this.getCenter();
            for( var i = 0; i < data.length; i++ ){
                var temp = data[i];
                ctx.drawArc(ptCenter, r, temp[1], temp[2], JColor.parse("#60cccccc").toString(), 0, temp[0].toString(), w);
            }
        },
        drawGap : function() {
            var op = this.options;
            var ctx = this.$ctx;
            var bData = this.busiData;
            var ptCenter = this.getCenter();
            var radius = this.radius;
            for( var i = 0; i < bData.length; i++ ) {
                var temp = bData[i];
                var startX = ptCenter.x + radius * Math.cos(temp[1]);
                var startY = ptCenter.y - radius * Math.sin(temp[1]);
                ctx.drawLine(ptCenter, {x: startX, y : startY}, JColor.parse(op.borderColor).toString(), op.border);
            }
        },
        drawText : function( text, color ) {
            if( text == undefined ) {
                return;
            }
            $(this.$target).find(".textGraph").find("text").remove();
            var op = this.options;
            var center = this.getCenter();
            var it = text;
            var its = it.split(":");
            if( its.length == 1 ) {
                var obj = __calLabelWH(its[0], op.textCss[0]);
                var text = this.textGraphic.drawText(its[0], center.x - (obj.w * 0.5), center.y);
                $(text).css(op.textCss[0]);
                if( color != undefined ) {
                    $(text).attr("fill", color);
                }
            }else if( its.length == 2 ) {
                var obj1 = __calLabelWH(its[0], op.textCss[0]);
                var obj2 = __calLabelWH(its[1], op.textCss[1]);
                var h = (obj2.h) * 0.5;
                var text1 = this.textGraphic.drawText(its[0], center.x - (obj1.w * 0.5), center.y - h);
                $(text1).css(op.textCss[0]);
                $(text1).attr("fill", color);
                var text2 = this.textGraphic.drawText(its[1], center.x - (obj2.w * 0.5), center.y + h);
                $(text2).css(op.textCss[1]);
                $(text2).attr("fill", color);
            }
        },
        drawTextCirle : function() {
            var op = this.options;
            var center = this.getCenter();
            this.textGraphic.drawCircle(center, this.radius * 0.65, "#ccc", 1, "#fff", 0);
            this.drawText(op.text, op.textColor);
        },
        draw : function() {
            if( !this.options.showBorder ) {
                this.drawBg();
            }
            var self = this;
            var ctx = this.$ctx;
            var data = this.busiData;
            var ptCenter = this.getCenter();
            for( var i = 0; i < data.length; i++ ){
                var temp = data[i];
                ctx.drawArc(ptCenter, self.radius, temp[1], temp[2], JColor.parse("#60cccccc").toString(), 0, temp[0].toString());
            }
            this.drawInsideC();
            this.drawPecentage();
            this.drawTextCirle();
            this.drawGap();
            //this.bindEvent();
        },
        hightLight : function(p) {
            var op = this.options;
            var index = p.index();
            var data = this.data;
            var paths = this.$target.find(".annulusGraph").find("path");
            var newColor = "";
            if( $.isFunction( op.mouseMove ) ) {
                var text = op.mouseMove(data[index]);
                this.drawText(text, data[index][2]);
            }
            if( data[index][3]) {
                newColor = JColor.parse(data[index][3]).toString();
            }else if(op.hoverColor){
                newColor = JColor.parse(op.hoverColor).toString();
            }
            if( newColor == "" ) {
                return;
            }
            for( var i = 0; i < paths.length; i++ ){
                if(typeof $(paths[i]).attr("oldfill") != "undefined" ){
                    $(paths[i]).attr("fill",$(paths[i]).attr("oldfill"));
                }
            }
            var color = $(p).attr("fill");
            $(p).attr("fill", newColor).attr("oldfill",color);
        },
        clickHandle : function( p ) {
            var self = this;
            var click = self.options.clickFn;
            var data = self.data;
            var id = $(p).index();
            var clickData = null;
            for( var i = 0; i < data.length; i++ ){
                if(i == id){
                    clickData = data[i];
                    break;
                }
            };
            if(i==0){
                if($.isFunction(click)){
                    click.call( this, clickData )
                };
                return;
            }
            if($.isFunction(click)){
                click.call( this, clickData )
            };
        },
        bindEvent : function() {
            var self = this;
            Events.bindEvent(this.$target, "path", "mousemove", function( p, ev ){
                self.hightLight(p);
            });
            Events.bindEvent(this.$target, "path", "tap", function( p, ev ){
                self.clickHandle(p, ev);
            });
        }
    };
    var Radar = function( containerDOM, pointer ) {
        this.$target = containerDOM;
        this.$pointer = pointer;
        var CO = getChartObj(pointer);
        var rootWIDTH = CO.ROOTWIDTH;
        var rootHEIGHT = CO.ROOTHEIGHT;
        if(rootHEIGHT > rootWIDTH){
            this.radius = rootWIDTH * 0.5;
        }else{
            this.radius = rootHEIGHT * 0.5;
        }
        this.radius = this.radius - 5;
        this.init();
        var self = this;
        Publisher.subscribe("draw", function(){
            self.draw();
        }, self);
    };
    Radar.prototype = {
        constructor : Radar,
        getSubId : function() {
            return this.$pointer;
        },
        getCenter : function() {
            var CO = getChartObj(this.$pointer);
            var rootWIDTH = CO.ROOTWIDTH;
            var rootHEIGHT = CO.ROOTHEIGHT;
            var align = this.options.align;
            if( align == "left" ) {
                return {
                    x: this.radius,
                    y: rootHEIGHT * 0.5
                };
            }else{
                return {
                    x: rootWIDTH * 0.5,
                    y: rootHEIGHT * 0.5
                };
            }
        },
        init : function() {
            var target = this.$target;
            this.targetHolder = CT.create(target, "relative", 0, 0, target.width(), target.height());
            this.bgGroup = CT.createGroup(this.targetHolder, "radarBgGraph", "none", 0, "none");
            this.btGraphic = new Graphics(this.bgGroup);
            this.chartGroup = CT.createGroup(this.targetHolder, "radarGraph", "none", 0, "none");
            this.$ctx = new Graphics(this.chartGroup);
        },
        mappingData : function( data ) {
            if(!$.isArray(data)){
                return;
            };
            var beginArc = 0.5; // * Math.PI;
            var endArc = 1.50; // * Math.PI;
            var total = data.length;
            var radius = this.radius;
            var ptCenter = this.getCenter();
            var arcDegree = data[0][1] / total * 2;
            endArc = beginArc;
            var radarData = [];
            var me = this;
            $.each(data, function(i, c) {
                var arcDegree =  1 / total * 2;
                endArc += arcDegree;
                radarData.push([
                        beginArc * Math.PI,
                        endArc * Math.PI
                ]);
                beginArc = endArc;
            });
            this.busiData = radarData;
        },
        calPoints : function( radius, beginArc, endArc ) {
            var ptCenter = this.getCenter();
            if (endArc < beginArc){
                var tmp = beginArc;
                beginArc = endArc;
                endArc = tmp;
            }
            var startX = ptCenter.x + radius * Math.cos(beginArc);
            var startY = ptCenter.y - radius * Math.sin(beginArc);
            var endX = ptCenter.x + radius * Math.cos(endArc);
            var endY = ptCenter.y - radius * Math.sin(endArc);
            var points = [];
            points.push({
                x : ptCenter.x,
                y : ptCenter.y
            },{
                x : startX,
                y : startY
            },{
                x : endX,
                y : endY
            });
            return points;
        },
        setPolarData : function( data ) {
            this.polarData = data;
            this.mappingData(data);
        },
        setData : function( data ) {
            this.data = data;
        },
        setOptions : function( options ) {
            var op = options.chart;
            if( op.radius ) {
                this.radius = op.radius;
            }
            var defaultOp = {};
            this.options = $.extend( true, {}, defaultOp, op );
            this.setPolarData(op.polar);
            this.setData(options.data);
        },
        drawBg : function() {
            var data = this.busiData;
            var radius = this.radius;
            var textPoints = [];
            var ptCenter = this.getCenter();
            for( var k = 5; k > 0; k-- ) {
                var points = [];
                var _radius = radius * (k / 5);
                for( var i = 0; i < data.length; i++ ) {
                    var endArc = data[i][1];
                    var beginArc = data[i][0];
                    if (endArc < beginArc){
                        var tmp = beginArc;
                        beginArc = endArc;
                        endArc = tmp;
                    }
                    var startX = ptCenter.x + _radius * Math.cos(beginArc);
                    var startY = ptCenter.y - _radius * Math.sin(beginArc);
                    if( k == 5 ) {
                        textPoints.push({
                            x : startX,
                            y : startY
                        });
                    }
                    var temp = this.calPoints( _radius, data[i][0], data[i][1] );
                    points = points.concat(temp);
                }

                var color = JColor.parse("#ffffff");
                if( (k % 2) == 0 ) {
                    color = JColor.parse("#80cccccc");
                }
                this.btGraphic.drawPolygon(points, 1, "#ccc", color);
            }
            this.drawBGText(textPoints);
        },
        drawBGText : function( points ) {
            var center = this.getCenter();
            var data = this.polarData;
            var op = this.options;
            var textEl = null;
            for( var i = 0; i < points.length; i++ ) {
                var temp = points[i];
                var obj = __calLabelWH(data[i].text, op.textCss);
                if( temp.x <  center.x ) {
                    if( temp.y < center.y ) {
                        textEl = this.btGraphic.drawText(data[i].text, (temp.x - obj.w) , temp.y - obj.h);
                        $(textEl).css(op.textCss);
                    }else{
                        textEl = this.btGraphic.drawText(data[i].text, (temp.x - obj.w) , temp.y + obj.h);
                        $(textEl).css(op.textCss);
                    }
                }else{
                    if( temp.y < center.y ) {
                        textEl = this.btGraphic.drawText(data[i].text, temp.x , temp.y - obj.h);
                        $(textEl).css(op.textCss);
                    }else{
                        textEl = this.btGraphic.drawText(data[i].text, temp.x , temp.y + obj.h);
                        $(textEl).css(op.textCss);
                    }
                }
            }
        },
        drawGraph : function() {
            var ptCenter = this.getCenter();
            var data = this.data;
            var polar = this.polarData;
            var bData = this.busiData;
            var radius = this.radius;
            var styles = this.options.style;
            for( var i = 0; i < data.length; i++ ) {
                var temp = data[i];
                var points = [];
                var tData = temp.data;
                for( var j = 0; j < tData.length; j++ ) {
                    var value = tData[j];
                    var pvalue = polar[j].value;
                    var p = radius * (value / pvalue);
                    var endArc = bData[j][1];
                    var beginArc = bData[j][0];
                    if (endArc < beginArc){
                        var tmp = beginArc;
                        beginArc = endArc;
                        endArc = tmp;
                    }
                    var startX = ptCenter.x + p * Math.cos(beginArc);
                    var startY = ptCenter.y - p * Math.sin(beginArc);
                    points.push({
                        x : startX,
                        y : startY
                    });
                }
                var color = JColor.parse(styles[i].style.lineColor);
                var fillColor = null;
                if( styles[i].style.fillColor == undefined ) {
                    fillColor = "none";
                }else{
                    fillColor = JColor.parse(styles[i].style.fillColor);
                }
                this.$ctx.drawPolygon(points, styles[i].style.lineWidth, color, fillColor);
                this.drawCircle(points, color);
            }
        },
        drawCircle : function( pt, color ) {
            //ptCenter, radius, strokeColor, strokeWidth, fillColor
            this.$ctx.drawCircles(pt, 4, color, 2, "#fff");
        },
        draw : function() {
            this.drawBg();
            this.drawGraph();
        }
    };
    /*DASHBOARD CHART*/
    var centerPoint = {},
        first = 0,
        color = ""
        ;
    var DUtil = {
        sortBy : function( filed, reverse, primer ) {
            reverse = (reverse) ? -1 : 1;
            return function (a, b) {
                a = a[filed];
                b = b[filed];

                if (typeof (primer) != "undefined") {
                    a = primer(a);
                    b = primer(b);
                }

                if (a < b) {
                    return reverse * -1;
                }
                if (a > b) {
                    return reverse * 1;
                }
            };
        },
        createPath : function( value, min, max, w, h, dx, dy, gws ) {
            var alpha = (1 - (value - min) / (max - min)) * Math.PI ,
                Ro = w / 2 - w / 10,
                Ri = Ro - w / 6.666666666666667 * gws,

                Cx = w / 2 + dx,
                Cy = h / 2.5 + dy,

                Xo = w / 2 + dx + Ro * Math.cos(alpha),
                Yo = h - (h - Cy) + dy - Ro * Math.sin(alpha),
                Xi = w / 2 + dx + Ri * Math.cos(alpha),
                Yi = h - (h - Cy) + dy - Ri * Math.sin(alpha),
                path = '';

            if(typeof centerPoint.y == "undefined"){
                centerPoint.y = Yi;
                first = (Cx - Ri);
            }
            path += "M" + (Cx - Ri) + "," + Cy + " ";
            path += "L" + (Cx - Ro) + "," + Cy + " ";
            path += "A" + Ro + "," + Ro + " 0 0,1 " + Xo + "," + Yo + " ";
            path += "L" + Xi + "," + Yi + " ";
            path += "A" + Ri + "," + Ri + " 0 0,0 " + (Cx - Ri) + "," + Cy + " ";
            path += "z ";
            return { path: path };
        },
        createTick : function( value, min, max, w, h, dx, dy, gws ) {
            var alpha = (1 - (value - min) / (max - min)) * Math.PI ,
                Ro = w / 2 - w / 10,
                Ri = Ro - w / 6.666666666666667 * gws,

                Cx = w / 2 + dx,
                Cy = h / 2.5 + dy,

                Xo = w / 2 + dx + Ro * Math.cos(alpha),
                Yo = h - (h - Cy) + dy - Ro * Math.sin(alpha),
                Xi = w / 2 + dx + Ri * Math.cos(alpha),
                Yi = h - (h - Cy) + dy - Ri * Math.sin(alpha),
                path = '';

            path += "M" + (Cx - Ri) + "," + Cy + " ";
            path += "L" + (Cx - Ro) + "," + Cy + " ";
            path += "A" + Ro + "," + Ro + " 0 0,1 " + Xo + "," + Yo + " ";
            path += "L" + Xi + "," + Yi + " ";
            path += "A" + Ri + "," + Ri + " 0 0,0 " + (Cx - Ri) + "," + Cy + " ";
            path += "z ";
            var p = "M"+Xo + "," + Yo + " " + "L" + Xi + "," + Yi;
            return p;
        },
        createText : function( value, min, max, w, h, dx, dy, gws ) {
            var alpha = (1 - (value - min) / (max - min)) * Math.PI ,
                Ro = w / 2 - (w / 10) * 1.5,
                Ri = Ro - w / 6.666666666666667 * gws,

                Cx = w / 2 + dx,
                Cy = h / 2.5 + dy,

                Xo = w / 2 + dx + Ro * Math.cos(alpha),
                Yo = h - (h - Cy) + dy - Ro * Math.sin(alpha),
                Xi = w / 2 + dx + Ri * Math.cos(alpha),
                Yi = h - (h - Cy) + dy - Ri * Math.sin(alpha),
                path = '';

            path += "M" + (Cx - Ri) + "," + Cy + " ";
            path += "L" + (Cx - Ro) + "," + Cy + " ";
            path += "A" + Ro + "," + Ro + " 0 0,1 " + Xo + "," + Yo + " ";
            path += "L" + Xi + "," + Yi + " ";
            path += "A" + Ri + "," + Ri + " 0 0,0 " + (Cx - Ri) + "," + Cy + " ";
            path += "z ";
            var p = "M"+Xo + "," + Yo + " " + "L" + Xi + "," + Yi;
            return {
                x : Xi,
                y : Yi
            };
        },
        createLegend : function( desc ) {
            var htm = '';
            var classs = ["ui-red", "ui-yellow", "ui-green"];
            for( var i = 0; i < desc.length; i++ ) {
                htm += '<span class="'+classs[i]+'">&nbsp;</span>';
                htm += '<span class="'+classs[i]+'-des">'+desc[i]+'</span>';
            }
            return htm;
        }
    };
    var Dashboard = function( target, pointer ) {
        this.$pointer = pointer;
        var canvasWidth = target.width();
        var canvasHeight = target.height();
        if(canvasHeight == 0){
            canvasHeight = target.parent().height();
        }
        this.reca = [];
        this.chartContainerId = target.attr("id");
        this.legendPlace = $('<div class="ui-height-16"></div>').appendTo(target);
        this.container = target;
        this.chartPlace = $('<div class="chartPlace"></div>').appendTo(target);
        this.targetHolder = CT.create(this.chartPlace, "relative", 0, 20, canvasWidth, canvasHeight-43);
        this.graphGroup = CT.createGroup(this.targetHolder, this.chartContainerId+"-graph", "none", 0, "none");
        this.axisGroup = CT.createGroup(this.targetHolder, this.chartContainerId+"-axis", "none", 0, "none");
        this.textGroup = CT.createGroup(this.targetHolder, this.chartContainerId+"-axis-text", "none", 0, "none");
        this.pointerGroup = CT.createGroup(this.targetHolder, this.chartContainerId+"-pointer", "none", 0, "none");
        this.titlePlace = $('<div class="titlePlace" style="position:absolute;"></div>').appendTo(this.chartPlace);
        canvasHeight = canvasHeight-43;
        if(canvasWidth > canvasHeight*2){
            this.w = Number(canvasHeight)*2;
            this.h = Number(canvasHeight);
        }else{
            this.w = Number(canvasWidth);
            this.h = Number(canvasWidth);
        }
        centerPoint.x = this.w * 0.5;
        var left = (canvasWidth - this.w) * 0.5;
        $(this.targetHolder).css("left", left);
        var self = this;
        Publisher.subscribe("draw", function(){
            self.draw();
        }, self);
    };
    Dashboard.prototype = {
        getSubId : function() {
            return this.$pointer;
        },
        setOptions : function(options){
            var defualtOptions = {
                down : false,
                downCb : null,
                red : 20,
                yellow : 60,
                greed : 12,
                total : 100,
                min : 0,
                current : 50,
                width : 0.3,
                text : ""
            };
            var data = options.chart;
            options.chart = $.extend(true,{},options.chart,data);
            this.options = $.extend(true, {}, defualtOptions, options.chart );
            if(typeof this.options.plotBands == "undefined"){
                this.options.plotBands = [{
                    from: this.options.min,
                    to: this.options.red,
                    color: '#DF5353' // red
                }, {
                    from: this.options.red,
                    to: this.options.yellow,
                    color: '#DDDF0D' // yellow
                }, {
                    from: this.options.yellow,
                    to: this.options.total,
                    color: '#55BF3B' // green
                }];
            };
            var htm = DUtil.createLegend(this.options.desc);
            $(htm).appendTo(this.legendPlace);
            this.reca.push(this.options.min);
            for(var i = 0; i < this.options.plotBands.length; i++ ){
                var temp = this.options.plotBands[i];
                this.reca.push(temp.to);
            }
            var plotBands = this.options.plotBands;
            for(var i = 0; i < plotBands.length; i++){
                if(options.current < plotBands[i].to){
                    color = plotBands[i].color;
                    break;
                }
            }
        },
        getWH : function() {
            var canvasW = this.w;
            var canvasH = this.h;
            var widgetW, widgetH;
            widgetW = canvasW;
            widgetH = canvasW;
            var dx = 0;
            var dy = 0;
            return{
                widgetW : widgetW,
                widgetH : widgetH,
                dx : dx,
                dy : dy
            }
        },
        createArc : function() {
            var options = this.options;
            var max = options.total;
            var min = options.min;
            var plotBands = options.plotBands;
            var obj = this.getWH();
            var path = DUtil.createPath(max, min, max, obj.widgetW, obj.widgetH, obj.dx, obj.dy, options.width);
            var arcPath = CE.createElement("path");
            arcPath.setAttribute("d", path.path);
            arcPath.setAttribute("stroke", "#bcbcbc");
            arcPath.setAttribute("opacity", "0.3");
            arcPath.setAttribute("stroke-width", 5);
            this.graphGroup.appendChild(arcPath);
            plotBands.sort(DUtil.sortBy('to', true, parseFloat));
            for(var i = 0; i < plotBands.length; i++){
                var p = DUtil.createPath(plotBands[i].to, min, max, obj.widgetW, obj.widgetH, obj.dx, obj.dy, options.width);
                var path = CE.createElement("path");
                path.setAttribute("d", p.path);
                path.setAttribute("fill", plotBands[i].color);
                this.graphGroup.appendChild(path);
            };
        },
        createAxis : function() {
            var obj = this.getWH();
            var op = this.options;
            var min = op.min;
            var max = op.total;
            var step = Number(((max - min) / 4).toFixed(2));
            var reca = this.reca;
            for(var i = 0; i < reca.length; i++){
                var axisPath = CE.createElement("path");
                var d = DUtil.createTick(reca[i], min, max, obj.widgetW, obj.widgetH, obj.dx, obj.dy, op.width);
                axisPath.setAttribute("d", d);
                axisPath.setAttribute("stroke", "#999");
                axisPath.setAttribute("stroke-width", 2);
                this.axisGroup.appendChild(axisPath);
                var text = CE.createElement("text");
                this.textGroup.appendChild(text);
                $(text).html(reca[i]).css({
                    "font-family":"Verdana, Arial, Helvetica, sans-serif",
                    "font-size":"10px",
                    "color":"#666",
                    "cursor":"default",
                    "fill":"#666"
                });
                var rotate = Math.abs(((reca[i]-min) / (max-min))) * 180 - 90;
                var t = DUtil.createText(reca[i], min, max, obj.widgetW, obj.widgetH, obj.dx, obj.dy, op.width);
                if(i == reca.length-1){
                    rotate = 0;
                    t.x = t.x - $(text).width()*0.5;
                }
                if(i == 0){
                    rotate = 0;
                }
                text.setAttribute("x", t.x);
                text.setAttribute("y", t.y);
                text.setAttribute("transform", "rotate("+rotate+", "+t.x+", "+t.y+")");
            }
        },
        createPointer : function() {
            var op = this.options;
            var current = op.current;
            var arc = Math.abs((current- op.min) / (op.total - op.min)) * 180;
            var pd = 'M'+first+","+(parseInt(centerPoint.y)+0.5) +" L"+ (centerPoint.x)+","+(parseInt(centerPoint.y-3.5)+0.5)+" L"+(parseInt(centerPoint.x)+0.5)+","+(centerPoint.y+3.5)+" z";
            var pointer = CE.createElement("path");
            pointer.setAttribute("d", pd);
            pointer.setAttribute("transform", "rotate("+arc+" "+centerPoint.x+" "+centerPoint.y+")");
            pointer.setAttribute("fill", "black");
            this.pointerGroup.appendChild(pointer);
            var animate = document.createElementNS(XMLNS, 'animateTransform');
            animate.setAttribute("attributeName", "transform");
            animate.setAttribute("type", "rotate");
            animate.setAttribute("begin", "0s");
            animate.setAttribute("dur", "0.5s");
            animate.setAttribute("from", "0 "+centerPoint.x + " " + centerPoint.y);
            animate.setAttribute("to", ""+arc+" "+centerPoint.x + " " + centerPoint.y);
            animate.setAttribute("fill", "freeze");
            pointer.appendChild(animate);

            var centerC = CE.createElement("circle");
            centerC.setAttribute("cx", centerPoint.x);
            centerC.setAttribute("cy", centerPoint.y);
            centerC.setAttribute("r", 5);
            centerC.setAttribute("fill", "black");
            this.pointerGroup.appendChild(centerC);
        },
        createTitle : function() {
            var op = this.options;
            var x = centerPoint.x;
            $(this.titlePlace).html(op.text + ":" + op.current).css({
                "font-family":"Verdana, Arial, Helvetica, sans-serif",
                "font-size":"16px",
                "color":color,
                "cursor":"default",
                "left" : (centerPoint.x + Number($(this.targetHolder).css("left").replace("px", ""))),
                "fill":color,
                "top" : centerPoint.y * 0.8,
                "z-index" : 1
            });
            var tw = $(this.titlePlace).width() * 0.5;
            $(this.titlePlace).css("left", (centerPoint.x - tw)+ Number($(this.targetHolder).css("left").replace("px", "")));
            var container = this.container;
            if(op.down){
                var me = this;
                var y = centerPoint.y * 0.8;
                $('<span class="icon_link_down" style="float: right;"><img src="../BI-Public/images/img/icon_link.png" style="width: 10px;height: 15px;"/></span>').css({
                    "position" : "absolute",
                    "right" : 10,
                    "top" : 6,
                    "width" : 40,
                    "height" : 30,
                    "z-index" : 100
                }).appendTo(container);
                Events.bindEvent(container, ".icon_link_down", "click", function(){
                    if($.isFunction(op.downCb)){
                        op.downCb();
                    }
                });
            };
        },
        draw : function(){
            this.createArc();
            this.createAxis();
            this.createPointer();
            this.createTitle();
        }
    };
    /*END************/
    /*****************FUNNEL CHART*****************/
    var calFCenter = function(  a, obj ) {
        var c = {};
        switch( a ) {
            case "left":
                c = { x : 0 , y : 0};
                break;
            case "center":
                c = {x : obj.CHARTWIDTH * 0.5, y : 0};
                break;
        }
        return c;
    };
    var calThreePoint = function( center, obj ) {
        var cx = center.x, cy = center.y;
        var sx = cx + obj.ROOTWIDTH, sy = 0;
        var tx = (sx - cx) * 0.5, ty = obj.ROOTHEIGHT;
        var allPoint = [
            {x : cx, y : cy},
            {x : sx, y : sy},
            {x : tx, y : ty}
        ];
        return allPoint;
    };
    var calPercentage = function( data, h, w, p ) {
        var len = data.length;
        var percent = h / len;
        var points = [];
        for( var i = 0; i < data.length; i++ ) {
            var f = null;
            var pt = null;
            if( i == 0 ) {
                f = {x : p[0].x, y : p[0].y},
                    pt = [f, {x : p[1].x, y : p[1].y}, {x : p[1].x - (w * (1/len) * 0.5), y : h * (1/len)},{x : f.x + (w * (1/len) * 0.5), y : h * (1/len) }];
            }else if( i ==(len - 1) ){
                pt = [points[i-1][3],points[i-1][2],{x : p[2].x, y : p[2].y}];
            }else{
                pt = [points[i-1][3], {x : p[1].x-(w * (i/len) * 0.5), y : h * (i/len)},{x : p[1].x-(w * ((i+1)/len) * 0.5), y : h * ((i+1)/len)}, {x : p[0].x+(w * ((i+1)/len) * 0.5), y : h * ((i+1)/len)}];
            }
            points.push(pt);
        }
        return points;
    };
    var FunnelChart = function( target, pointer ) {
        this.$pointer = pointer;
        var self = this;
        this.container = target;
        this.chartPlace = $('<div class="chartPlace"></div>').appendTo(target);
        this.targetHolder = CT.create(this.chartPlace, "relative", 0, 0, target.width(), target.height());
        this.graphGroup = CT.createGroup(this.targetHolder, "funnelChartGraph", "none", 0, "none");
        this.$ctx = new Graphics(this.graphGroup);
        Publisher.subscribe("draw", function(){
            self.draw();
        }, self);
    };
    FunnelChart.prototype = {
        getSubId : function() {
            return this.$pointer;
        },
        setData : function( data ) {
            this.data = data;
        },
        setOptions : function( options ) {
            var _option = options.chart;
            var data = options.data;
            this.setData(data);
            var defaultOp = {
                text : true,
                position : "left"
            };
            this.options = $.extend( true, {}, defaultOp, _option );
        },
        drawBorder : function(points) {
            var ctx = this.$ctx;
            ctx.drawPolygon(points, 4, JColor.parse("#80ffffff"), JColor.parse("#80ffffff"));
        },
        draw : function() {
            var obj = getChartObj(this.$pointer);
            var w = this.container.width(), h = this.container.height(), op = this.options;
            var center = calFCenter( op.position, obj );
            var points = calThreePoint(center, obj);
            var pts = calPercentage(this.data, obj.ROOTHEIGHT, obj.ROOTWIDTH, points);
            var ctx = this.$ctx;
            var data = this.data;
            this.drawBorder(points);
            for( var i = 0; i < pts.length; i++ ) {
                ctx.drawPolygon(pts[i], 2, JColor.parse("#80ffffff"), JColor.parse(data[i][2]));
            }
        }
    };
    /****************END**************************/
    var __resolveOptions = function( op ) {
        var l=0,r=0,t=0,b=0;
        for( var i in op ) {
            if( i == "position" ){
                t += op[i].top;
                l += op[i].left;
            }
            if( i == "Legend" && op[i].show ) {
                if( op[i].position == "left" ) {
                    l += op[i].width;
                }else if( op[i].position == "right" ) {
                    r += op[i].width;
                }else if( op[i].position == "buttom" ) {
                    b += op[i].height;
                }else{
                    t += op[i].height;
                }
            }
        }
        return {
            l : l,
            r : r,
            t : t,
            b : b
        };
    };
    /*CHART*/
    var Chart = function( container, type, obj ) {
        this.$container = container;
        this.$chartType = type;
        this.$pointer = tools.random();
        if( obj != undefined ) {
            $ = obj;
        }
    };
    Chart.prototype = {
        constructor : Chart,
        getSubId : function() {
            return this.$pointer;
        },
        setOptions : function( options ) {
            var op = $.extend(true, {
                position : {
                    top:0,
                    left:0,
                    width : this.$container.width(),
                    height : this.$container.height()
                }
            }, op, options);
            this.options = op;
            var obj = __resolveOptions(op);
            CHARTOBJ[this.$pointer] = {
                ROOTWIDTH : (this.options.position.width - obj.l - obj.r),
                ROOTHEIGHT : (this.options.position.height - obj.t - obj.b),
                ROOTTOP : obj.t,
                ROOTBUTTOM : obj.b,
                ROOTLEFT : obj.l,
                ROOTRIGHT : obj.r,
                TARGET : this.$container
            };
            if( op.type == "series" ) {
                var container = this.$container;
                this.$chartContainer = CT.create(container);
                this.chart = new SerialChart( this.$chartContainer, this.$pointer );
            }else if( op.type == "pie" ) {
                this.chart = new PieChart( this.$container, this.$pointer );
            }else if( op.type == "annulus" ) {
                this.chart = new Annulus( this.$container, this.$pointer );
            }else if( op.type == "radar" ) {
                this.chart = new Radar( this.$container, this.$pointer );
            }else if( op.type == "dashboard" ) {
                this.chart = new Dashboard( this.$container, this.$pointer );
            }else if( op.type == "funnel" ) {
                this.chart = new FunnelChart( this.$container, this.$pointer );
            }
            this.chart.setOptions(op);
            this.initComponents();
            Publisher.publish("setOptions", op, this);
        },
        initComponents : function() {
            var op = this.options;
            var cps = [], temp = null;
            for( var i in op ) {
                if( i == "data" || i == "charts" || i == "coordinate") {
                    continue
                };
                temp = null;
                if( Components[i] && op[i].show ) {
                    temp = new Components[i](this.$container, this.$pointer);
                }
            }
        },
        draw : function() {
            Publisher.publish("draw", this);
            this.bindEvent();
        },
        refresh : function() {
            this.draw();
        },
        bindEvent : function() {
            var self = this;
            Events.bindEvent(this.$container, ".chartTooltips-div", "mousemove", function( c, e ){
                var p = getPosition($(c), e);
                self.chart.findData(p, "mousemove");
            });
            Events.bindEvent(this.$container, ".chartTooltips-div", "tap", function( c, e ){
                var p = getPosition($(c), e);
                self.chart.findData(p, "click");
            });
            // Publisher.publish("bindEvent", this);
        },
        resize : function( width, height ) {
            var pointer = this.$pointer;
            var op = this.options;
            var obj = __resolveOptions(op);
            this.$container.width(width);
            this.$container.height(height);
            CHARTOBJ[pointer] = {
                ROOTWIDTH : (width - obj.l - obj.r),
                ROOTHEIGHT : (height - obj.t - obj.b),
                ROOTTOP : obj.t,
                ROOTBUTTOM : obj.b,
                ROOTLEFT : obj.l,
                ROOTRIGHT : obj.r,
                TARGET : this.$container
            };
            this.draw();
        },
        realtimeRefresh : function( data, flg ) {
            Publisher.publish("realTimeDataChange", {data: data, flg: flg}, this);
        },
        moveLeft : function() {
            Publisher.publish("moveLeft", this);
        },
        moveRight : function() {
            Publisher.publish("moveRight", this);
        },
        drawLine : function() {
            Publisher.publish("drawLine", this);
        },
        drawRect : function() {
            Publisher.publish("drawRect", this);
        },
        drawEllipse : function() {
            Publisher.publish("drawEllipse", this);
        },
        drawNote : function() {
            Publisher.publish("drawNote", this);
        },
        exportChart : function() {
            // var frm = null;
            // var timer = null
            // var DownLoad = function(url){
            //     frm = document.createElement("IFRAME");
            //     frm.style.display = "none";
            //     document.body.appendChild(frm);
            //     frm.contentWindow.location.href = url;
            //     timer =  setInterval(checkload,200);
            // }
            // var checkload = function(){
            //     if( frm.contentWindow.document.readyState =="complete") {
            //         frm.contentWindow.document.execCommand("SaveAs");
            //         clearInterval(timer)
            //     }
            //     document.body.removeChild(frm);
            // }
            var DOMURL = self.URL || self.webkitURL || self;
            var img = new Image();
            img.crossOrigin = "anonymous";
            var data = new XMLSerializer().serializeToString(document.querySelector('svg'));
            var svg = new Blob([data], {type: "image/svg+xml;charset=utf-8"});
            var url = DOMURL.createObjectURL(svg);
            //DownLoad(url);
            img.src = url;

            // img.onload = function() {
            //     document.location.href = url;
            // }
            //$("#imgArea").append(img);
        },
        setDefaultData : function( arg ) {
            Publisher.publish("setDefaultData", arg, this);
        }
    };
    /******/
    LChart.Chart = Chart;
}(window));