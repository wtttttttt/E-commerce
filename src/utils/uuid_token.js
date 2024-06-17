import { v4 as uuidv4 } from "uuid";
//生成一个随机字符串且每次执行不能发生改变，游客身份持久存储
export const getUUID = () => {
  //先从本地存储获取uuid（看本地是否有）
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  if (!uuid_token) {
    //没有就生成一个新的并且存储起来
    uuid_token = uuidv4();
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  //返回
  return uuid_token;
  // console.log('获取到的uuid为'+uuid_token)
  // alert('获取到的uuid为'+uuid_token+'  请妥善保管)
};
