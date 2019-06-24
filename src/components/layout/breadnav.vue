<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ one }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ two }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props: ['one', 'two']
}
</script>

<style>

</style>
