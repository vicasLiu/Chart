/**
 * Created by liusiwei on 15/11/25.
 */
$(function(){
    var getDataUrl = window.location.origin;
    var socketChart = null;
    var registerChart = null;
    var payChart = null;
    var amountChart = null;
    var getDefaultOp = function( data, chartOp, op ) {
        var defaultOp = {
            position : {
                top : 20
            },
            type : "series",
            data : data,
            charts : chartOp,
            coordinate : {
                xaxis : [{
                    id : "x1",
                    width : 25,
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
                    width : 35,
                    show : false,
                    //shortLine : 20,
                    labelPadding : {
                        left : -5,
                        top : -3
                    },
                    labelFormat : function( txt ) {
                        console.info(txt);
                        txt = Number(txt);
                        if( txt > 1000 ) {
                            txt = (txt / 1000) + "K";
                        }
                        return txt;
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
        var options = defaultOp;
        if( op != undefined ){
            options = $.extend(true, {}, defaultOp, op);
        }
        return options;
    };
    var drawLoginChart = function(loginCount) {
        $("#loginChart").empty();
        socketChart = new LChart.Chart($("#loginChart"));
        var op = getDefaultOp([{
            dataId:"data1",
            xId : "x1",
            yId : "y1",
            data: [loginCount]
        }], [{
            dataId : "data1",
            type : "line",
            name : "ChartLineDemo",
            style : {
                show: true,
                areaLine : false,
                lineWidth: 2,
                lineColor: "#9DF201"
            }
        }]);
        socketChart.setOptions(op);
        socketChart.draw();
    };
    var drawRegisterChart = function(registerCount,bindCard,openCount) {
        $("#registerChart").empty();
        registerChart = new LChart.Chart($("#registerChart"));
        var op = getDefaultOp([{
            dataId:"data2",
            xId : "x1",
            yId : "y1",
            data: [registerCount]
        },{
            dataId:"data3",
            xId : "x1",
            yId : "y1",
            data: [bindCard]
        },{
            dataId:"data4",
            xId : "x1",
            yId : "y1",
            data: [openCount]
        }],[{
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
        }]);
        registerChart.setOptions(op);
        registerChart.draw();
    };
    var drawPayChart = function(payCount,payinCount,tallyCount) {
        $("#payChart").empty();
        payChart = new LChart.Chart($("#payChart"));
        var op = getDefaultOp([{
            dataId:"data2",
            xId : "x1",
            yId : "y1",
            data: [payCount]
        },{
            dataId:"data3",
            xId : "x1",
            yId : "y1",
            data: [payinCount]
        },{
            dataId:"data4",
            xId : "x1",
            yId : "y1",
            data: [tallyCount]
        }], [{
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
        }]);
        payChart.setOptions(op);
        payChart.draw();
    };
    var drawAmountChart = function (payinAmount,payAmount) {
        $("#amountChart").empty();
        amountChart = new LChart.Chart($("#amountChart"));
        var op = getDefaultOp([{
            dataId:"data2",
            xId : "x1",
            yId : "y1",
            data: [payinAmount]
        },{
            dataId:"data3",
            xId : "x1",
            yId : "y1",
            data: [payAmount]
        }], [{
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
        }],{
            coordinate : {
                yaxis: [{
                    width : 80
                }]
            }
        });
        amountChart.setOptions(op);
        amountChart.draw();
    };
    var drawSocketChart = function( obj ) {
        var dt = new Date();
        var hours = dt.getHours();
        var mins = dt.getMinutes();
        if( hours == 23 && mins >= 55 ) {
            socketChart = null;
            registerChart = null;
            payChart = null;
        }
        var loginCount = obj["customer-login-count"] || 0;
        var registerCount = obj["customer-register-count"] || 0;
        var payCount = obj["transcore-pay-count"] || 0;  //交易笔数
        var bindCard = obj['customer-bind-card-count'] || 0; // 绑卡次数
        var openCount = obj['account-open-count'] || 0; // 新增开户数
        var payinCount = obj['clearing-payin-count'] || 0; // 代扣笔数
        var tallyCount = obj['account-tally-count'] || 0; // 账户记账笔数
        var payinAmount = obj['clearing-payin-amount'] || 0; // 交易金额
        var payAmount = obj['transcore-pay-amount'] || 0; // 代扣金额
        if( payAmount > 0 ) {
            payAmount = payAmount / 100;
        }
        if( payinAmount > 0 ) {
            payinAmount = payinAmount / 100;
        }
        if( socketChart == null ) {
            drawLoginChart(loginCount);
            drawRegisterChart(registerCount,bindCard,openCount);
            drawPayChart(payCount,payinCount,tallyCount);
            drawAmountChart(payinAmount,payAmount);
        }else{
            socketChart.realtimeRefresh( [{
                data:[loginCount], dataId: "data1"
            }], false );
            registerChart.realtimeRefresh( [{
                data:[registerCount], dataId: "data2"
            },{
                data:[bindCard], dataId: "data3"
            },{
                data:[openCount], dataId: "data4"
            }], false );
            payChart.realtimeRefresh( [{
                data:[payCount], dataId: "data2"
            },{
                data:[payinCount], dataId: "data3"
            },{
                data:[tallyCount], dataId: "data4"
            }], false );
            amountChart.realtimeRefresh( [{
                data:[payinAmount], dataId: "data2"
            },{
                data:[payAmount], dataId: "data3"
            }], false );
        }
    };
    var socket = io.connect(getDataUrl);
    socket.on("message", function( obj ){
        drawSocketChart(obj);
    });
});