function GET_timeData(date) {
    var timeData;
    $.ajax({
        async: false,
        type: 'get',
        url: 'https://lab.isaaclin.cn/nCoV/api/overall',
        dataType: 'json',
        data: {
            latest: 0,
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败!");
        },
        success: function (result) {
            timeData = result.results;
            // console.log(DATA);
        }
    });
    timeData.forEach(element => {
        var time = new Date(element.updateTime)
        if (time.getMonth() == date.getMonth() && time.getDay() == date.getDay() && time.getFullYear() == date.getFullYear()) {
            return element;
        }
    });
    return false;
}
function timeData() {
    var date = new Data();
    var data = GET_timeData(date);
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
function GET_areaData(i, provinceName) {
    var areaData;
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
            alert("操作失败!");
        },
        success: function (result) {
            areaData = result.results;
            // console.log(areaData);
        }
    });
    return areaData;
}
function datein(type) {
    var n = 0;
    var areaData = GET_areaData(1, null);
    var data = new Array();
    areaData.forEach(element => {
        if (element.countryName == "中国") {
            data[n] = { name: element.provinceShortName, value: element.confirmedCount }
            n++;
        }
    });
    return data;
}
function GET_provinceData(provinceName,type) {
    var n = 0;
    var data = new Array();
    var data1 = new Array();
    GET_areaData(0, provinceName).forEach(element => {
        var d = new Date(element.updateTime);
        var str = d.getMonth() + 1 + "月" + d.getDate() + "日";
        if (n == 0 || data1[n / 2] != str) {
            if (n % 2 == 0&&element.confirmedCount!=null&&element.currentConfirmedCount!=null) {
                if(type=="confirmedCount"){
                    data[n / 2] = element.confirmedCount;
                }
                if(type=="currentConfirmedCount"){
                    data[n / 2] = element.currentConfirmedCount;
                }
                
                data1[n / 2] = str;
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

