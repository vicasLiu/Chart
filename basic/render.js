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