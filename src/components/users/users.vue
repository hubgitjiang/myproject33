<template>
    <!-- 静态页面 -->
    <el-card>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-s-promotion">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <el-row class="myrow">
            <el-col :span="6">
                {{ query }}
                <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
                    <el-button slot="append" @click.prevent="search" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="success" plain>添加用户</el-button>
            </el-col>
        </el-row>
        <!-- 表格区域 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="username" label="姓名">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column label="用户状态">
                <!-- 指定数据源：slot-scope -->
                <template slot-scope="scope">
                    <!-- scope.row:当前行的数据源 -->
                    {{ scope.row }}
                    <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                    <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <!-- current-page: 当前页 page-sizes：页容量的选项集合 page-size:页容量-->
        <!-- layout: 当前分页组件要显示的结构 -->
         <el-pagination
            @current-change="curChange"
            @size-change="sizeChange"
            :current-page="pagenum"
            :page-sizes="pagesizes"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            // 数据源
            tableData: [],
            // 查询的数据
            query: '',
            // 当前页
            pagenum: 1,
            // 页容器
            pagesize: 5,
            // 页容量的选项集合
            pagesizes: [5, 10, 15],
            // 数据的总条数
            total: 0
        }
    },
    methods: {
        // 获取数据源的方法
        getDataList() {
            // 通过 axios
            this.$http({
                method: 'GET',
                url: `http://localhost:8888/api/private/v1/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
                headers: {
                    Authorization: window.localStorage.getItem('token')
                }
            }).then(res => {
                // 解构
                let { data, meta } = res.data
                // 判断
                if (meta.status === 200) {
                    // 将保存数据到 tableDate中
                    this.tableData = data.users
                    // 得到总条数
                    this.total = data.total
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 当分页组件的当前页改变时触发
        curChange(currentPage) {
            // 将 currentPage 赋值给 pagenum:
            this.pagenum = currentPage
            // 重新请求数据
            this.getDataList()
        },
        // 当页容量发生改变时触发
        sizeChange(pagesize) {
            // 将 pagesize 赋值给 this.pagesize
            this.pagesize = pagesize
            // 重新请求
            this.getDataList()
        },
        // 搜索相关数据
        search() {
            this.pagenum = 1
            this.getDataList()
        }
    },
    mounted() {
        this.getDataList()
    }
}
</script>


<style scoped>
/* scoped: 当前样式只作用在当前组件中 */

.myrow {
    margin-top: 20px;
}
</style>
