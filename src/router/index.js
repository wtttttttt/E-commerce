//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
//配置路由
import Home from '../pages/Home'
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'

//保存原来的push方法
let originPush=VueRouter.prototype.push
//重写push
//第一个参数：往哪里跳，第二个参数：成功的回调，第三个参数：失败的回调
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        //call和apply:
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call方法传参用逗号，apply用数组
        originPush.call(this,location,resolve,reject);
    }
    else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
export default new VueRouter({
    //配置路由
    routes:[
        {
            path:"/home",
            component:Home,
            meta:{
                show:true
            }
            
        },
        {
            path:"/search",
            component:Search,
            name:"search",
            meta:{
                show:true
            }
           
        },
        {
            path:"/login",
            component:Login,
            meta:{
                show:false
            }
           
        },
        {
            path:"/register",
            component:Register,
            meta:{
                show:false
            }
           
        },
        //重定向：在项目跑起来的时候，访问/立马跳转到首页
        {
            path: '*',
            redirect: '/home'
        }
    ]
})
    
