//search模块的小仓库
import { reqGetSearchInfo } from "@/api";
//state:仓库存储数据的地方
const state = {
  searchList: {},
};
//mutations:修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步，这里可以书写业务逻辑但不能修改state
const actions = {
  async getSearchList({ commit }, params = {}) {
    try {
      //至少传递一个对象,params是派发action的时候的第二个参数，至少是个空对象
      const result = await reqGetSearchInfo(params);
      //console.log(result);
      if (result.code === 200) {
        commit("GETSEARCHLIST", result.data);
      }
    } catch (error) {
      console.error("请求失败", error);
    }
  },
};
//getters:可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  //当前形参state，是当前仓库中的状态
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};
//对外暴露小仓库的一个实例
export default {
  state,
  mutations,
  actions,
  getters,
};
