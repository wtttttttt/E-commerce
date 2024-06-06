import Vue from "vue";
import App from "./App.vue";

//三级联动组件注册为全局组件
//第一个参数：全局组件的名字，第二个参数：哪个组件
import TypeNav from "@/components/TypeNav";
Vue.component(TypeNav.name, TypeNav);
//轮播图注册为全剧组件
import Carousel from "@/components/Carousel";
Vue.component(Carousel.name, Carousel);
//引入路由
import router from "@/router";
//引入Vuex仓库
import store from "@/store";
//引入mockServe.js
import "@/mock/mockServe";
//引入swiper
import "swiper/css/swiper.css";
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  //注册路由信息，使组件身上有$route属性
  router,
  //注册仓库,使每个组件身上都有$store
  store,
}).$mount("#app");
