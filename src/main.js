import Vue from 'vue'
import App from './App.vue'


//三级联动组件注册为全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字，第二个参数：哪个组件
Vue.component(TypeNav.name,TypeNav)
//引入路由
import router from '@/router'
//引入Vuex仓库
import store from '@/store'


new Vue({
  render: h => h(App),
  //注册路由信息，使组件身上有$route属性
  router,
  //注册仓库,使每个组件身上都有$store
  store
}).$mount('#app')
