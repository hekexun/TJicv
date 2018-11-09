var user = $.cookie("userName");
window.onload = indexinit();

function indexinit() {
    if (user == null) {
        alert("您还没有登录");
        window.location.href = "/login.html";
    } else {
        $('#loginUser').html('user')
    }
    getCarInfo();
}
function  getCarInfo() {
    $.cookie('username', null);
    var userName = $("#username").val();
    $.ajax({
            type:"post",
            url:"carInfo.do",
            dataType: 'json',
            data:{"username": "123", "password": "123"},
            success:function(data_or){
                //var user=data_or;
                if (data_or!=null) {
                    for (var i=0;i<data_or.length;i++)
                    {
                        $("#errorTable tr:last").remove();
                        var dom="<tr><td>"+data_or[i].carNumber+"</td><td>"+data_or[i].bread+"</td><td>"+data_or[i].series+"</td><td>"+data_or[i].classify+"</td><td>"+data_or[i].year+"</td></tr>";
                        $("#carInfo").prepend(dom);
                    }
                } else {
                    alert("登陆失败");
                    window.location.reload();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        }
    );
}