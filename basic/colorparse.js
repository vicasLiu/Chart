(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.i18n = factory());
}(this, function () { 'use strict';
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
    return JColor;
}));
