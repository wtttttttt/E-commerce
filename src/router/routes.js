//引入一级路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";

//配置路由信息
export default [
  {
    path: "/home",
    component: Home,
    meta: {
      show: true,
    },
  },
  {
    path: "/search/:keyword?",
    component: Search,
    name: "search",
    meta: {
      show: true,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      show: false,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      show: false,
    },
  },
  {
    path: "/detail/:skuId",
    component: Detail,
    meta: {
      show: true,
    },
  },
  {
    path: "/addCartSuccess",
    name: "addCartSuccess",
    component: AddCartSuccess,
    meta: {
      show: true,
    },
  },
  {
    path: "/shopCart",
    name: "shopCart",
    component: ShopCart,
    meta: {
      show: true,
    },
  },
  {
    path: "/trade",
    name: "trade",
    component: Trade,
    meta: {
      show: true,
    },
  },
  {
    path: "/pay",
    name: "pay",
    component: Pay,
    meta: {
      show: true,
    },
  },
  //重定向：在项目跑起来的时候，访问/立马跳转到首页
  {
    path: "*",
    redirect: "/home",
  },
];
