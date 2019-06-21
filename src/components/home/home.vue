<template>
    <!-- 使用布局容器:Container 完成整体结构 -->
    <el-container>
        <el-header>
            <!-- 封装为组件 -->
            <TopHead />
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!-- 封装为组件 -->
                <Sidebar />
            </el-aside>
            <el-main>
                <!-- 渲染内容的容器 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 引入组件
import TopHead from '@/components/layout/topHead'
import Sidebar from '@/components/layout/sidebar'

export default {
    components: {
        TopHead: TopHead,
        Sidebar: Sidebar
    },
    // mounted: 当 vue 加载完成后执行
    mounted() {
        // 获取 token
        let token = window.localStorage.getItem('token')
        // 判断是否存在 
        if (!token) {
            // 跳转到登录页面
            this.$router.push('/login')
            this.$message.error('您还没有登录，请先登录')
        }
    }
}
</script>

<style>
.el-container {
    height: 100%;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.myrow h2 {
    margin: 0;
    color: #fff;
}

.myrow a {
    text-decoration: none;
    float: right;
    color: red;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
    height: 100%;
}

.mymenu {
    height: 100%;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
}
</style>
