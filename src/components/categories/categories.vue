<template>
    <el-card>
        <!-- 面包屑 -->
        <mybread one="商品管理" two="商品分类" />
        <!-- 按钮 -->
        <el-button type="success" @click="openadd" plain>新增分类</el-button>
        <!-- 表格 -->
        <el-table v-loading="loading" :data="pageCateList" style="width: 100%">
            <el-table-tree-column file-icon="icon icon-file" folder-icon="icon icon-folder" treeKey="cat_id" parentKey="cat_pid" levelKey="cat_level" prop="cat_name" label="分类名称" width="180">
            </el-table-tree-column>
            <el-table-column label="级别" width="180">
                <template slot-scope="scope">
                    {{ scope.row.cat_level === 0 ? '一级': scope.row.cat_level === 1 ? '二级': '三级' }}
                </template>
            </el-table-column>
            <el-table-column label="是否有效">
                <template slot-scope="scope">
                    {{ scope.row.cat_deleted ? '无效': '有效' }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="sizeChange" @current-change="curChange" :current-page="pagenum" :page-size="pagesize" :page-sizes="pagesizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- 新增面板 -->
        <el-dialog title="新增分类" :visible.sync="adddialog">
            <el-form>
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择分类" :label-width="formLabelWidth">
                    {{ jlvalue }}
                    <el-cascader v-model="jlvalue" :options="jlData" :props="propsObj"></el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adddialog = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
import mybread from '../layout/breadnav.vue'

export default {
    data() {
        return {
            // 数据源
            cateList: [],
            // 当前页
            pagenum: 2,
            // 页容量
            pagesize: 5,
            // 分页的数据源
            pageCateList: [],
            // 总条数
            total: 0,
            // 页容量集合
            pagesizes: [5, 10, 15],
            // 加载动画
            loading: true,
            // 控制新增圣诞框
            adddialog: false,
            // 设置表头的宽度
            formLabelWidth: '80px',
            // 级联的数据源
            jlData: [],
            // 级联框双向绑定的数据
            jlvalue: [],
            // 级联框的配置项
            propsObj: {
                expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id'
            }
        }
    },
    components: {
        mybread: mybread
    },
    methods: {
        // 得到所有的分类数据
        getCateList() {
            this.$http({
                url: 'categories'
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status === 200) {
                    // 将数据源保存起来
                    this.cateList = data
                    // 得到总条数
                    this.total = data.length
                    // 获取分页数据
                    this.getPageCateList()
                    // 关闭loading
                    setTimeout(() => {
                        this.loading = false
                    }, 1000)
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 从数据源中截取当前页的数据
        getPageCateList() {
            // 定义开始下载
            let begin = this.pagesize * (this.pagenum - 1)
            let end = this.pagesize * this.pagenum
            // 截取 slice
            this.pageCateList = this.cateList.slice(begin, end)
        },
        // 当前页改变时执行
        curChange(currentnum) {
            // 给当前页赋值
            this.pagenum = currentnum
            // 重新获取
            this.getPageCateList()
        },
        // 当页容量改变时改变
        sizeChange(pagesize) {
            this.pagesize = pagesize
            this.getPageCateList()
        },
        // 得到级联框中的数据
        getJLData() {
            this.$http({
                url: 'categories?type=2'
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status === 200) {
                    this.jlData = data
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 打开面板
        openadd() {
            // 打开面板
            this.adddialog = true
            this.getJLData()
        }
    },
    mounted() {
        this.getCateList()
    }
}
</script>

<style>

</style>
