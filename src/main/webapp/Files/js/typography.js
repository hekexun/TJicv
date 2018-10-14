//地图控件初始化
var user = $.cookie("userName");
var markers = [];
var map;
window.onload = indexinit();

function indexinit() {
    if (user == null) {
        alert("您还没有登录");
        window.location.href = "/login.html";
    } else {
        $('#loginUser').html('user')
    }
    createmap();
    addcarmarkers();
}

function createmap() {
    map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);  // 初始化地图,设置中心点坐标和地图级别
//添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
        mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]
    }));
    map.setCurrentCity("天津");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
    map.setMapStyle({style: 'midnight'});
    map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
    map.addControl(new BMap.NavigationControl()); //添加地图缩放控件
    map.addControl(new BMap.ScaleControl()); //添加比例尺控件
    map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
// 地图初始化结束
}

//获取所有的车辆，组成marker，并且显示
function addcarmarkers() {
    $.ajax({
            type: "post",
            url: "car.do",
            dataType: 'json',
            async: false,
            data: {"username": "123", "password": "123"}, //JSON.stringify({"username": "123"}),
            success: function (data_or) {
                var temdata = data_or;
                var i=0;
                for (cars in temdata) {
                    var pt = new BMap.Point(cars.gpsPosY, cars.gpsPosX);
                    var myIcon;
                    if (cars.isonline == 1) {
                        myIcon == new BMap.Icon("img/car.png", new BMap.Size(50, 26));
                    } else {
                        myIcon == new BMap.Icon("img/car2.png", new BMap.Size(50, 26));
                    }
                    markers[i] = new BMap.Marker(pt, {icon: myIcon});
                    var content =
                        "<div class=\"panel panel-default\">" +
                        "<div class=\"panel-heading\">车辆信息</div>" +
                        " <div class=\"panel-body\">" +
                        //面板内容
                        "<p><span class=\"text-muted\">车辆编号：</span><span class=\"text-muted\">" + cars.devPhone + "</span></p>" +
                        "<p><span class=\"text-muted\">速度：</span><span class=\"text-muted\">" + cars.gpsSpeed + "</span></p>" +
                        "<p><span class=\"text-muted\">转速：</span><span class=\"text-muted\">" + cars.engine + "</span></p>" +
                        "<p><span class=\"text-muted\">加速踏板：</span><span class=\"text-muted\">" + cars.acceleratorPedal + "</span></p>" +
                        "<p><span class=\"text-muted\">驾驶模式：</span><span class=\"text-muted\">" + cars.drivemode + "</span></p>" +
                        "</div>" +
                        "</div>"
                    markers[i].getPosition()
                    markers[i].setRotation(cars.gpsDirect + 90);
                    map.addOverlay(markers[i]);
                    addClickHandler(content, markers[i]);//增加点
                    i++;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        }
    );
}

var carCarID = "begin";
//实时获取数据
//webSocket对像
var webSocket = {};
var datas = [];
//开始
webSocket.start = function () {
    var wsImpl = window.WebSocket || window.MozWebSocket;
//服务器地址
    var serverStr = document.location.host;//"60.30.94.170:8181";
// create a new websocket and connect
    window.ws = new wsImpl('ws://' + serverStr + '/webSocket/' + user);
// when data is comming from the server, this metod is called
    ws.onmessage = function (evt) {
        var temdata = JSON.parse(evt.data);
        setTimeout(startBmap(temdata), 5000);
    };

// when the connection is established, this method is called
    ws.onopen = function () {
        send();
    };

// when the connection is closed, this method is called
    ws.onclose = function () {
        window.ws.close();
        delete wsImpl;
        delete window.ws;
        setTimeout(webSocket.start, 2000); //随什么start
    }

    function send() {
        var obj = {
            RequestDataType: "AllRealTimeData",
            RequestType: "AddCars",
            CarIds: carCarID
        };
        ws.send(JSON.stringify(obj));
    }

    function remove() {
        var obj = {
            RequestDataType: "AllRealTimeData",
            RequestType: "RemoveCars",
            CarIds: [15943]
        };
        ws.send(JSON.stringify(obj));
    }


}
window.onload = webSocket.start;

//数据获取结果
function startBmap(cardata) {
    // 百度地图API功能
    if (cardata == null) {
        return null;
    }
    for (var i = 0; i < cardata.length; i++) {
        //判定是哪个id
        setCar(cardata[i], i);
    }

    function refreshTable(time, carid) {

        $("#errorTable tr:last").remove();
        var dom = "<tr><td>" + carid + "</td><td>1</td><td>发动机故障</td><td>上汽</td><td></td>" + time + "</tr>";
        $("#errorTable").prepend(dom);
    }

    function setCar(carData, i) {
        var pt = new BMap.Point(carData.gpsPosY, carData.gpsPosX);
        var content =
            "<div class=\"panel panel-default\">" +
            "<div class=\"panel-heading\">车辆信息</div>" +
            " <div class=\"panel-body\">" +
            //面板内容
            "<p><span class=\"text-muted\">车辆编号：</span><span class=\"text-muted\">" + carData.devPhone + "</span></p>" +
            "<p><span class=\"text-muted\">速度：</span><span class=\"text-muted\">" + carData.gpsSpeed + "</span></p>" +
            "<p><span class=\"text-muted\">转速：</span><span class=\"text-muted\">" + carData.engine + "</span></p>" +
            "<p><span class=\"text-muted\">加速踏板：</span><span class=\"text-muted\">" + carData.acceleratorPedal + "</span></p>" +
            "<p><span class=\"text-muted\">驾驶模式：</span><span class=\"text-muted\">" + carData.drivemode + "</span></p>" +
            "</div>" +
            "</div>"
        marker[i].setPosition(pt);
        markers[i].setRotation(cars.gpsDirect + 90);
        addClickHandler(content, markers[i]);
    }
}
function addClickHandler(content, marker) {
    marker.addEventListener("click", function (e) {
            openInfo(content, e)
        }
    );
}
function openInfo(content, e) {
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
    map.openInfoWindow(infoWindow, point); //开启信息窗口
    $("#mediaWindow").show();
}
function getVideo() {
    ///获得token
    var token;
    $.ajax({
            type: "post",
            async: false,
            url: "http://cloud.calmcar.com:5003/api/dologin",
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(
                {
                    "username": "catarc_sj",
                    "password": "catarc8437",
                    "expirationmillis": 60000000,
                }),
            success: function (data_or) {
                var terminal = data_or;
                //r temdata=terminal.text;
                if (terminal.data != null) {
                    var token_json = eval(terminal.data);
                    token = token_json.token;
                } else {
                    alert("登陆失败");
                    window.location.reload();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        }
    );
    //获得设备列表
    $.ajax({
            type: "get",
            async: false,
            url: "http://cloud.calmcar.com:5003/api/vboxlist",
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("token", token);
            },
            //Header:JSON.stringify({"token": token}),
            success: function (data_or) {
                var user = data_or;
                if (user.data != null) {
                    var url_array = user.data;
                    for (i = 0; i < 1; i++)//url_array.length;i++)
                    {
                        var t_id = eval(url_array[i]).devNo;
                        if (1 == 1)//vbox_no)
                        {
                            var url_ispush = eval(url_array[i]).ispush;
                            if (url_ispush == 1) {
                                url = eval(url_array[i]).pullUrl;
                                document.getElementById("videoid").src = url;
                                document.getElementById("videoid").play();
                            } else { //进行设置视频，让他开始推送，推送后才开始进行播放
                                $.ajax({
                                    type: "post",
                                    async: false,
                                    url: "http://cloud.calmcar.com:5003/api/vbox/" + t_id,
                                    contentType: 'application/json;charset=utf-8',
                                    dataType: 'json',
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader("token", token);
                                    },
                                    //Header:JSON.stringify({"token": token}),
                                    data: JSON.stringify({"ispush": "1"}),
                                    success: function (data_or) {
                                        var re = data_or;
                                        var re_data = data_or.data;
                                        if (re.status == "success") {
                                            url = eval(re_data.message).pullUrl;
                                            document.getElementById("videoid").src = url;
                                            document.getElementById("videoid").play();
                                        }
                                    },
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        alert(XMLHttpRequest.status);
                                        alert(XMLHttpRequest.readyState);
                                        alert(textStatus);
                                    }
                                });
                            }
                        }

                    }
                    //token=token_json.token;
                } else {
                    alert("获取视频失败");
                    window.location.reload();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        }
    );
}
