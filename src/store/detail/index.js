import { reqGoodsInfo } from "@/api";

import { getPositioningCSS } from "nprogress";
import { reqAddOrUpdateShopCart } from "@/api";
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
        //console.log(result.data);
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
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    //此处服务器没有返回数据,因此不用存储
  }
};

const getters = {
  //路径导航简化--面包屑
  categoryView(state) {
    //防止页面加载时服务器还没返回数据
    return state.goodInfo.categoryView || {};
  },
  //产品信息数据简化
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  //产品售卖属性数据简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
