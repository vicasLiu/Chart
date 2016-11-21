# Chart
一个基于SVG的图形库；现支持柱状图，线图，OHLC图，K线图，饼图，环形图，仪表盘，瀑布图，区域图，雷达图等，20几种图形的配置。

#柱状图
    demo：  'demo/testBar.html',  //纵向基本的柱状图
        'demo/testBarZoom.html' //纵向可以动态改变数据的柱状图
        'demo/testColumn.html'  //横向的柱状图
    配置：
    {
        dataId:'data0',  //匹配的图形数据ID
        type:'bar',  // 图形的类型
        name:'销售额', // 图形显示的图列名称
        style:{
            eachColor:false, //是否独立配置每个柱子的颜色
            baseLine : 0,  // 图形的基准线
            fillColor:'#f29223', // 图形的填充颜色
            hoverColor:'#f00', // 鼠标移入的时候，高亮的颜色
            barWidth:10, // 图形的宽度
            section:true, //配置没条数据的图形都是独立的
            space:0, // 图形之间的间隔
            type:0, // 0 代表是平行摆放， 1 代表是层叠状
            leftSpace:null, //偏坐标轴左边的间隔
            strokeWidth: 0, //柱子的线宽
            strokeColor: "#333333", //柱子的线颜色
            hoverStrokeWidth:1, // 选中的柱子线宽
            hoverStrokeColor:"#333333", //选中的柱子线颜色
            desc : {  
                showDesc : true, // 是否在图形上方显示信息
                desc : [], //自定义的显示文字，默认是显示的当前柱状态代表的数据
                descCss : {  // 文字的样式配置
                    font:'normal 12px Hiragino Sans GB, sans-serif',
                },
                decimalNum : 0,  //小数点的位数
                left : 0,  //偏左的距离
                textColor : "",  //字体的颜色
                top : 0  //离柱子的距离
            }
        }
    }
#线图
    demo：  'demo/test.html',  
        'demo/testLine.html'
    配置：
    {
        dataId : "data1", //匹配的图形数据ID
        type : "line", // 图形的类型
        name : "ChartLineDemo", // 图形显示的图列名称
        style : {
            areaLine:true,  //是否需要填充
            lineWidth: 2, //线宽			  
            lineColor: "#00d435",  //线的颜色
            hoverColor: "#00d435", //hover时候的颜色
            areaColor: {  // 填充色
                startColor: "#5000d435",
                stopColor: "#0000d435"
            },
            marker: {  
                show: false,  //每个数据点上是否要显示marker
                showDesc : false,  //是否需要显示描述文字
                textColor : "#666",  // 字体的颜色
                shape: 2, // 1, 圆  2, 矩形
                width: 8, //矩形的宽
                height: 8, //矩形的高
                radius : 2, //圆的半径
                color: "#000000" //填充的颜色
            }
        }
    }
