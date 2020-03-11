function inMap(type){
    var mydata = mapDate(type);
    var title;
    if(type=="confirmedCount"){
        title="全国现有确诊人数";
    }
    if(type=="currentConfirmedCount"){
        title="全国累计确诊人数"
    }
    var option = {
        backgroundColor: 'rgba(193, 240, 228, 1)',
        title: {
            text: title,
            subtext: "更新时间"+date.getFullYear()+"年"+date.getMonth()+"月"+date.getDay()+"日",
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
                { start: 10, end: 99 }, { start: 0, end: 9 },
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

// var date=new Date();
inMap("confirmedCount");