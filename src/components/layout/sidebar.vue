<template>
    <!-- el-menu：菜单栏的根组件 router: 设置路由可以跳转 -->
    <el-menu :router="true" :unique-opened="true" class="mymenu el-menu-vertical-demo">
        <!-- submenu：菜单栏中的一项 index: 它的标识（唯一）-->
        <el-submenu v-for="(item, index) in menusList" :key="index" :index="item.path">
            <!-- 这一项的图标&文字信息 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span> {{ item.authName }} </span>
            </template>
            <!-- 最后一级子元素 -->
            <el-menu-item v-for="(item1, index1) in item.children" :key="index1" :index="'/' + item1.path">
                <i class="el-icon-s-grid"></i>
                <span> {{ item1.authName }} </span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            menusList: []
        }
    },
    methods: {
        // 动态获取左侧菜单栏的数据
        getleftMenus() {
            this.$http({
                url: 'menus'
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status === 200) {
                    // 赋值
                    this.menusList = data
                } else {
                    this.$message.error(meta.msg)
                }
            })
        }
    },
    mounted() {
        this.getleftMenus()
    }
}
</script>

<style>

</style>
