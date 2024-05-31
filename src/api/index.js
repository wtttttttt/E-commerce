//该文件对api进行统一管理
import request from "./request";
//三级联动接口
//请求地址/api/product/getBaseCategoryList get  无参数
export const reqCategoryList=()=>{
    //发请求,返回结果是promise对象
    return request({url:'/product/getBaseCategoryList',method:'get'})
    //可以.then .catch
}