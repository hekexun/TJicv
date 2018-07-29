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
    /////柱状图
    var ext=echarts.init(document.getElementById('carOnline'));///$("#ext1").get(0));
    option = {
        title : {
            text: '近7天上线量',
            subtext: 'Data From Catarc'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['车辆数']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['1','2','3','4','5','6','7']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'车辆数',
                type:'bar',
                data:[9, 11, 3, 5, 4, 33, 2],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };

    ext.setOption(option);
}