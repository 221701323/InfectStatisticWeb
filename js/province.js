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
    } else if (string == "澳门" && string == "台湾" || string == "香港") {
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
init();
function datein() {
    var n = 0;
    var data = new Array();
    var data1 = new Array();
    date.results.forEach(element => {
        var d = new Date(element.updateTime);
        var str = d.getMonth() + 1 + "月" + d.getDate() + "日";
        if (n == 0 || data1[n/2] != str) {
            if(n%2==0){
                 data[n/2] = element.confirmedCount;
                data1[n/2] = str;
            }
           n++;
        }
    });
    // console.log(mydata);
    return { name: data1, value: data };
}
var mydata = datein();
for (var first = 0, last = mydata.name.length - 1; first < last; first++ , last--) {
    var temp = mydata.name[first];
    mydata.name[first] = mydata.name[last];
    mydata.name[last] = temp;
}
for (var first = 0, last = mydata.value.length - 1; first < last; first++ , last--) {
    var temp = mydata.value[first];
    mydata.value[first] = mydata.value[last];
    mydata.value[last] = temp;
}
var option = {
    title: {
        text: '累计确诊人数'
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

var chart = echarts.init(document.getElementById('main'));
chart.setOption(option);
document.getElementById("currentConfirmedCount_line").onclick=function(){

}