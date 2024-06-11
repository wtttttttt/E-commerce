//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
//使用插件
Vue.use(VueRouter);

//保存原来的push方法
let originPush = VueRouter.prototype.push;
//重写push
//第一个参数：往哪里跳，第二个参数：成功的回调，第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call和apply:
    //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点：call方法传参用逗号，apply用数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
export default new VueRouter({
  routes, //key-value相等的简写
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }; //y=0代表滚动条在最上方
  },
});
