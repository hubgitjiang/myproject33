import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import UseElement from '../components/useElement/useElement.vue'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '@/components/users/users'
import Rights from '@/components/rights/rights'
import Roles from '@/components/roles/roles'

Vue.use(Router)

// 创建一个路由对象
let router = new Router({
  routes: [
    // 重定向：
    { path: '/', redirect: '/home' },
    { path: '/useElement', name: 'useElement', component: UseElement }, // 使用 element 的路由
    { path: '/login', name: 'login', component: Login }, // 登录的路由
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [ // children 给 home 添加子路由
        { path: '/users', name: 'users', component: Users },
        { path: '/rights', name: 'rights', component: Rights },
        { path: '/roles', name: 'roles', component: Roles },
      ]
    }
  ]
})

// 添加一个路由守卫中的全局前置守卫
router.beforeEach(function (to, from, next) {
  // to: 目标路由(路由对象)
  // from: 请求发起的路由
  // next: 后续是否执行
  // 验证是否登录：原理判断是否存在  token
  // 判断目标路径是否是 login ，如果是否 Login 直接向后执行
  if (to.name !== 'login') {
    // 获取 token
    let token = window.localStorage.getItem('token')
    // 判断是否存在 
    if (!token) {
      // 跳转到登录页面
      router.push('/login') // 以前的 this 指的是 vue 的实例对象（vue, 组件）
    } else {
      // 如果存在 token 就继续执行
      next()
    }
  } else {
    next()
  }
})

export default router