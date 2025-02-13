/**
 * Created by zhaohehe on 16/9/21.
 */

var map

var observedRainfallImage = ''

// 风圈
var windCircle = []

// 台风路径上的窗体信息
var windInfoWindow

/**
 * 根据台风等级获取不同的icon
 * @param level
 * @returns {string}
 */
function getIconByLevel(level) {
    var icon = ''

    switch (level)
    {
        case 'SuperTY':
            icon = 'tc_6_suty.png';
            break;
        case 'STY':
            icon = 'tc_5_sty.png';
            break;
        case 'TY':
            icon = 'tc_4_ty.png';
            break;
        case 'STS':
            icon = 'tc_3_sts.png';
            break;
        case 'TS':
            icon = 'tc_2_ts.png';
            break;
        case 'TD':
            icon = 'tc_1_td.png';
            break;
    }
    return 'pic/' + icon
}

/**
 * 根据台风等级获取路径颜色
 * @param level
 * @returns {string}
 */
function getColorByLevel(level) {
    var color = '';

    switch (level)
    {
        case 'SuperTY':
            color = '#e73118';
            break;
        case 'STY':
            color = '#b52108';
            break;
        case 'TY':
            color = '#ff8c00';
            break;
        case 'STS':
            color = '#ffd608';
            break;
        case 'TS':
            color = '#f7ef63';
            break;
        case 'TD':
            color = '#39b59c';
            break;
    }
    return color
}

/**
 * 绘制点和线
 * @param path
 * @param map
 */
function drawTyphoonPath(path, map) {

    // 路径起始点上写台风名称
    var firstPoint = path['point'][0]

    setName(firstPoint, path.name, map);

    for(var j = 0; j < path['point'].length; j ++) {

        var point = path['point'][j]

        // 画点
        var icon = new AMap.Icon({
            image: getIconByLevel(point.cmn),
            imageOffset: new AMap.Pixel(10, 10)
        })
        var marker = new AMap.Marker({
            position: new AMap.LngLat(point.lng, point.lat),
            icon: icon,
            offset: new AMap.Pixel(-17.5, -17.5)
        })

        marker.setMap(map)
        point.title = path['title']
        marker.point = point
        marker.map = map
        marker.on('click', drawTyphoonPointDetail)   // 绘制点的详细信息窗体

        // 画线
        if (j < path['point'].length - 1) {
            new AMap.Polyline({
                path: [
                    [point.lng, point.lat],
                    [path['point'][j+1].lng, path['point'][j+1].lat]
                ],
                strokeColor: getColorByLevel(point.cmn),
                lineJoin: 'round',
                lineCap: 'round',
                zIndex: 50,
            }).setMap(map)
        }
    }
}

/**
 * 绘制信息窗体
 * @param e
 */
function drawTyphoonPointDetail(e) {

    var point = e.target.point
    var position = point.lat + 'N' + '/' + point.lng + 'E'

    var info = []
    info.push("<p class='input-item'>"+ point.title +"</p>");

    var detail = [
        ['Record Time', '记录时间', point.time],
        ['Location', '位置', position],
        ['Center Pressure', '中心气压', point.press + ' hPa'],
        ['Wind Speed', '风速', point.windspeed + ' m/s'],
        ['Travel Direction', '移动方向', point.direction],
        ['Travel Speed', '移动速度', point.speed + ' km/h'],
        ['Scale 7 Wind', '七级风范围', point.t_kts + ' km'],
    ];

    if (point.f_kts != '') {
        detail.push(['Scale 12 Wind', '十二级风范围', point.f_kts + ' km']);
    }

    info.push("<table border='1' width='380'>")
    detail.forEach(function (t) {
        info.push("<tr><th>"+t[0]+"</th><th>"+t[1]+"</th><th>"+t[2]+"</th></tr>");
    })
    info.push("</table>")

    windInfoWindow = new AMap.InfoWindow({
        content: info.join("")
    });

    windInfoWindow.open(e.target.map, [point.lng, point.lat])

    // 绘制风圈
    drawWindCircle(point, e.target.map)
}

/**
 * 绘制风圈
 * @param point
 */
