$.ajax({
    async: false,
    type: 'get',
    url: 'https://lab.isaaclin.cn/nCoV/api/area',
    dataType: 'json',
    data: {
        latest: 1,
    },
    error: function (XmlHttpRequest, textStatus, errorThrown) {
        alert("操作失败!");
    },
    success: function (result) {
        date = result;
    }
});

function confirmedCountMap(area, confirmedCount) {

}
function datein() {
    var n = 0;
    // console.log(date);
    var data = new Array();
    date.results.forEach(element => {
        if (element.countryName == "中国") {
            // console.log(element);
            data[n] = { name: element.provinceShortName, value: element.confirmedCount }
            n++;
        }
    });
    // console.log(data);
    return data;
}
var mydata = datein();
var option = {
    backgroundColor: 'rgba(193, 240, 228, 1)',
    title: {
        text: '全国疫情累计感染人数',
        subtext: '（2020年1月24日下午4:00）至今',
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
            { start: 20000, end: 999999 }, { start: 10000, end: 20000 },
            { start: 1000, end: 9999 }, { start: 100, end: 999 },
            { start: 10, end: 99 }, { start: 0, end: 9 },
        ],
        color: ['#8B2323', '#8B6914', '#8B8B00', '#FF8C00', '#FFB90F', '#FFDEAD']
    },
    series: [{
        name: '累计确诊人数',
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
    var url = "test1.html?name=" + params.name;
    window.location.assign(encodeURI(url));
});