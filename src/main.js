// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import Eltree from 'element-tree-grid'
import 'element-ui/lib/theme-chalk/index.css'
// 引入 myaxios 插件
import myaxios from '@/assets/js/myaxios.js'
// @ 表示的是 src 目录
import '@/assets/css/index.css'

// 导入富文本编辑框

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

Vue.config.productionTip = false

// 使用 element
Vue.use(Element)
// 使用插件
Vue.use(myaxios)

// 注册一个全局组件
Vue.component(Eltree.name, Eltree)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
  // render: h => h(App`)
})
