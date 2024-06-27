import Vue from "vue";
import App from "./App.vue";

//三级联动组件注册为全局组件
//第一个参数：全局组件的名字，第二个参数：哪个组件
import TypeNav from "@/components/TypeNav";
Vue.component(TypeNav.name, TypeNav);
//轮播图注册为全剧组件
import Carousel from "@/components/Carousel";
Vue.component(Carousel.name, Carousel);
//分页器注册为全局组件
import Pagination from "@/components/Pagination";
Vue.component(Pagination.name, Pagination);
//引入路由
import router from "@/router";
//引入Vuex仓库
import store from "@/store";
//引入mockServe.js
import "@/mock/mockServe";
//引入swiper
import "swiper/css/swiper.css";
//引入api中的全部接口
import * as API from "@/api";
//引入element-ui
import { Button, MessageBox } from "element-ui";
//element-ui Button注册全局组件
Vue.component(Button.name, Button);
//element-ui注册全局组件另一种写法挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API; //组件内使用API无需引入可以直接使用
  },
  //注册路由信息，使组件身上有$route属性
  router,
  //注册仓库,使每个组件身上都有$store
  store,
}).$mount("#app");
