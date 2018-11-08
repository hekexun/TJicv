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
function dshow(){
    $("#mediaWindow").css('display','none');
}

function createmap() {
    map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);  // 初始化地图,设置中心点坐标和地图级别
    /*
//添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
        mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]
    }));
    */
    map.setCurrentCity("天津");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
    map.setMapStyle({style: 'midnight'});
    //map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
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
                        myIcon == new BMap.Icon("img/car.png", new BMap.Size(50, 26));
                    }
                    markers[i] = new BMap.Marker(pt, {icon: myIcon});
                    var content={};
                    content["carID"]=temdata.devPhone;
                    content["carDEV"]=temdata.devPhone;
                    content["speed"]=temdata.gpsSpeed;
                    content["engine"]=temdata.engine;
                    content["acce"]=temdata.acceleratorPedal;
                    content["drivemode"]=temdata.drivemode;
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
        var content={};
        content["carID"]=carData.devPhone;
        content["carDEV"]=carData.devPhone;
        content["speed"]=carData.gpsSpeed;
        content["engine"]=carData.engine;
        content["acce"]=carData.acceleratorPedal;
        content["drivemode"]=carData.drivemode;
        markers[i].setPosition(pt);
        markers[i].setRotation(cars.gpsDirect + 90);
        var myIcon = new BMap.Icon("img/car.png", new BMap.Size(50, 26));
        markers[i].setIcon(myIcon);
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
    /*
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
    //map.openInfoWindow(infoWindow, point); //开启信息窗口*/
    $("#carID").text(content.carID);
    $("#carDEV").text(content.carDEV);
    $("#speed").text(content.speed);
    $("#engine").text(content.engine);
    $("#acce").text(content.acce);
    $("#drivemode").text(content.drivemode);
    $("#mediaWindow").show();
    getVideo(content.carDEV);
}
function getVideo(carDEV) {
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
                    "login_name": "catarc_sj",
                    "pass_word": "catarc8437",
                    "expirationmillis": 60000000,
                }),
            success: function (data_or) {
                var terminal = data_or;
                if (terminal.code == "S001") {
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
    if (carDEV!=null)
    {
        var url_1="http://cloud.calmcar.com:5003/api/vbox/"+carDEV;
        $.ajax({
                type: "post",
                async: false,
                url: url_1,
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("token", token);
                },
                data: JSON.stringify({"ispush": 1}),
                success: function (data) {
                    if (data != null) {
                        var re_data = data.data;
                        if (data.status == "success"&&re_data.ispush==1) {
                            url = eval(re_data.message).pullUrl;
                            document.getElementById("videoid").src = url;
                            document.getElementById("videoid").play();
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
}
