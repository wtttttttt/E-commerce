1.项目的其他配置：
1.1项目运行后自动打开网页
    在package.json中加open
    "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
1.2eslint校验功能关闭
    在根目录下创建vue.config.js
1.3src目录简写方法，配置别名为@，@代表src
3.项目路由的分析
前端路由：kv键值对
key:url(地址栏中的路径)
value:相应的路由组件
项目路由：
home首页路由组件、search路由组件、login路由组件、register注册路由组件
非路由组件：header、footer在首页和搜索页有，在登录页和注册页没有
4.开发流程
书写静态页面
拆分组件
获取服务器的数据动态展示
完成相应的动态业务逻辑
注意1：创建组件的时候，组件结构+组件样式+图片资源

5.使用组件的流程
定义、引入、注册

6.路由组件的搭建：
有四个路由组件，分别为Home、Search、Login、Register
components文件夹：放置非路由组件或者共用的全局组件
pages/views文件夹：经常放置路由组件
7.总结
路由组件与非路由组件的区别
7.1路由组件一般放在view和pages中，非路由组件一般在component中
7.2路由组件一般需要在router文件夹中注册，使用组件的名字，非路由组件在使用时一般以标签的形式
$route:用于获取路由信息：路径、query、params等
$router:进行编程式导航进行路由跳转（push||replace）

8.完成footer组件的显示和隐藏
v-if:操作dom
v-show：通过样式控制显示隐藏
可以根据组件身上的$route获取组件的具体信息
但这里采用路由元信息控制组件的显示和隐藏

9.路由的跳转方式
声明式导航：router-link，必须有to属性
编程式导航：push/replace，在路由跳转前可以写其他业务逻辑，且可以完成声明式导航所完成的事,但编程式路由导航有个问题：进行路由跳转但参数不变时，多次执行会抛出NavigationDuplicated错误
a.为什么有这种错误？——push方法会返回一个promise，promise有成功和失败两个回调
可以给push函数传入这两个回调解决这个问题,但治标不治本，只能表面消除错误，需要重写VueRouter.prototype的push方法

10.路由传参相关：
1）传递params参数是否可以结合path?
--不可以，必须使用name，path只能和query参数一起使用,name也可以使用query
2）如何指定params参数可传可不传？
如果在配置路由时定义了params参数的占位，但跳转时不传参数，跳转后路径会由问题，那么如何指定可以不传呢？——在配置路由时在占位符后加个问号？
3）params参数可传可不传，但如果传递的是空串怎么办？
跳转时路径会有问题 ，使用undefined解决路径问题 {name:"search",params:{keyword:''||undefined}}
4)路由组件能不能传递props数据？
——可以，三种方法
a.props数据为布尔值：只能用params
b.props数据为对象：在路由配置中：props:{a=1,b=2}
c.props数据为函数：props:($route)=>{
    return {keyword:$route.params.keyword ,k:$route.query.k }
}

11.Home模块组件拆分
--先完成静态页面
--拆分静态组件
--获取服务器的数据进行显示
--js业务逻辑
---三级联动组件：在home、search、detail中均出现，因而将其注册为全局组件，好处是注册一次，可以在任意地方使用,全局组件在入口文件main.js中注册
---其余组件的划分

12.postman接口测试成功
接下来进行axios二次封装
为什么二次封装？
--主要由于请求拦截器和响应拦截器，分别用于在发请求之前和服务器返回数据后可以处理一些业务逻辑

13.项目中的API文件夹通常用于存储axios的二次封装:
在接口中路径都带有/api---baseURL:"/api"
用于在发请求时路径中自动加上api

14.接口统一管理
项目很小：完全可以在组件的生命周期函数中发请求
项目大：几百个组件都用一个地址，一个个发很麻烦，因此要进行统一管理

15.nprogress的使用
在发送请求和等待服务器响应的过程中使用进度条
start():进度条开始
done():进度条结束
且进度条样式可修改

16.vuex状态管理库
官方提供的插件，集中式管理项目中组件共用的数据，如果项目小，不需要vuex，如果项目很大，组件很多，数据很多，需要用vuex，
vuex主要包括state,mutations，actions,getters,modules

17.vuex的基本使用
模块式开发
如果项目过大，组件过多，接口也很多，数据也很多
需要将store拆分为小仓库

18.完成三级联动数据获取
（1）鼠标移进完成一级数据背景色添加：
--采用样式完成：item:hover{background-color:skyblue}
--采用js:给标签动态添加class
（2）鼠标移除背景色消失：
--事件委派：将移除事件交给父元素，只有鼠标移除父元素时背景色才消失

19.通过js控制二三级分类展示
最初为通过css实现的：
--最初二三级样式为display:none，当鼠标移到一级分类上去的时候，把display变为block
&:hover {
.item-list {
display: block;
 }
 }
 用js实现：
 --动态改变display属性:style="{display:currentIndex==index?'block':'none'}"

卡顿现象：
正常情况，用户慢慢进入，非正情况：用户行为很快，导致浏览器来不及解析全部代码，有可能出现卡顿现象
解决：
--函数防抖与节流
（1）防抖：前面的所有出发都会呗取消，最后一次执行在规定的时间之后才能触发，也就是说如果连续快速的触发只会执行一次，比如输入框中输入文字，每输入一个字都发送一次请求就可能发生卡顿，
--解决：lodash:_.debounce(function,time)
（2）节流：在规定时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁回调编程少量回调
--解决：lodash:_.throttle(function,time)

20.完成三级联动的路由跳转和参数传递
路由跳转：
声明式导航：router-link(会出现卡顿现象)
编程式导航：push|replace
整理参数：
往哪跳：跳到Search组件

21.开发search模块中三级联动Navtype的显示与隐藏
--在typeNav中通过v-show控制

22.过度动画：
前提条件：元素务必要有v-if,v-show指令才可以进行过度动画

23.优化：
每次挂载TypeNav组件都会向服务器发请求，因此将发请求放在根组件的mounted中，可以保证只发一次请求。


24.开发home首页中的ListContainer组件与Floor组件
但是服务器只返回商品列表的数据，因此需要mock技术造一些数据
--在src下创建mock文件夹
--在mock文件夹中创建json文件
--把mock需要的图片放在public文件夹下，public在打包的时候会原封不动的放在dist文件夹下
--通过mock模拟数据
--在入口文件main.js引入执行一次
--获取数据，存入store仓库
轮播图