<template>
    <el-card>
        <!-- 面包屑导航 -->
        <bread one="商品管理" two="商品列表" />
        <!-- 提示框 -->
        <el-alert class="myalert" title="消息提示的文案" type="info" center show-icon>
        </el-alert>
        <!-- 步骤条 -->
        <!-- active：已经完成的步骤 -->
        <!-- align-center：居中 -->
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
        <!-- tabs 选项 -->
        <!-- v-model: 设置默认选中的 tab  -->
        <!-- tab-click: tab的点击事件 -->
        <el-tabs @tab-click="handleClick" v-model="activenave" tab-position="left">
            <!-- label：tab选项的标题 -->
            <!-- name：名字，（可以用来设置默认选中的 tab） -->
            <el-tab-pane label="基本信息" name="first">
                <el-form label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品名称">
                        <el-input v-model="addObj.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="addObj.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量">
                        <el-input v-model="addObj.goods_weight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量">
                        <el-input v-model="addObj.goods_number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        {{ cateCas }}
                        <el-cascader v-model="cateCas" :options="cateList" :props="propsObj"></el-cascader>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="second">
                <div v-for="(item, index) in goodsMany" :key="index">
                    <div class="mybox">{{ item.attr_name }}</div>
                    <div>
                        <el-checkbox v-for="(item1,index1) in item.attr_vals.split(',')" :key="index1" border v-model="checked">
                            {{ item1 }}
                        </el-checkbox>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="third">
                <el-form label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item v-for="(item,index) in goodsOnly" :key="index" :label="item.attr_name">
                        <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="fourth">
                <!-- action：图片上传的路径 -->
                <!-- list-type 上传项的样式 -->
                <!-- headers: 设置图片上传的请求头 -->
                <!-- on-success： 成功后执行的钩子函数 -->
                <!-- on-remove: 移除图片后执行的钩子函数 -->
                <!-- on-preview: 点击已经上传列表中的文件执行的钩子函数：  -->
                <el-upload :on-preview="imgPreview" :on-remove="imgRemove" class="upload-demo" action="http://localhost:8888/api/private/v1/upload" :headers="uploHeader" :on-success="imgSuccess" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                {{ fileList }}
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="fivth">
                <el-button @click="addGoods" type="primary">新增商品</el-button>
                <!-- 富文本编辑框 -->
                <quill-editor v-model="addObj.goods_introduce" ref="myQuillEditor">
                </quill-editor>
            </el-tab-pane>
        </el-tabs>
        <!-- 图片预览面板 -->
        <el-dialog title="图片预览" :visible.sync="imgDialog">
            <img ref="myimg" style="width: 100%;height: 100%" />
            <div slot="footer" class="dialog-footer">
                <el-button @click="imgDialog = false">取 消</el-button>
                <el-button type="primary" @click="imgDialog = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
import bread from '../layout/breadnav.vue'

export default {
    data() {
        return {
            // 步骤条的步骤
            active: 0,
            // 设置默认选中的 tab 的名称
            activenave: 'first',
            // 级联框中双向绑定的数据
            cateCas: [],
            // 级联框的数据源
            cateList: [],
            // 级联框的配置项
            propsObj: {
                expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id'
            },
            // 多选框的状态
            checked: true,
            // 商品参数
            goodsMany: [],
            // 商品属性：
            goodsOnly: [],
            // 上传的请求头
            uploHeader: {
                Authorization: window.localStorage.getItem('token')
            },
            // 保存所有上传图片的信息
            fileList: [],
            // 控制图片预览面板的显示和隐藏
            imgDialog: false,
            // 新增商品的对象
            addObj: {
                goods_name: '',
                goods_cat: '',
                goods_price: '',
                goods_number: '',
                goods_weight: '',
                goods_introduce: '我是默认值'
            }
        }
    },
    components: {
        bread
    },
    methods: {
        handleClick(event) {
            // 每个 tab 点击都会触发
            // 事件源对象
            // 设置步骤条的进度
            this.active = +event.index
            // 判断是否点击的是商品分类
            if (event.index === '1') {
                this.getCateParams('many')
            }
            if (event.index === '2') {
                this.getCateParams('only')
            }
        },
        // 获取所有的分类数据
        getCateList() {
            this.$http({
                url: 'categories'
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status === 200) {
                    // 得到了分类数据
                    this.cateList = data
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 将请求分类参数的接口封装为一个方法
        getCateParams(sel) {
            // 判断分类是否被选中：判断 cateCas 长度是否为 0
            if (this.cateCas.length !== 0) {
                // 发送请求到服务器
                this.$http({
                    url: `categories/${this.cateCas[this.cateCas.length - 1]}/attributes?sel=${sel}`
                }).then(res => {
                    let { meta, data } = res.data
                    if (meta.status === 200) {
                        // 数保存起来
                        if (sel === 'many') {
                            this.goodsMany = data
                        } else {
                            this.goodsOnly = data
                        }
                    } else {
                        this.$message.error(meta.msg)
                    }
                })
            } else {
                this.$message.error('请选择分类')
            }
        },
        // 图片上传成功后执行的函数
        imgSuccess(response, file, fileLsit) {
            // response: 响应回来的数据
            //  tmp_path  图片保存的路径
            //  url: 图片的在线地址
            // file 上传图片的信息
            // fileLsit 上传的所有图片的信息
            this.fileList.push(response.data.tmp_path)
        },
        // 图片移除时执行的函数
        imgRemove(file, fileList) {
            // 得到移除的图片数据
            var img = file.response.data.tmp_path
            // 从数组中将图片移除
            this.fileList.forEach((item, index) => {
                if (item === img) {
                    // 移除这个元素
                    this.fileList.splice(index, 1)
                }
            })
        },
        // 点击上传图片时执行  
        imgPreview(file) {
            // 打开面板
            this.imgDialog = true
            // 由于下面的代码先执行，后面的渲染才会执行
            // setTimeout(() => {
            //     // 渲染图片
            //     var img = file.response.data.url
            //     // 动态渲染
            //     this.$refs.myimg.src = img
            // }, 200)
            // this.$nextTick: 会将代码延迟到下次 dom 更新之后执行
            this.$nextTick(() => {
                var img = file.response.data.url
                this.$refs.myimg.src = img
            })
        },
        // 新增商品
        addGoods() {
            // 设置分类
            this.addObj.goods_cat = this.cateCas.join(',')
            // 获取新增的数据
            this.$http({
                url: 'goods',
                method: 'post',
                data: this.addObj
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status === 201) {
                    this.$message.success(meta.msg)
                    // 跳转回商品页面
                    this.$router.push('/goods')
                } else {
                    this.$message.error(meta.msg)
                }
            })
        }
    },
    mounted() {
        this.getCateList()
    }
}
</script>

<style>
.myalert {
    margin: 20px 0px;
}

.el-step__title {
    font-size: 12px;
}

label.el-checkbox.is-bordered.is-checked {
    margin-right: 0px;
}

.mybox {
    margin: 20px 0px;
}

.ql-editor {
    height: 400px;
}
</style>
