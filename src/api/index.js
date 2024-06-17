//该文件对api进行统一管理
import request from "./request";
import mockRequests from "./mockAjax";
//三级联动接口
//请求地址/api/product/getBaseCategoryList get  无参数
export const reqCategoryList = () => {
  //发请求,返回结果是promise对象
  return request({ url: "/product/getBaseCategoryList", method: "get" });
  //可以.then .catch
};
//获取banner轮播图数据接口（通过mock模拟）
export const reqGetBannerList = () => {
  return mockRequests.get("/banner");
};
//获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");

//获取搜索模块数据：/api/list 方式：post
//当前接口给服务器传递的参数至少是个空对象
export const reqGetSearchInfo = (params) =>
  request({ url: "/list", method: "post", data: params });
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }

//获取商品详情信息 、api/item/skuId get
export const reqGoodsInfo = (skuId) =>
  request({ url: `/item/${skuId}`, method: "get" });

//添加购物车  post
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

//获取购物车数据的接口 ：/api/cart/cartList  get
export const reqCarList = () =>
  request({ url: "/cart/cartList", method: "get" });
