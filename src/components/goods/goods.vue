<template>
    <el-card>
        <!-- 面包屑导航 -->
        <bread one="商品管理" two="商品列表" />
        <!-- 搜索框 -->
        <el-row class="myrow">
            <el-col :span="6">
                {{ query }}
                <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
                    <el-button slot="append" @click.prevent="search" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-button @click="$router.push('/goods/add')" type="success" plain>添加商品</el-button>
            </el-col>
        </el-row>
        <!-- 表格区域 -->
        <el-table border :data="goodsList" style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="400">
            </el-table-column>
            <el-table-column prop="goods_price" label="商品价格">
            </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量">
            </el-table-column>
            <el-table-column prop="goods_number" label="商品数量">
            </el-table-column>
            <el-table-column prop="add_time" label="添加时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="pagesizes" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
// 导入面包屑组件
import bread from '../layout/breadnav.vue'
export default {
    data() {
        return {
            // 数据源
            goodsList: [],
            // 当前页
            pagenum: 1,
            // 页容量
            pagesize: 10,
            // 容量集合
            pagesizes: [10, 20, 30],
            // 总数
            total: 0,
            // 查询的数据
            query: ''
        }
    },
    components: {
        bread: bread
    },
    methods: {
        // 得到分页的商品数据
        getGoodsList() {
            this.$http({
                url: `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status === 200) {
                    // 给商品数据赋值
                    this.goodsList = data.goods
                    // 总数
                    this.total = data.total
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 当前页改变
        handleCurrentChange(pagenum) {
            this.pagenum = pagenum
            // 重新请求数据
            this.getGoodsList()
        },
        // 页容量改变
        handleSizeChange(pagesize) {
            this.pagesize = pagesize
            // 重新请求
            this.getGoodsList()
        },
        // 搜索
        search() {
            // 重新请求
            this.getGoodsList()
        }
    },
    mounted() {
        this.getGoodsList()
    }
}
</script>

<style>

</style>
