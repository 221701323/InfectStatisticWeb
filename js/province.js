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

document.getElementById("back").onclick = function () {
    var url = "index.html";
    window.location.assign(encodeURI(url));
}

function init() {
    var provincename;
    provincename = GET_provinceName();
    document.getElementById("provinceFect").innerText = provincename + "疫情";
    document.getElementById("provinceTrends").innerHTML = provincename + "疫情趋势";
    var date = new Date();
    var month = date.getMonth() + 1;
    month = month <= 9 ? '0' + month : month;
    var time = date.getFullYear() + "-" + month + "-" + date.getDate();
    document.getElementById("currentTime").value = time;
    document.getElementById("currentTime").max = time;
    document.getElementById("currentTime").min = "2020-02-01";
}

function inDate(areaData, date) {
    var lists = document.getElementById("data").children;
    var month = date.getMonth() + 1;
    var day = date.getDate() - 1;
    var yesterday = new Date(date.getFullYear + "-" + month + "-" + day);
    var TimeData = timeData(areaData, date);
    var yesterdayDate = timeData(areaData, yesterday);
    var strs = ['confrimed', 'currentConfirmed', 'suspected', 'cured', 'dead']
    for (var i = 0; i < strs.length; i++) {
        lists[i].children[0].innerHTML = TimeData[strs[i]]['count'];
        TimeData[strs[i]]['Incr'] = TimeData[strs[i]]['count'] - yesterdayDate[strs[i]]['count'];
        if (TimeData[strs[i]]['Incr'] >= 0) {
            lists[i].children[2].innerHTML = "昨日+" + TimeData[strs[i]]['Incr'];
        } else {
            lists[i].children[2].innerHTML = "昨日" + TimeData[strs[i]]['Incr'];
        }

    }
}

function inLineChart(type) {
    var title;
    if (type == "suspectedIncr") {
        title = "累计确诊人数";
    }
    if (type == "cured") {
        title = "治愈人数";
    }
    if (type == "confirmedIncr") {
        title = "新增确诊人数";
    }
    if (type == "dead") {
        title = "死亡人数";
    }
    var mydata = GET_provinceData(areaData, type);
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
                data: mydata.value
            }
        ]
    };
    var chart = echarts.init(document.getElementById('lineChart'));
    chart.setOption(option);
}

document.getElementById("cured_line").onclick = function () {
    inLineChart("cured");
}
document.getElementById("dead_line").onclick = function () {
    inLineChart("dead");
}
document.getElementById("confirmedIncr_line").onclick = function () {
    inLineChart("confirmedIncr");
}
document.getElementById("suspectedIncr_line").onclick = function () {
    inLineChart("suspectedIncr");
}
document.getElementById("currentTime").onchange = function () {
    var dateTime = new Date();
    var time = new Date(document.getElementById("currentTime").value);
    if (time.getMonth() == dateTime.getMonth() && time.getDate() > dateTime.getDate()) {
        time = new Date();
        inDate(areaData, time);
    } else if (time.getMonth() < 1) {
        time = new Date("2020-02-01");
        inDate(areaData, time);
    } else {
        inDate(areaData, time);
    }
}
document.getElementById("more").onclick = function () {
    n = n * 2;
    inNews(GET_provinceName(), n);
}
var areaData = GET_areaData(0, GET_provinceName());
var n = 5;
var date = new Date();
init();
inDate(areaData, date);
setTimeout(
    function () {
        //事件处理
        inLineChart("confirmedCount");
    },
    500);
inNews(GET_provinceName(), n);