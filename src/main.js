// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入 myaxios 插件
import myaxios from '@/assets/js/myaxios.js'
// @ 表示的是 src 目录
import '@/assets/css/index.css'

Vue.config.productionTip = false

// 使用 element
Vue.use(Element)
// 使用插件
Vue.use(myaxios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
  // render: h => h(App`)
})
