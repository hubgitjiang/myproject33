import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import UseElement from '../components/useElement/useElement.vue'
import Login from '../components/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/useElement', name: 'useElement', component: UseElement }, // 使用 element 的路由
    { path: '/login', name: 'login', component: Login } // 登录的路由
  ]
})

// // 创建路由选项
// let routes = [
//   { path: '/', name: 'HelloWorld', component: HelloWorld }
// ]
// // 创建路由对象
// let router = new Router({
//   routes: routes
// })
// // 暴露出去
// export default router
