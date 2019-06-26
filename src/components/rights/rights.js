// 导入面包屑组件
import bread from '../layout/breadnav.vue'

export default {
  data () {
    return {
      rightsList: []
    }
  },
  // 注册子组件
  components: {
    bread: bread
  },
  methods: {
    getRightList () {
      // 请求所有的权限数据
      this.$http({
        method: 'GET',
        url: 'rights/list'
      }).then(res => {
        // 解构
        let { data, meta } = res.data
        // 判断
        if (meta.status === 200) {
          // 赋值
          this.rightsList = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getRightList()
  }
}
