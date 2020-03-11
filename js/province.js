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