<template>
  <div class="login">
    <div class="mybox">
      <!-- el-form: 表单元素 model: 绑定的数据源 label-width：文本的宽度   -->
      <el-form :rules="rules" label-position="top" :model="useObj" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- form-item：表单元素的项 label: 显示的表头 -->
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="useObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="useObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="mylogin" type="primary" @click.prevent="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录数据
      useObj: {
        username: '',
        password: ''
      },
      // 验证规则：
      rules: {
        username: [
          // 必填           不合法的提示信息            触发验证的条件
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录：提交数据
    login() {
      // 先判断参数是否合法
      // validate:验证 form 中的元素是否合法，如果合法返回 true，否则 false
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http({
            method: 'POST',
            url: 'login',
            data: this.useObj
          }).then(res => {
            // 解构F
            let { data, meta } = res.data
            // 判断
            // 成功
            if (meta.status === 200) {
              // 将 token 进行保存
              window.localStorage.setItem('token', data.token)
              // 登录成功后需要跳转到首页
              this.$router.push('/')
              this.$message({
                message: meta.msg,
                type: 'success'
              })
            } else { // 失败
              this.$message.error(meta.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('不合法')
        }
      })
    }
  }
}
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background-color: #324152;
  position: relative;
}

.mybox {
  width: 580px;
  height: 440px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  box-sizing: border-box;
}

.mylogin {
  width: 100%;
}
</style>
