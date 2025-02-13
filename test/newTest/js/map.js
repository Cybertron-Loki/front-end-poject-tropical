  window._AMapSecurityConfig = {
            securityJsCode: "8d3bcbec1dc64ae4112574db430a817e",
        };

        AMapLoader.load({
            key: "20b80fc86aa8476aaeea04919627d666", //申请好的Web端开发者 Key，调用 load 时必填
            version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        }).then((AMap) => {
            const map = new AMap.Map("whole-bg", {
                mapStyle: "amap://styles/normal", //设置地图的显示样式
                // zooms: [5,15],
                zoom: 4,
                center: [114.161064, 22.280869],
                dragEnable: false,
                padding: [0, 0, 0, 0],
                dragEnable: false, // 禁用拖拽
            });

            //异步加载控件
            AMap.plugin('AMap.ToolBar', function () {
                var toolbar = new AMap.ToolBar({ left: 5, bottom: 600, }); //缩放工具条实例化
                map.addControl(toolbar); //添加控件
            });
            AMap.plugin('AMap.Scale', function () {
                var scale = new AMap.Scale({ left: 15, bottom: 60, }); //缩放工具条实例化
                map.addControl(scale); //添加控件
            });

            // let polyline = new AMap.Polyline({
            //     strokeColor: "red",
            //     strokeWeight: 3,
            //     strokeOpacity: 0.8,
            //     zIndex: 10000000,
            // });
            // polyline.setMap(map);

            // let path = [];

            // // 监听鼠标点击事件
            // map.on('click', function (e) {
            //     console.log('Clicked at:', e.lnglat); // 确认点击事件是否触发
            //     path.push([e.lnglat.lng, e.lnglat.lat]);
            //     polyline.setPath(path);
            // });

            // // 监听鼠标双击事件结束绘制
            // map.on('dblclick', function () {
            //     if (path.length > 0) {
            //         console.log(path); 
            //         const bounds = polyline.getBounds();
            //         const southwest = bounds.getSouthWest();
            //         const northeast = bounds.getNorthEast();

            //         console.log('经纬度范围:', {
            //             southwest: { lng: southwest.lng, lat: southwest.lat },
            //             northeast: { lng: northeast.lng, lat: northeast.lat }
            //         });

            //         // 清空路径
            //         path = [];
            //         polyline.setPath([]);
            //     }
            // });
            // 香港画个圈
            var circleMarker_four = new AMap.Circle({
                center: new AMap.LngLat(114.161244, 22.278540),  // 圆心位置
                radius: 400000, // 圆半径
                fillOpacity: 0,
                strokeStyle: 'dashed',
                strokeWeight: 1,
                strokeColor: 'black',
                strokeOpacity: '0.4',
            });

            var circleMarker_eight = new AMap.Circle({
                center: new AMap.LngLat(114.161244, 22.278540),  // 圆心位置
                radius: 800000, // 圆半径
                fillOpacity: 0,
                strokeStyle: 'dashed',
                strokeWeight: 1,
                strokeColor: 'black',
                strokeOpacity: '0.4',
            });

            map.add(circleMarker_four);
            map.add(circleMarker_eight);
            const marker = new AMap.Marker({
                position: [114.028422, 22.280869], //位置
                //   offset: new AMap.Pixel(-5, 10), // 使用 AMap.Pixel 指定偏移量
            });
           
            // 设置限制区域
            const bounds = new AMap.Bounds([90, 5], [140, 60]);
            map.setLimitBounds(bounds);


        }).catch((e) => {
            console.error(e);
        });