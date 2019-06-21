<template>
    <el-row class="myrow">
        <el-col :span="4">
            <img src="../../assets/imgs/logo.png" alt="">
        </el-col>
        <el-col :span="16">
            <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="4">
            <a href="#" @click.prevent="logout">退出</a>
        </el-col>
    </el-row>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$confirm('您确定要退出吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 清除 token
                window.localStorage.removeItem('token')
                // 跳转到登录页面
                // this.$router.push('/login') // 以 path 属性为基准进行跳转
                this.$router.push({ name: 'login' }) // 以 name 属性为基准进行跳转
                // 提示退出成功
                this.$message({
                    message: '退出成功',
                    type: 'success'
                })
            })
        }
    }
}
</script>
<style>

</style>
