(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.i18n = factory());
}(this, function () { 'use strict';
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
    return SVGRenderer;
}));