//登录和注册模块的小仓库
import { reqGetCode } from "@/api";
import { reqUserRegister } from "@/api";
import { reqUserLogin } from "@/api";
import { reqUserInfo } from "@/api";
//state:仓库存储数据的地方
const state = {
  phone: "",
  code: "",
  token: "",
  userInfo: {},
};
//mutations:修改state的唯一手段
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
};
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步，这里可以书写业务逻辑但不能修改state
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == "200") {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
    //console.log(result);
  },
  //用户注册
  async userRegister({ commit }, data) {
    let result = await reqUserRegister(data);
    //console.log(result);
    if (result.code == "200") {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //用户登录
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user);
    if (result.code == "200") {
      console.log("token:", result.data.token);
      commit("USERLOGIN", result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    console.log(result);
    if (result.code == "200") {
      commit("GETUSERINFO", result.data);
      return "ok";
    }
  },
};
//getters:可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};
//对外暴露小仓库的一个实例
export default {
  state,
  mutations,
  actions,
  getters,
};
