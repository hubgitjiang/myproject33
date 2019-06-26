<template>
  <!-- 静态页面 -->
  <el-card>
    <!-- 面包屑导航 -->
    <bread one="用户管理" two="用户列表" />
    <!-- 搜索框 -->
    <el-row class="myrow">
      <el-col :span="6">
        {{ query }}
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" @click.prevent="search" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click="openAdd" type="success" plain>添加用户</el-button>
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
          <el-switch @change="selChange(scope.row.id, scope.row.mg_state)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          {{ scope.row.id }}
          <el-button @click="edit(scope.row.id)" type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button @click="roles(scope.row.id)" type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- current-page: 当前页 page-sizes：页容量的选项集合 page-size:页容量-->
    <!-- layout: 当前分页组件要显示的结构 -->
    <el-pagination @current-change="curChange" @size-change="sizeChange" :current-page="pagenum" :page-sizes="pagesizes" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 新增数据 -->
    <!-- visible.sync： 决定元素的显示和隐藏 -->
    <el-dialog title="新增用户" :visible.sync="addDialog">
      {{ addUser }}
      <el-form :model="addUser">
        <el-form-item label="用户名" :label-width="labelWidth">
          <el-input v-model="addUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="labelWidth">
          <el-input v-model="addUser.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="labelWidth">
          <el-input v-model="addUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="labelWidth">
          <el-input v-model="addUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancle">取 消</el-button>
        <el-button @click="addUserFn" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改数据 -->
    <!-- visible.sync： 决定元素的显示和隐藏 -->
    <el-dialog title="修改用户" :visible.sync="editDialog">
      <el-form :model="editUser">
        {{ editUser }}
        <el-form-item label="用户名" :label-width="labelWidth">
          <el-input :disabled="true" v-model="editUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="labelWidth">
          <el-input v-model="editUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="labelWidth">
          <el-input v-model="editUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog=false">取 消</el-button>
        <el-button @click="editUserFn" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <!-- visible.sync： 决定元素的显示和隐藏 -->
    <el-dialog title="分配角色" :visible.sync="rolesDialog">
      <el-form :model="roleUser">
        <el-form-item label="当前用户" :label-width="labelWidth">
          <el-input :disabled="true" v-model="roleUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择角色" :label-width="labelWidth">
          {{ roleUser.rid }}
          <el-select v-model="roleUser.rid" placeholder="请选择">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option v-for="item in selDataList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesDialog=false">取 消</el-button>
        <el-button @click="roleUserfn" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// 导入面包屑组件
import bread from '../layout/breadnav.vue'

export default {
  data () {
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
      total: 0,
      // 控制新增对话框的显示和隐藏
      addDialog: false,
      editDialog: false,
      rolesDialog: false,
      // 设置表头的宽度
      labelWidth: '100px',
      // 新增的数据对象
      addUser: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑对象
      editUser: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 下拉框中的数据
      selDataList: [],
      // 分配角色对象
      roleUser: {
        id: '',
        username: '',
        rid: ''
      }
    }
  },
  methods: {
    // 获取数据源的方法
    getDataList () {
      // 通过 axios
      this.$http({
        method: 'GET',
        url: `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      }).then(res => {
        // 解构
        let { data, meta } = res.data
        // 判断
        if (meta.status === 200) {
          // 判断一下
          // 如果获取的数据长度等于 0, 需要将当前页减一：
          if (data.users.length === 0 && this.pagenum !== 1) {
            this.pagenum--
            // 重新获取数据
            this.getDataList()
            // 结束后续代码
            return
          }
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
    curChange (currentPage) {
      // 将 currentPage 赋值给 pagenum:
      this.pagenum = currentPage
      // 重新请求数据
      this.getDataList()
    },
    // 当页容量发生改变时触发
    sizeChange (pagesize) {
      // 将 pagesize 赋值给 this.pagesize
      this.pagesize = pagesize
      // 重新请求
      this.getDataList()
    },
    // 搜索相关数据
    search () {
      this.pagenum = 1
      this.getDataList()
    },
    // 打开新增面板
    openAdd () {
      this.addDialog = true
    },
    // 点击新增的取消
    addCancle () {
      this.addDialog = false
      // 清除新增数据
      this.addUser.username = ''
      this.addUser.password = ''
      this.addUser.email = ''
      this.addUser.mobile = ''
    },
    // addUserFn:提交新增的数据
    addUserFn () {
      this.$http({
        method: 'POST',
        url: 'users',
        data: this.addUser
        // token
      }).then(res => {
        // 解构
        let { meta } = res.data
        // 判断
        if (meta.status === 201) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          // 更新数据
          this.getDataList()
        } else {
          this.$message.error(meta.msg)
        }
        // 关闭新增面板
        this.addDialog = false
        // 清除新增数据
        this.addUser.username = ''
        this.addUser.password = ''
        this.addUser.email = ''
        this.addUser.mobile = ''
      })
    },
    // 删除方法
    del (id) {
      // 根据 id 去服务器中删除数据
      this.$http({
        method: 'delete',
        url: `users/${id}`
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          // 更新数据
          this.getDataList()
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 编辑方法：
    edit (id) {
      // 根据 id 得到数据
      this.$http({
        method: 'GET',
        url: `users/${id}`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          // 根据 id 得到数据
          this.editUser.username = data.username
          this.editUser.email = data.email
          this.editUser.mobile = data.mobile
          this.editUser.id = data.id
        }
      })
      // 打开面板
      this.editDialog = true
    },
    // 提交修改数据
    editUserFn () {
      this.$http({
        method: 'PUT',
        url: `users/${this.editUser.id}`,
        data: {
          email: this.editUser.email,
          mobile: this.editUser.mobile
        }
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          // 更新数据
          this.getDataList()
        } else {
          this.$message.error(meta.msg)
        }
      })
      // 关闭面板
      this.editDialog = false
    },
    // 打开角色分配 框
    roles (id) {
      // 动态获取下拉框中的数据
      this.$http({
        method: 'GET',
        url: `roles`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          // 得到下拉框中的数据
          this.selDataList = data
          // 根据 id 查询用户信息
          this.$http({
            method: 'GET',
            url: `users/${id}`,
            headers: {
              Authorization: window.localStorage.getItem('token')
            }
          }).then(res => {
            let { meta, data } = res.data
            if (meta.status === 200) {
              // 给 roleUser 赋值
              this.roleUser.username = data.username
              this.roleUser.id = data.id
              this.roleUser.rid = data.rid
            }
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
      this.rolesDialog = true
    },
    // roleUserfn: 提交用户角色信息
    roleUserfn () {
      this.$http({
        method: 'PUT',
        url: `users/${this.roleUser.id}/role`,
        data: {
          rid: this.roleUser.rid
        }
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
        this.rolesDialog = false
      })
    },
    // 当开关状态改变时触发
    selChange (uid, type) {
      this.$http({
        method: 'put',
        url: `users/${uid}/state/${type}`
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getDataList()
  },
  components: {
    bread: bread
  }
}
</script>

<style scoped>
/* scoped: 当前样式只作用在当前组件中 */

.myrow {
  margin-top: 20px;
}
</style>
