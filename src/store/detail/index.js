import { reqGoodsInfo } from "@/api";

import { getPositioningCSS } from "nprogress";
const state = {
  goodInfo: {},
};
const mutations = {
  GETGOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  async getGoodsInfo({ commit }, skuId) {
    try {
      let result = await reqGoodsInfo(skuId);
      if (result.code == 200) {
        console.log(result);
        commit("GETGOODSINFO", result.data);
      } else {
        console.error("API response error:", result);
        throw new Error("API response error");
      }
    } catch (error) {
      console.error("Failed to get goods info:", error);
      throw error;
    }
  },
};

const getters = {
  categoryView(state) {
    //防止页面加载时服务器还没返回数据
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