function drawWindCircle(point, map) {
    // 请求服务端计算风圈半径上的点坐标
    var paths = $.ajax({ type: "GET",
        url:"index.php/typhoon/generateCircle",
        data:"point="+JSON.stringify(point),
        async:false
    }).responseText;

    paths = eval('(' + paths + ')');

    if (windCircle != null) {
        map.remove(windCircle)
    }

    // 绘制多边形
    for (var i = 0; i < paths.length; i ++) {
        var path = []
        for (var j = 0; j < 124; j ++) {
            path.push([paths[i][j][1], paths[i][j][0]])
        }

        var circle = new AMap.Polygon({
            path: path,
            strokeWeight: 0,
            strokeColor: '#1791fc',
            strokeOpacity: 0.4,
            fillOpacity: 0.4,
            fillColor: '#1791fc',
            zIndex: 50,
        })

        map.add(circle)
        windCircle.push(circle)
    }
}

/**
 * 绘制预报路径
 * @param path
 * @param map
 */
function drawForecastPath(path, map) {
    var point = path['point'][0]
    var icon = new AMap.Icon({
        image: 'pic/tc_0_f.png',
    })

    var prePoint = path['point'][path['point'].length - 1]
    var times = ['12', '24', '36', '48']
    times.forEach(function (time) {
        if (path['next_'+time+'_lng'] && path['next_'+time+'_lng'] != '') {
            // 点
            var position = new AMap.LngLat(path['next_'+time+'_lng'], path['next_'+time+'_lat'])
            var marker = new AMap.Marker({
                position: position,
                icon: icon,
                offset: new AMap.Pixel(-5, -5)
            })
            marker.setMap(map)

            if (time == '12') {
                prePoint = [prePoint.lng, prePoint.lat]
            } else {
                var preTime = time - 12
                prePoint = [path['next_'+preTime+'_lng'], path['next_'+preTime+'_lat']]
            }

            // 线
            var polyline = new AMap.Polyline({
                path: [
                    [path['next_'+time+'_lng'], path['next_'+time+'_lat']],
                    prePoint
                ],
                strokeColor: "red",
                strokeStyle: "dashed",
                zIndex: 50,
            })
            polyline.setMap(map)
        }
    })
}

function just_show_typhoon() {
    // 首先得到用户选中的所有台风
    var typhoon = $('input[name = "Typhoon"]');
    var typhoon_str = '';
    for(var i = 0;i < typhoon.length; i ++)
    {
        if(typhoon[i].checked) typhoon_str += typhoon[i].value + '_';
    }

    //将台风列表发送给后端，得到返回的具体路径信息
    var path = $.ajax({ type: "GET",
        url:"index.php/typhoon/path",
        data:"typhoon_str="+typhoon_str,
        async:false
    }).responseText;

    var map = setmap('');    // 重置地图

    if(path != 'kong') {
        var path = eval('(' + path + ')');    // 将json字符串转换成json对象
        for(var i = 0; i < path.length; i ++) {
            drawTyphoonPath(path[i], map)
            drawForecastPath(path[i], map)
        }
    }

    return map
}

/**
 * 绘制台风
 */
function show_typhoon()
{
    // 首先得到用户选中的所有台风
    var typhoon = $('input[name = "Typhoon"]');
    var typhoon_str = '';
    for(var i = 0;i < typhoon.length; i ++)
    {
        if(typhoon[i].checked) typhoon_str += typhoon[i].value + '_';
    }

    //将台风列表发送给后端，得到返回的具体路径信息
    var path = $.ajax({ type: "GET",
        url:"index.php/typhoon/path",
        data:"typhoon_str="+typhoon_str,
        async:false
    }).responseText;

    var map = setmap('');    // 重置地图

    if(path != 'kong') {
        var path = eval('(' + path + ')');    // 将json字符串转换成json对象
        for(var i = 0; i < path.length; i ++) {
            drawTyphoonPath(path[i], map)
            drawForecastPath(path[i], map)
        }
    }

    // 检查当前台风是否存在对应的累计降雨量图
    observedRainfall(path)
}

/**
 * 绘制台风名称
 * @param position
 * @param name
 * @param map
 */
function setName(position, name, map) {

    var text = new AMap.Text({
        text:name,
        anchor:'bottom-left', // 设置文本标记锚点
        style:{
            'text-align': 'center',
            'font-size': '12px',
        },
        position: [position.lng,position.lat]
    });

    text.setMap(map);
}

