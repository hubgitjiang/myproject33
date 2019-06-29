<template>
    <div id="mybox" style="width: 100%;height: 500px">

    </div>
</template>

<script>
// 导入
import BMap from 'BMap'

export default {
    // 初始化百度地图
    mounted() {
        // 创建一个地图实例
        var map = new BMap.Map("mybox")
        // 创建一个中心点坐标（经纬度：天安门）
        var point = new BMap.Point(116.404, 39.915)
        // 地图的初始化
        map.centerAndZoom(point, 15)
    }
}
</script>

<style>

</style>
