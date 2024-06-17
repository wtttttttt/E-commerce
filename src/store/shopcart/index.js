//shopcart模块的小仓库
import { reqCarList } from "@/api";
import { reqdeleteCartById } from "@/api";
import { reqUpdateCheckedById } from "@/api";
//state:仓库存储数据的地方
const state = {
  cartList: [],
};
//mutations:修改state的唯一手段
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步，这里可以书写业务逻辑但不能修改state
const actions = {
  //获取购物车列表
  async getCartList({ commit }) {
    let result = await reqCarList();
    if (result.code == "200") {
      commit("GETCARTLIST", result.data);
    }
    console.log(result);
  },
  //删除某个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqdeleteCartById(skuId);
    if (result.code == "200") {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //修改购物车中某个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == "200") {
      //服务器没有返回数据不用收数据
      return "ok";
    }
  },
  //删除全部选中的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    //在此处多次调用deleteCartListBySkuId
    getters.cartList.cartInfoList.forEach((item) => {
      let promiseAll = [];
      let promise =
        item.isChecked == 1
          ? dispatch("deleteCartListBySkuId", item.skuId)
          : " ";
      promiseAll.push(promise);
    });
    //只要promiseAll中的每个都成功，即返回成功
    return Promise.all(promiseAll);
  },
  //修改全部产品状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    console.log(state);
    console.log(isChecked);
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      }); //返回promise
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
//getters:可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
  //购物车商品数据
  cartInfoList(state) {
    return state.cartList.cartInfoList;
  },
};
//对外暴露小仓库的一个实例
export default {
  state,
  mutations,
  actions,
  getters,
};
