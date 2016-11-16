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