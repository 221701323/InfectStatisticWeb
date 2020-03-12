function GET_provinceName() {
    var url = decodeURI(location.href);
    var string = url.split("=")[1];
    if (string == "内蒙古" || string == "西藏") {
        string += "自治区";
    } else if (string == "广西") {
        string += "回族自治区";
    } else if (string == "新疆") {
        string += "维吾尔自治区";
    } else if (string == "宁夏") {
        string += "回族自治区";
    } else if (string == "澳门" || string == "台湾" || string == "香港") {
        string = string;
    } else if (string == "北京" || string == "上海" || string == "重庆" || string == "天津") {
        string += "市";
    } else string += "省";
    return string;
}

function init(){
    var provincename;
    provincename=GET_provinceName();
    document.getElementById("provinceFect").innerText=provincename+"疫情";
    document.getElementById("provinceTrends").innerHTML=provincename+"疫情趋势";
}
document.getElementById("back").onclick=function(){
    var url = "index.html";
    window.location.assign(encodeURI(url));
}
function inLineChart(type){
    var title;
    if(type=="confirmedCount"){
        title="累计确诊人数";
    }
    if(type=="currentConfirmedCount"){
        title="现有确诊人数";
    }
    var mydata=GET_provinceData(GET_provinceName(),type);
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
                name: '累计确诊人数',
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

function inDate(){
    var lists=document.getElementById("data").children;
    var TimeData=timeData(GET_provinceName());
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
document.getElementById("currentConfirmedCount_line").onclick=function(){
    inLineChart("currentConfirmedCount");
}
document.getElementById("confirmedCount_line").onclick=function(){
    inLineChart("confirmedCount");
}
window.onload=function(){
    init();
    inDate();
    inLineChart("confirmedCount");
}