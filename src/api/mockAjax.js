//对axios进行二次封装
import axios from "axios"
//引入进度条以及样式
import "nprogress/nprogress.css"
import nprogress from "nprogress";
//start是进度条开始，done是进度条结束
//利用axios对象的方法create创建一个axios实例
//request就是axios,只不过稍微配置一下进行封装
const mockRequests = axios.create({
    //配置对象
    //用于在发请求时路径中自动加上api
    baseURL:"/mock",
    //请求超时的事件为5s
    timeout:5000
});
//请求拦截器：在发请求之前，请求之前可以检测到，在发出去之前处理一些事情
mockRequests.interceptors.request.use((config)=>{
    //config:配置对象，里面的headers请求头属性很重要
    //进度条开始动
    nprogress.start()
    return config;
})
//响应拦截器：
mockRequests.interceptors.response.use((res)=>{
    //成功的回调函数（箭头函数），服务器数据回来后，响应拦截器可以检测到，并处理一些事
    //进度条结束
    nprogress.done()
    return res.data;
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('fail'))
})

//对外暴露
export default mockRequests