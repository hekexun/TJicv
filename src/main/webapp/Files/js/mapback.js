var carCarID = "begin";
var map = new BMap.Map("allmap");
map.setMapStyle({style:'light'});  // 设置为夜景模式
map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);  // 初始化地图,设置中心点坐标和地图级别
//添加地图类型控件
map.addControl(new BMap.MapTypeControl({
    mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
    ]
}));
map.setCurrentCity("天津");          // 设置地图显示的城市 此项是必须设置的
//map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
//map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
//map.addControl(new BMap.NavigationControl()); //添加地图缩放控件
map.addControl(new BMap.ScaleControl()); //添加比例尺控件
map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
//地图初始化结束

//实时获取数据
//webSocket对像
var webSocket = {};
var datas = [];
//开始
webSocket.start = function () {
    //测试websocket
    var wsImpl = window.WebSocket || window.MozWebSocket;
    var username = "ww"; // 获得当前登录人员的userName
//判断当前浏览器是否支持WebSocket
    //服务器地址
    var serverStr = document.location.host;//"60.30.94.170:8181";
    // create a new websocket and connect
    window.ws = new wsImpl('ws://'+serverStr+'/webSocket/'+username);
    // when data is comming from the server, this metod is called
    ws.onmessage = function (evt) { //console.log(evt.data);
        var temdata = JSON.parse(evt.data);
        setTimeout(startBmap(temdata), 5000);
    };

    // when the connection is established, this method is called
    ws.onopen = function () {
        //alert("open");
        send();
    };

    // when the connection is closed, this method is called
    ws.onclose = function () {
        //alert("close");
        window.ws.close();
        delete wsImpl;
        delete window.ws;
        setTimeout(webSocket.start, 2000);
    }

    function send() {
        //alert("send");
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
//send();
//数据获取结果
function startBmap(cardata) {
    // 百度地图API功能
    var tem_data = cardata;
    if (tem_data == null) {
        return null;
    } else {
        var a = tem_data.length;
    }
    var a = tem_data.length;
    var car_data = {};
    for (var i = 0; i < a; i++) {
        //判定是哪个id

        car_data = tem_data[i];
        var car = car_data;
        var loTime=car.sendDatetime;
        refreshTable(loTime,car_data.devPhone);
        //这个位置进行判定，是哪个坐标值发生了变化
        var index = 0;
        if ($.inArray(car_data.CarId, carCarID)) {
            var inof = 0;
            inof = car_data.CarId;
            for (var cc = 0; cc < carCarID.length; cc++) {
                if (car_data.CarId == carCarID[cc]) {
                    index = cc;
                }
            }
            //发生变化的坐标值进行重新赋值
            lastv = fist_data.SPEED;
            lastLot[index] = fist_data.LONGITUDE;
            lastLat[index] = fist_data.LATITUDE;
            lastDir[index] = fist_data.DIRECTION;
            var cas = JSON.parse(car).can

            for (var c = 0; c <car_data; c++) {
                var cans = cas[c].value;
                for (var d = 0; d < cans.length; d++) {
                    if (cans[d].varname == "瞬时油耗") {
                        lastoil[index] = cans.varvalue;
                    }
                    if (cans[d].varname == "油门踏板开度") {
                        lastkaidu[index] = cans.varvalue;
                    }
                    if (cans[d].varname == "发动机转速") {
                        lastengine[index] = cans.varvalue
                    }
                }
            }
        }
    }
    setTimeout(remove_overlay(), 5000);
    add_car();
function refreshTable(time,carid) {

    $("#errorTable tr:last").remove();
    var dom="<tr><td>"+carid+"</td><td>1</td><td>发动机故障</td><td>上汽</td><td></td>"+time+"</tr>";
    $("#errorTable").prepend(dom);
}
    function add_car() {
        for (var j = 0; j < carCarID.length; j++) {
            var content =
                "<div class=\"panel panel-default\">" +
                "<div class=\"panel-heading\">车辆信息</div>" +
                " <div class=\"panel-body\">" +
                //面板内容
                "<p><span class=\"text-muted\">车辆编号：</span><span class=\"text-muted\">" + carCarID[j] + "</span></p>" +
                "<p><span class=\"text-muted\">速度：</span><span class=\"text-muted\">" + lastv[j] + "</span></p>" +
                "<p><span class=\"text-muted\">转速：</span><span class=\"text-muted\">" + lastengine[j] + "</span></p>" +
                "<p><span class=\"text-muted\">油门踏板：</span><span class=\"text-muted\">" + lastkaidu[j] + "</span></p>" +
                "<p><span class=\"text-muted\">油耗：</span><span class=\"text-muted\">" + lastoil[j] + "</span></p>" +
                "</div>" +
                "</div>"
            add_overlay(content, lastLot[j], lastLat[j], lastDir[j]);
        }

    }

    function add_overlay(content, lot, lat, dir) {
        var pt = new BMap.Point(lot, lat);
        var myIcon = new BMap.Icon("img/car.png", new BMap.Size(50, 26));
        var marker = new BMap.Marker(pt, {icon: myIcon});
        marker.setRotation(dir + 90);
        map.addOverlay(marker);
        addClickHandler(content, marker);//增加点
    }

    //清除覆盖物
    //}
    function remove_overlay() {
        setTimeout(map.clearOverlays(), 5000);
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
    }

}