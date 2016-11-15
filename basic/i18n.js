(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.i18n = factory());
}(this, function () { 'use strict';
    var i18n, INSTANCE;
    i18n = function(){
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
    i18n.prototype = {
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
    return i18n;
}));