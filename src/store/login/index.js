//login模块的小仓库
//state:仓库存储数据的地方
const state={
   
};
//mutations:修改state的唯一手段
const mutations={
   
};
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步，这里可以书写业务逻辑但不能修改state
const actions={
    
    
};
//getters:可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters={};
//对外暴露小仓库的一个实例
export default({
        modules:{
                state,
                mutations,
                actions,
                getters
        }
    })
