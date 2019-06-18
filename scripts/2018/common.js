//浏览器加入收藏
function AddFavorite(sURL, sTitle) {
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("抱歉，您所使用的浏览器无法完成此操作，请使用Ctrl+D进行添加");
        }
    }
}

//获取浏览器参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) {
        return  unescape(r[2]);
    }
    return null;
}