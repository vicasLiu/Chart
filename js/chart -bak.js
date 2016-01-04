/**
 * Created by liusiwei on 15/11/25.
 */
$(function(){
    var getDataUrl = window.location.origin;
    var formatChartData = function( data, ykey, xkey ) {
        if( data.length == 0 ) {
            return null;
        }
        var xCal = [];
        var chartData = [];
        for( var i = 0; i < data.length; i++ ) {
            var temp = data[i];
            xCal.push([i, temp[xkey]]);
            chartData.push([i, temp[xkey], temp[ykey]]);
        }
        xCal.push([i, " "]);
        return {
            x : xCal,
            d : chartData
        }
    };
    var getOrder = function( type ) {
        $.ajax({
            url : getDataUrl+"/order/"+type,
            dataType : "json",
            type : "GET",
            success : function( data ) {
                console.info(data);
                drawOrder(data);
            }
        });
    };
    var getVolume = function( type ) {
        $.ajax({
            url : getDataUrl+"/volume/"+type,
            dataType : "json",
            type : "GET",
            success : function( data ) {
                console.info(data);
                drawVolume(data);
            }
        });
    };
    var getTrade = function( type ) {
        $.ajax({
            url : getDataUrl+"/trade/"+type,
            dataType : "json",
            type : "GET",
            success : function( data ) {
                console.info(data);
                drawTrade(data);
            }
        });
    };
    var drawOrder = function( data ) {
        var obj = formatChartData(data, "orderNum", "period");
        console.info(obj);
        if( obj == null ) {
            return;
        }
        $(".orderChart").empty();
        var orderChart = new LChart.Chart($(".orderChart"));
        var op = {
            position : {
                top : 20
            },
            type:'series',
            data:[
                {
                    xId:'x1',
                    yId:'y1',
                    dataId:'data0',
                    data:obj.d
                }
            ],
            charts:[
                {
                    dataId:'data0',
                    type:'bar',
                    name:'交易额',
                    style:{
                        show:true,
                        //baseLine : 0,
                        fillColor:'#5AF8C8',
                        hoverColor:'#f00',
                        lineWidth:1,
                        barWidth:10,
                        section:true,
                        space:0,
                        type:0,
                        leftSpace:null,
                        desc : {
                            showDesc : false
                        }
                    }
                }
            ],
            coordinate:{
                xaxis:[
                    {
                        id:'x1',
                        width:25,
                        lineColor : "#535B5D",
                        shortLine : 10,
                        //showAll : true,
                        labelFormat : function( txt ) {
                            if( txt.length == 6 ) {
                                txt = txt.substr(4,2);
                            }else if( txt.length == 8 ) {
                                txt = txt.substr(4,4);
                            }
                            return txt;
                        },
                        labelCss : {
                            font: "normal 16px Arial, Helvetica, sans-serif",
                            fill: "#9AADB3"
                        },
                        type:'customer|bar',
                        labelAlign:'center',
                        calibration : obj.x
                    }
                ],
                yaxis : [{
                    id : "y1",
                    width : 100,
                    //show : false,
                    shortLine : 20,
                    labelPadding : {
                        left : -25,
                        top : -3
                    },
                    lineColor : "#535B5D",
                    labelCss : {
                        font: "normal 16px Arial, Helvetica, sans-serif",
                        fill: "#9AADB3"
                    },
                    labelAlign : "lineCenter"
                }],
                grid:{
                    gridY:true,
                    gridX:false,
                    lineColor : "#535B5D"
                }
            }
        };
        orderChart.setOptions(op);
        orderChart.draw();
    };
    var drawVolume = function( data ) {
        var obj = formatChartData(data,  "amount", "merchant");
        console.info(obj);
        if( obj == null ) {
            return;
        }
        $(".volumeChart").empty();
        var orderChart = new LChart.Chart($(".volumeChart"));
        var op = {
            position : {
                top : 20
            },
            type:'series',
            data:[
                {
                    xId:'x1',
                    yId:'y1',
                    dataId:'data0',
                    data:obj.d
                }
            ],
            charts:[
                {
                    dataId:'data0',
                    type:'bar',
                    name:'交易额',
                    style:{
                        show:true,
                        //baseLine : 0,
                        fillColor:'#0C95FF',
                        hoverColor:'#f00',
                        lineWidth:1,
                        barWidth:10,
                        section:true,
                        space:0,
                        type:0,
                        leftSpace:null,
                        desc : {
                            showDesc : false
                        }
                    }
                }
            ],
            coordinate:{
                xaxis:[
                    {
                        id:'x1',
                        width:25,
                        lineColor : "#535B5D",
                        shortLine : 10,
                        labelEllipsis : true,
                        labelCss : {
                            font: "normal 16px Arial, Helvetica, sans-serif",
                            fill: "#9AADB3"
                        },
                        type:'customer|bar',
                        labelAlign:'center',
                        calibration : obj.x
                    }
                ],
                yaxis : [{
                    id : "y1",
                    width : 100,
                    //show : false,
                    shortLine : 20,
                    labelPadding : {
                        left : -25,
                        top : -3
                    },
                    lineColor : "#535B5D",
                    labelCss : {
                        font: "normal 16px Arial, Helvetica, sans-serif",
                        fill: "#9AADB3"
                    },
                    labelAlign : "lineCenter"
                }],
                grid:{
                    gridY:true,
                    gridX:false,
                    lineColor : "#535B5D"
                }
            }
        };
        orderChart.setOptions(op);
        orderChart.draw();
    };
    var drawTrade = function( data ) {
        var obj = formatChartData(data, "amount", "merchant");
        console.info(obj);
        if( obj == null ) {
            return;
        }
        $(".tradeChart").empty();
        var orderChart = new LChart.Chart($(".tradeChart"));
        var op = {
            position : {
                top : 20
            },
            type:'series',
            data:[
                {
                    xId:'x1',
                    yId:'y1',
                    dataId:'data0',
                    data:obj.d
                }
            ],
            charts:[
                {
                    dataId:'data0',
                    type:'bar',
                    name:'交易额',
                    style:{
                        show:true,
                        //baseLine : 0,
                        fillColor:'#A0F005',
                        hoverColor:'#f00',
                        lineWidth:1,
                        barWidth:10,
                        section:true,
                        space:0,
                        type:0,
                        leftSpace:null,
                        desc : {
                            showDesc : false
                        }
                    }
                }
            ],
            coordinate:{
                xaxis:[
                    {
                        id:'x1',
                        width:25,
                        lineColor : "#535B5D",
                        shortLine : 10,
                        labelEllipsis : true,
                        labelCss : {
                            font: "normal 16px Arial, Helvetica, sans-serif",
                            fill: "#9AADB3"
                        },
                        type:'customer|bar',
                        labelAlign:'center',
                        calibration : obj.x
                    }
                ],
                yaxis : [{
                    id : "y1",
                    width : 100,
                    //show : false,
                    shortLine : 20,
                    labelPadding : {
                        left : -25,
                        top : -3
                    },
                    lineColor : "#535B5D",
                    labelCss : {
                        font: "normal 16px Arial, Helvetica, sans-serif",
                        fill: "#9AADB3"
                    },
                    labelAlign : "lineCenter"
                }],
                grid:{
                    gridY:true,
                    gridX:false,
                    lineColor : "#535B5D"
                }
            }
        };
        orderChart.setOptions(op);
        orderChart.draw();
    };
    var bindEv = function() {
        binderEvent($(".volume"), "a", "click", function( dom, evt ){
            var key = dom.attr("key");
            var p = dom.parent();
            p.find("a").removeClass("active");
            dom.addClass("active");
            getVolume(key);
        });
        binderEvent($(".trade"), "a", "click", function( dom, evt ){
            var key = dom.attr("key");
            var p = dom.parent();
            p.find("a").removeClass("active");
            dom.addClass("active");
            getTrade(key);
        });
        binderEvent($(".order"), "a", "click", function( dom, evt ){
            var key = dom.attr("key");
            var p = dom.parent();
            p.find("a").removeClass("active");
            dom.addClass("active");
            getOrder(key);
        });
    };
    var socketChart = null;
    var drawSocketChart = function( obj ) {
        console.info(obj);
        var dt = new Date();
        var hours = dt.getHours();
        var mins = dt.getMinutes();
        if( hours == 23 && mins >= 55 ) {
            socketChart = null;
        }
        var loginCount = obj["customer-login-count"] || 0;
        var registerCount = obj["customer-register-count"] || 0;
        var payCount = obj["transcore-pay-amount"] || 0;
        if( socketChart == null ) {
            $(".zsy-m-chart-cont1-left-chart").empty();
            socketChart = new LChart.Chart($(".zsy-m-chart-cont1-left-chart"));
            var op = {
                position : {
                    top : 20
                },
                type : "series",
                data : [{
                    dataId:"data1",
                    xId : "x1",
                    yId : "y1",
                    data: [loginCount]
                }
                    ,{
                        dataId:"data2",
                        xId : "x1",
                        yId : "y1",
                        data: [registerCount]
                    },{
                        dataId:"data3",
                        xId : "x1",
                        yId : "y1",
                        data: [payCount]
                    },{
                        dataId:"data4",
                        xId : "x1",
                        yId : "y1",
                        data: [0]
                    },{
                        dataId:"data5",
                        xId : "x1",
                        yId : "y1",
                        data: [0]
                    }
                ],
                charts : [{
                    dataId : "data1",
                    type : "line",
                    name : "ChartLineDemo",
                    style : {
                        show: true,
                        areaLine : false,
                        lineWidth: 2,
                        lineColor: "#9DF201"
                    }
                }
                    ,{
                        dataId : "data2",
                        type : "line",
                        name : "ChartLineDemo",
                        style : {
                            show: true,
                            areaLine : false,
                            lineWidth: 2,
                            lineColor: "#58FAC9"
                        }
                    },{
                        dataId : "data3",
                        type : "line",
                        name : "ChartLineDemo",
                        style : {
                            show: true,
                            areaLine : false,
                            lineWidth: 2,
                            lineColor: "#059ADC"
                        }
                    },{
                        dataId : "data4",
                        type : "line",
                        name : "ChartLineDemo",
                        style : {
                            show: true,
                            areaLine : false,
                            lineWidth: 2,
                            lineColor: "#ECA924"
                        }
                    },{
                        dataId : "data5",
                        type : "line",
                        name : "ChartLineDemo",
                        style : {
                            show: true,
                            areaLine : false,
                            lineWidth: 2,
                            lineColor: "#FF4F45"
                        }
                    }
                ],
                coordinate : {
                    xaxis : [{
                        id : "x1",
                        width : 50,
                        type : "dateTime",
                        startDate : Date.parse(new Date()) - 300000,
                        interval : "5.m",
                        lineColor : "#535B5D",
                        shortLine : 10,
                        labelCss : {
                            font: "normal 16px Arial, Helvetica, sans-serif",
                            fill: "#9AADB3"
                        },
                        labelPadding : {

                        },
                        labelAlign : "left"
                    }],
                    yaxis : [{
                        id : "y1",
                        width : 100,
                        //show : false,
                        shortLine : 20,
                        labelPadding : {
                            left : -25,
                            top : -3
                        },
                        lineColor : "#535B5D",
                        labelCss : {
                            font: "normal 16px Arial, Helvetica, sans-serif",
                            fill: "#9AADB3"
                        },
                        labelAlign : "lineCenter"
                    }],
                    grid : {
                        gridY : true,
                        gridX : false,
                        lineColor : "#535B5D"
                    }
                }
            };
            socketChart.setOptions(op);
            socketChart.draw();
            getOrder("day");
            getVolume("day");
            getTrade("day");
        }else{
            socketChart.realtimeRefresh( [{
                data:[loginCount], dataId: "data1"
            }
                ,{
                    data:[registerCount], dataId: "data2"
                }
                ,{
                    data:[payCount], dataId: "data3"
                }
                //,{
                //    data:[y4], dataId: "data4"
                //},{
                //    data:[y5], dataId: "data5"
                //}
            ], false );
        }
    };
    var socket = io.connect(getDataUrl);
    socket.on("message", function( obj ){
        drawSocketChart(obj);
    });
    bindEv();
});