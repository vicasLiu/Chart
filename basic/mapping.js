(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.i18n = factory());
}(this, function () { 'use strict';
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
    return Mapping;
}));