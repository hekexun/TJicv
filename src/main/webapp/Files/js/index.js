window.onload=indexinit();
function indexinit(){
    var user=$.cookie("userName");
    if(user==null)
    {
        alert("您还没有登录");
        window.location.href="/login.html";
    }else
    {
        $('#loginUser').html('user')
    }
}