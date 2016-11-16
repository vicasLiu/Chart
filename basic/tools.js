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