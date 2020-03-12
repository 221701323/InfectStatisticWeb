var date=new Date();
//实现对第一部分个数据的填充
//未实现根据date选择数据
//通过timeData()获取数据
function inDate(){
    var lists=document.getElementById("data").children;
    var TimeData=timeData(null);
    var strs=['confrimed','currentConfirmed','suspected','cured','dead']
    for(var i=0;i<strs.length;i++){
        lists[i].children[0].innerHTML=TimeData[strs[i]]['count'];
        if(TimeData[strs[i]]['Incr']>=0){
            lists[i].children[2].innerHTML+="+"+TimeData[strs[i]]['Incr'];
        }else{
            lists[i].children[2].innerHTML+=TimeData[strs[i]]['Incr'];
        }
        
    }
}

//从mapDate(type)获取数据进行地图绘画
//可选择type有
//currentConfirmedCount
//confirmedCount
//date暂时还没实现
function inMap(type,date){
    var mydata = mapDate(type);
    var title;
    if(type=="currentConfirmedCount"){
        title="全国现有确诊人数";
    }
    if(type=="confirmedCount"){
        title="全国累计确诊人数"
    }
    var option = {
        backgroundColor: 'rgba(193, 240, 228, 1)',
        title: {
            text: title,
            subtext: "更新时间"+date.toUTCString(),
            x: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            show: true,
            x: 'left',
            y: 'bottom',
            splitList: [
                { start: 20000, end: 99999 }, { start: 10000, end: 20000 },
                { start: 1000, end: 9999 }, { start: 100, end: 999 },
                { start: 10, end: 99 }, { start: 1, end: 9 },
            ],
            color: ['#8B2323', '#8B6914', '#8B8B00', '#FF8C00', '#FFB90F', '#FFDEAD']
        },
        series: [{
            name: title,
            type: 'map',
            mapType: 'china',
            selectedMode: 'single',
            roam: true,
            scaleLimit: {
                min: 1,
                max: 1
            },
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data: mydata
        }]
    };
    
    var chart = echarts.init(document.getElementById('map'));
    chart.setOption(option);
    chart.on('click', function (params) {
        var url = "province.html?name=" + params.name;
        window.location.assign(encodeURI(url));
    });
}

//从GET_chinaData(type)获取数据绘制线图
//可选类型包括
//confirmedCount
//cured
//还为实现类型
//confirmedIncr
//dead
function inLineChart(type){
    var title;
    if(type=="confirmedCount"){
        title="累计确诊人数";
    }
    if(type=="cured"){
        title="治愈人数";
    }
    var mydata=GET_chinaData(type);
    var option = {
        title: {
            text: title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: mydata.name
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: title,
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {},
                data:mydata.value
            }
        ]
    };
    var chart = echarts.init(document.getElementById('lineChart'));
    chart.setOption(option);
}

//一系列按钮绑定
document.getElementById("currentConfirmedCount_map").onclick=function(){
    inMap("currentConfirmedCount",date);
}
document.getElementById("confirmedCount_map").onclick=function(){
    inMap("confirmedCount",date);
}

document.getElementById("cured_line").onclick=function(){
    inLineChart("cured");
}
document.getElementById("confirmedCount_line").onclick=function(){
    inLineChart("confirmedCount");
}

// 调用函数填充数据
inDate();
//调用函数绘制趋势
inLineChart("confirmedCount");
inNews(null);
//调用函数绘制地图
inMap("currentConfirmedCount",date);
