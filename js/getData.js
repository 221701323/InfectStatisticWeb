var latestData;
function GET_latestData(i) {
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
            latestData = result.results;
            console.log(DATA);
        }
    });
}
function latestData() {
    GET_latestData(1);
    var data = latestData[0];
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