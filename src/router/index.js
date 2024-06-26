//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

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
//对外暴露VueRouter的实例
let router = new VueRouter({
  routes, //key-value相等的简写
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }; //y=0代表滚动条在最上方
  },
});
//全局守卫：路由跳转之前进行判断
router.beforeEach(async (to, from, next) => {
  //to:跳转到哪
  //from:从哪跳
  //next:直接放行
  //console.log(from, to);
  //第一种写法next() 直接放行
  //第二种写法next(path) 放行到指定路径
  console.log(store.state.user.token);
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    console.log("token1111111111:", token);
    //用户已经登录了还想去登录页，直接在首页
    if (to.path == "/login") {
      next();
      console.log(1111111);
    } else {
      //登录了,但不去登录，要判断是否有用户信息，如果没有要派发action获取用户信息
      if (name) {
        next();
        console.log(222222);
      } else {
        //没有用户信息，先获取用户信息
        try {
          //获取用户信息成功
          await store.dispatch("getUserInfo");
          console.log("@@@@@@@@@@", store.state.user.userInfo.name);
          next();
          console.log(333333);
        } catch (error) {
          //token过期，获取不到用户信息
          //清除token
          await store.dispatch("userLogout");
          next("/login");
          console.log(444444);
        }
      }
    }
  } else {
    //未登录
    next();
    console.log(555555);
  }
});
export default router;
