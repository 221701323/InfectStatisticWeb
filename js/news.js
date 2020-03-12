function news(provinceName){
    var newsData;
    $.ajax({
        async: false,
        type: 'get',
        url: 'https://lab.isaaclin.cn/nCoV/api/news',
        dataType: 'json',
        data: {
            province:provinceName,
            num:5
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败!");
        },
        success: function (result) {
            newsData=result.results;
        }
    });
    return newsData;
}

function inNews(provinceName){
    var newlists=news(provinceName);
    var list=document.getElementById("list");
    newlists.forEach(element => {
        list.innerHTML+="<li><a class='title' href='"+element.sourceUrl+"'>"+element.title+"</a>"+
        "<span class='introducte'>"+element.summary+"</span></li>"
    });
}