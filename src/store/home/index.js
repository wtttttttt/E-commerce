import {reqCategoryList} from '@/api';
//home模块的小仓库
//state:仓库存储数据的地方
const state={
    //数据初始值是根据接口返回值类型决定的
    categoryList:[]
};
//mutations:修改state的唯一手段
const mutations={
    CATEGORIES(state,categoryList){
        state.categoryList=categoryList
    }
};
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步，这里可以书写业务逻辑但不能修改state
const actions={
    //通过API里的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({ commit }) {
        try {
          const result = await reqCategoryList()
          //console.log(result);
          if(result.code==200){
            commit('CATEGORIES', result.data)
          }
          
        } catch (error) {
          console.error('请求失败', error)
        }
      }
    
};
//getters:可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters={};
//对外暴露小仓库的一个实例
export default ({
       
            state,
            mutations,
            actions,
            getters
        
})