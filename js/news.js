function news(provinceName,n){
    var newsData;
    $.ajax({
        async: false,
        type: 'get',
        url: 'https://lab.isaaclin.cn/nCoV/api/news',
        dataType: 'json',
        data: {
            province:provinceName,
            num:n
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

function inNews(provinceName,n){
    var newlists=news(provinceName,n);
    var list=document.getElementById("list");
    list.innerHTML="";
    newlists.forEach(element => {
        list.innerHTML+="<li><a class='title' href='"+element.sourceUrl+"'>"+element.title+"</a>"+
        "<span class='introducte'>"+element.summary+"</span></li>"
    });
}