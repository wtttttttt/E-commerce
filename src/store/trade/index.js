//trade模块的小仓库
import { reqAddressInfo } from "@/api"
import { reqOrderInfo } from "@/api"

//state:仓库存储数据的地方
const state = {
    userAddress: {},
    userOrder: {}
};
//mutations:修改state的唯一手段
const mutations = {
    GETUSERADDRESS(state, userAddress) {
        state.userAddress = userAddress;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步，这里可以书写业务逻辑但不能修改state
const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        console.log("@@@@@@@@@@", result);
        if (result.code == '200') {
            commit('GETUSERADDRESS', result.data);
        }
    },
    //获取交易订单信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        console.log("@@@@@@@@@@", result);
        if (result.code == '200') {
            commit('GETORDERINFO', result.data);
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
