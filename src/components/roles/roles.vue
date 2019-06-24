<template>
    <el-card>
        <!-- 面包屑导航 -->
        <breadn one="权限管理" two="角色列表" />
        <!-- 添加按钮 -->
        <el-button class="mybtn" plain>新增角色</el-button>
        <!-- 表格 -->
        <el-table :border="true" :data="rolesList" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                    <!-- 遍历一级权限 -->
                    <el-row v-for="(item1, index1) in scope.row.children" :key="index1">
                        <el-col :span="4">
                            <!-- 一级权限 -->
                            <el-tag @close="delRight(scope.row.id, item1.id, scope.row)" class="tag1" closable> {{ item1.authName }} {{ item1.id }} </el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col :span="20">
                            <!-- 遍历二级权限 -->
                            <el-row v-for="(item2, index2) in item1.children" :key="index2">
                                <el-col :span="5">
                                    <!-- 二级权限 -->
                                    <el-tag @close="delRight(scope.row.id, item2.id, scope.row)" class="tag2" closable type="success">{{ item2.authName }} {{ item2.id }} </el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="19">
                                    <!-- 三级权限 -->
                                    <el-tag @close="delRight(scope.row.id, item3.id, scope.row)" class="tag3" v-for="(item3, index3) in item2.children" :key="index3" closable type="danger">{{ item3.authName }} {{ item3.id }} </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="180">
            </el-table-column>
            <el-table-column prop="roleDesc" label="角色描述" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                    <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import breadn from '../layout/breadnav.vue'

export default {
    data() {
        return {
            rolesList: []
        }
    },
    components: {
        breadn: breadn
    },
    methods: {
        // 得到所有的角色数据
        getRoleList() {
            this.$http({
                method: 'GET',
                url: 'roles'
            }).then(res => {
                let { data, meta } = res.data
                if (meta.status === 200) {
                    this.rolesList = data
                } else {
                    this.$message.error(meta.msg)
                }
            })
        },
        // 删除权限
        delRight(roleid, rightid, scoperow) {
            // console.log(roleid, rightid)
            this.$http({
                method: 'DELETE',
                url: `roles/${roleid}/rights/${rightid}`
            }).then(res => {
                let { data, meta } = res.data
                if (meta.status === 200) {
                    this.$message({
                        message: meta.msg,
                        type: 'success'
                    })
                    // 将新的权限设置给当前行的数据源
                    scoperow.children = data
                } else {
                    this.$message.error(meta.msg)
                }
            })
        }
    },
    mounted() {
        this.getRoleList()
    }
}
</script>

<style scoped>
.mybtn {
    margin-top: 20px;
}

.tag1,
.tag2,
.tag3 {
    margin-top: 10px;
}

.tag3 {
    margin-right: 10px;
}
</style>
