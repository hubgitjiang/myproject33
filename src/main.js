// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
// @ 表示的是 src 目录
import '@/assets/css/index.css'

Vue.config.productionTip = false

// 给 axios 设计统一的请求地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 给 aioxs 设置统一的请求头
// 这里不 token 不能设置一次就不变了，应该每次请求都重新获取
// axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')
// 有一个 bug ，由于以上设置在 axios 被初始化时只会执行一次，所以 token 一旦，不会改变

// 添加一个axios 的请求拦截器
axios.interceptors.request.use(function (config) {
  console.log(config.url)
  // 当请求的路径不是 login 才需要添加请求头
  if (config.url !== 'login') {
    // 设置统一请求头
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  return config
})

// 挂载到 vue 原型中
Vue.prototype.$http = axios

// 使用 element
Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
  // render: h => h(App`)
})