function setmap(typhoon, observe_rainfall)
{
    map = new AMap.Map('tcat_map', {
        center:[121.506, 31.235],
        zoom:4,
        lang:'zh_en',
        doubleClickZoom: 0,
        keyboardEnable:0,
        scrollWheel:1,
        touchZoom:0,
        isHotspot:0,
        features: ['bg', 'road', 'point'], <!-- ['bg', 'road', 'building', 'point'] -->
    });

    // 同时引入工具条插件，比例尺插件和鹰眼插件
    AMap.plugin(
        ['AMap.ToolBar','AMap.Scale','AMap.Weather'],
        function()
        {
            map.addControl(new AMap.ToolBar(
                {
                    offset: new AMap.Pixel(10,90),
                    position:'RT',
                    ruler:false,
                    noIpLocate:true,
                    locate:false,
                    liteStyle:true,
                    autoPosition:false,
                }
            ));

            map.addControl(new AMap.Scale(
                {
                    offset: new AMap.Pixel(15,40),
                }
            ));
        }
    );

    // 香港画个圈
    var circleMarker_four = new AMap.Circle({
        center: new AMap.LngLat(114.161244,22.278540),  // 圆心位置
        radius:400000, // 圆半径
        fillOpacity: 0,
        strokeStyle: 'dashed',
        strokeWeight: 1,
        strokeColor: 'black',
        strokeOpacity:'0.4',
    });

    var circleMarker_eight = new AMap.Circle({
        center: new AMap.LngLat(114.161244,22.278540),  // 圆心位置
        radius:800000, // 圆半径
        fillOpacity: 0,
        strokeStyle: 'dashed',
        strokeWeight: 1,
        strokeColor: 'black',
        strokeOpacity:'0.4',
    });

    map.add(circleMarker_four);
    map.add(circleMarker_eight);

    // 画台风路径
    if (typhoon !== '') {
        var path = JSON.parse(typhoon);    // 将json字符串转换成json对象
        for(var i = 0; i < path.length; i ++) {
            drawTyphoonPath(path[i], map)
            drawForecastPath(path[i], map)
            $("#ck_" + path[i]['id']).prop("checked",true);   //勾选
        }

        var observe_rainfall = JSON.parse(observe_rainfall);    // 将json字符串转换成json对象
        // 检查当前台风是否存在对应的累计降雨量图
        observedRainfallWithoutQuery(observe_rainfall)
    }

    return map
}

function showTyphoonWithImageLayer(imageLayer) {
    var map = just_show_typhoon()
    map.add(imageLayer)
}

function rainfall(hours, images) {

    var arr = [12, 24, 48, 72]
    for (var i in arr) {
        if (hours != arr[i]) {     // uncheck
            document.getElementById("rainfall_" + arr[i]).checked = false
        } else if (document.getElementById("rainfall_" + arr[i]).checked === true) {

            // 取消观测降雨量
            document.getElementById('observedRainfallCheck').checked = false

            var imageLayer = new AMap.ImageLayer({
                url: images,
                bounds: new AMap.Bounds([68.3, -13],[156.7, 70]),
                opacity: 0.5,
            });

            showTyphoonWithImageLayer(imageLayer)
        } else {
            show_typhoon()
        }
    }
}

function observedRainfallWithoutQuery(observe_rainfall)
{
    console.log(observe_rainfall)
    if (observe_rainfall.startTime != '') {
        $('#observedRainfall').css('display','block');
        $('#observedRainfallStartTime').text(observe_rainfall.startTime)
        $('#observedRainfallEndTime').text(observe_rainfall.endTime)

        observedRainfallImage = observe_rainfall.imageUrl
    } else {
        $('#observedRainfall').css('display','none');
    }
}

/**
 * 累计观测雨量
 * @param typhoonName
 */
function observedRainfall(path) {
    var typhoonName = path[0]['title']

    if (path.length != 1 || !typhoonName) {
        $('#observedRainfall').css('display','none');
        return
    }

    var res = $.ajax({ type: "GET",
        url:"index.php/typhoon/getObservedRainfall",
        data:"typhoonName="+typhoonName,
        async:false
    }).responseText;
    var res = eval('(' + res + ')');    // 将json字符串转换成json对象

    observedRainfallWithoutQuery(res)
}

/**
 * 绘制累计观测降雨量
 */
function drawObservedRainfall() {
    var isChecked = document.getElementById('observedRainfallCheck').checked
    if (isChecked) {

        var arr = [12, 24, 48, 72]
        for (var i in arr) {
            document.getElementById("rainfall_" + arr[i]).checked = false
        }

        var imageLayer = new AMap.ImageLayer({
            url: observedRainfallImage,
            bounds: new AMap.Bounds([68.3, -13],[156.7, 70]),
            // zooms: [4, 18],
            opacity: 0.5,
        });

        showTyphoonWithImageLayer(imageLayer)
    } else {
        show_typhoon()
    }
}