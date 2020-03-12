//返回最新发布的内容，全国的状况
// latest	
//1：返回最新数据（默认）
// 0：返回时间序列数据
function GET_timeData(i) {
    var timeData;
    $.ajax({
        async: false,
        type: 'get',
        url: 'https://lab.isaaclin.cn/nCoV/api/overall',
        dataType: 'json',
        data: {
            latest: i,
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败!");
        },
        success: function (result) {
            timeData = result.results;
            // console.log(timeData);
        }
    });
    return timeData;
}

//将从GET_timeData(i)获取的数据处理后返回用于Date数据
//参数provinceName
//=省份名时返回该省份的数据
//=null时返回全国数据
//全国数据还为根据选择的date选取数据
//接口的全国数据可能会出现没有新增的数据（未处理）
//省份的数据没有新增数据（未处理）
function timeData(provinceName) {//整理数据，获取合理的数据
    var date = new Date();
    var data = null;
    var timeData;
    if (provinceName != null) {
        timeData = GET_areaData(0, provinceName);
        // console.log(i)
    } else {
        timeData = GET_timeData(1);
    }
    timeData.forEach(element => {
        if (data == null) {
            var time = new Date(element.updateTime)
            if (time.getMonth() == date.getMonth() && time.getDay() == date.getDay() && time.getFullYear() == date.getFullYear()) {
                data = element;
            }
        }
    });
    var Data = {
        currentConfirmed: {//现存确诊人数
            count: data.currentConfirmedCount,
            Incr: data.currentConfirmedIncr
        },
        confrimed: {//累计确诊人数
            count: data.confirmedCount,
            Incr: data.confirmedIncr
        },
        cured: {//治愈人数
            count: data.curedCount,
            Incr: data.curedIncr
        },
        dead: {//死亡人数
            count: data.deadCount,
            Incr: data.deadIncr
        },
        serious: {//重症病例人数
            count: data.seriousCount,
            Incr: data.seriousIncr
        },
        suspected: {//疑似病例人数
            count: data.suspectedCount,
            Incr: data.suspectedIncr
        }
    };
    return Data;
}

// 接口介绍
// 返回自2020年1月22日凌晨3:00（爬虫开始运行）至今
// 中国所有省份、地区或直辖市及世界其他国家的所有疫情信息变化的时间序列数据（精确到市），
// 能够追溯确诊/疑似感染/治愈/死亡人数的时间序列。
// latest	
// 1：返回最新数据（默认）
// 0：返回时间序列数据
// province	省份、地区或直辖市，如：湖北省、香港、北京市。
//函数介绍
//可选参数provinceName
//null：返回所有的数据
//省份名：返回省份的数据
function GET_areaData(i, provinceName) {
    var DATA;
    $.ajax({
        async: false,
        type: 'get',
        url: 'https://lab.isaaclin.cn/nCoV/api/area',
        dataType: 'json',
        data: {
            latest: i,
            province: provinceName
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败1!");
        },
        success: function (result) {
            DATA = result.results;
            // console.log(DATA);
        }
    });
    return DATA;
}

//调用GET_areaData(1, null)获取最新的所有数据
//选取countryName属性为中国的数据
//构成地图数据
function mapDate(type) {
    var n = 0;
    var areaData = GET_areaData(1, null);
    var data = new Array();
    areaData.forEach(element => {
        if (element.countryName == "中国") {
            if (type == "confirmedCount") {
                data[n] = { name: element.provinceShortName, value: element.confirmedCount }
                n++;
            } else {
                data[n] = { name: element.provinceShortName, value: element.currentConfirmedCount }
                n++;
            }

        }
    });
    return data;
}

//获取全国的历史数据
//类型有：
// confirmedNum
// curesNum
// date
// deathsNum
// suspectedNum
function historyData() {
    var data;
    $.ajax({
        async: false,
        type: 'get',
        url: 'http://www.dzyong.top:3005/yiqing/history',
        dataType: 'json',
        data: {
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败!");
        },
        success: function (result) {
            data = result.data;
            // console.log(result);
        }
    });
    return data;
}

//通过historyData()获取全国的历史数据
//根据type可选取不同的数据
// curesNum、deathsNum可直接用
// confirmedNum、suspectedNum需要进行处理，获得增量，而不是直接量
//已完成cured
function GET_chinaData(type) {
    var n = 0;
    var data = new Array();
    var data1 = new Array();
    historyData().forEach(element => {
        var str = element.date;
        if (type == "confirmedCount") {
            data[n] = element.confirmedNum;
        }
        if (type == "cured") {
            data[n] = element.curesNum;
        }
        data1[n] = str;
        n++;
    });
    var mydata = { name: data1, value: data };
    console.log(mydata);
    return mydata;
}


function GET_provinceData(provinceName, type) {
    var n = 0;
    var data = new Array();
    var data1 = new Array();
    GET_areaData(0, provinceName).forEach(element => {
        var d = new Date(element.updateTime);
        var str = d.getMonth() + 1 + "月" + d.getDate() + "日";
        if (n == 0 || data1[n] != str) {
            if (element.confirmedCount != null && element.currentConfirmedCount != null) {
                if (type == "confirmedCount") {
                    data[n] = element.confirmedCount;
                }
                if (type == "currentConfirmedCount") {
                    data[n] = element.currentConfirmedCount;
                }
                data1[n] = str;
            }
            n++;
        }
    });
    var mydata = { name: data1, value: data };
    for (var first = 0, last = mydata.name.length - 1; first < last; first++, last--) {
        var temp = mydata.name[first];
        mydata.name[first] = mydata.name[last];
        mydata.name[last] = temp;
        temp = mydata.value[first];
        mydata.value[first] = mydata.value[last];
        mydata.value[last] = temp;
    }
    return mydata;
}

