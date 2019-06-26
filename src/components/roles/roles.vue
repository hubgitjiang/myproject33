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
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button @click="openadd(scope.row.children, scope.row.id)" type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="roleDialog">
      <!-- 树形控件 -->
      <!-- data: 数据源 -->
      <!-- props: 当前 tree 的配置项  -->
      <!-- node-key：给当前树状结构设置唯一标签 -->
      <!-- default-checked-keys: 不能单独使用，配置 node-Key 使用 -->
      <!-- default-expand-all: 是否默认展开所有节点 -->
      <el-tree ref="mytree" :default-expand-all="true" :data="rightsList" node-key="id" :props="propsObj" :default-checked-keys="defaultChecked" show-checkbox>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">取 消</el-button>
        <el-button type="primary" @click="setRightfn">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import breadn from '../layout/breadnav.vue'

export default {
  data() {
    return {
      rolesList: [],
      // 控制分配权限面板显示和隐藏
      roleDialog: false,
      // 树形控制的数据源
      rightsList: [],
      // 设置 tree 的配置项
      propsObj: {
        label: 'authName',// 配置显示的文本
        children: 'children'
      },
      // 当前树形控制默认选中的项
      defaultChecked: [],
      // 要修改权限的用户 id
      roleId: 0
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
    },
    // 打开权限面板
    openadd(dataList, roleId) {
      // 保存用户 id
      this.roleId = roleId
      // 清除空所有的已有的默认权限
      this.defaultChecked = []
      // 请求所有的权限数据
      this.$http({
        url: 'rights/tree'
      }).then(res => {
        let { meta, data } = res.data
        if (meta.status === 200) {
          // 将所有的权限保存起来
          this.rightsList = data
          // 设置默认选中的元素
          // 遍历一级权限
          dataList.forEach(item1 => {
            // 遍历二级权限
            item1.children.forEach(item2 => {
              // 遍历三级权限
              item2.children.forEach(item3 => {
                // 得到当前数据行中所有三级权限的 id
                this.defaultChecked.push(item3.id)
              })
            })
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
      this.roleDialog = true
    },
    // 提交权限数据
    setRightfn() {
      // 获取页面上选中元素的 id 集合
      // 获取 树形结构 对象 
      // 得到全选
      let allIds = this.$refs.mytree.getCheckedKeys()
      // 得到半选
      let halfIds = this.$refs.mytree.getHalfCheckedKeys()
      // 接收
      let rids = [...allIds, ...halfIds]
      // console.log(rids.join(','))
      // 在打开分配权限对话框时，将要修改权限的角色对应的 id 保存起来
      this.$http({
        method: 'POST',
        url: `roles/${this.roleId}/rights`,
        data: {
          rids: rids.join(',') // 所有选中的元素的 id 的集合
        }
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          // 更新数据
          this.getRoleList()
        } else {
          this.$message.error(meta.msg)
        }
      })
      // 关闭面板
      this.roleDialog = false
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
