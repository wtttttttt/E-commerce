1.项目的其他配置：
1.1 项目运行后自动打开网页
在 package.json 中加 open
"scripts": {
"serve": "vue-cli-service serve --open",
"build": "vue-cli-service build",
"lint": "vue-cli-service lint"
},
1.2eslint 校验功能关闭
在根目录下创建 vue.config.js
1.3src 目录简写方法，配置别名为@，@代表 src 3.项目路由的分析
前端路由：kv 键值对
key:url(地址栏中的路径)
value:相应的路由组件
项目路由：
home 首页路由组件、search 路由组件、login 路由组件、register 注册路由组件
非路由组件：header、footer 在首页和搜索页有，在登录页和注册页没有 4.开发流程
书写静态页面
拆分组件
获取服务器的数据动态展示
完成相应的动态业务逻辑
注意 1：创建组件的时候，组件结构+组件样式+图片资源

5.使用组件的流程
定义、引入、注册

6.路由组件的搭建：
有四个路由组件，分别为 Home、Search、Login、Register
components 文件夹：放置非路由组件或者共用的全局组件
pages/views 文件夹：经常放置路由组件 7.总结
路由组件与非路由组件的区别
7.1 路由组件一般放在 view 和 pages 中，非路由组件一般在 component 中
7.2 路由组件一般需要在 router 文件夹中注册，使用组件的名字，非路由组件在使用时一般以标签的形式
$route:用于获取路由信息：路径、query、params等
$router:进行编程式导航进行路由跳转（push||replace）

8.完成 footer 组件的显示和隐藏
v-if:操作 dom
v-show：通过样式控制显示隐藏
可以根据组件身上的$route 获取组件的具体信息
但这里采用路由元信息控制组件的显示和隐藏

9.路由的跳转方式
声明式导航：router-link，必须有 to 属性
编程式导航：push/replace，在路由跳转前可以写其他业务逻辑，且可以完成声明式导航所完成的事,但编程式路由导航有个问题：进行路由跳转但参数不变时，多次执行会抛出 NavigationDuplicated 错误
a.为什么有这种错误？——push 方法会返回一个 promise，promise 有成功和失败两个回调
可以给 push 函数传入这两个回调解决这个问题,但治标不治本，只能表面消除错误，需要重写 VueRouter.prototype 的 push 方法

10.路由传参相关：
1）传递 params 参数是否可以结合 path?
--不可以，必须使用 name，path 只能和 query 参数一起使用,name 也可以使用 query
2）如何指定 params 参数可传可不传？
如果在配置路由时定义了 params 参数的占位，但跳转时不传参数，跳转后路径会由问题，那么如何指定可以不传呢？——在配置路由时在占位符后加个问号？
3）params 参数可传可不传，但如果传递的是空串怎么办？
跳转时路径会有问题 ，使用 undefined 解决路径问题 {name:"search",params:{keyword:''||undefined}} 4)路由组件能不能传递 props 数据？
——可以，三种方法
a.props 数据为布尔值：只能用 params
b.props 数据为对象：在路由配置中：props:{a=1,b=2}
c.props 数据为函数：props:($route)=>{
    return {keyword:$route.params.keyword ,k:$route.query.k }
}

11.Home 模块组件拆分
--先完成静态页面
--拆分静态组件
--获取服务器的数据进行显示
--js 业务逻辑
---三级联动组件：在 home、search、detail 中均出现，因而将其注册为全局组件，好处是注册一次，可以在任意地方使用,全局组件在入口文件 main.js 中注册
---其余组件的划分

12.postman 接口测试成功
接下来进行 axios 二次封装
为什么二次封装？
--主要由于请求拦截器和响应拦截器，分别用于在发请求之前和服务器返回数据后可以处理一些业务逻辑

13.项目中的 API 文件夹通常用于存储 axios 的二次封装:
在接口中路径都带有/api---baseURL:"/api"
用于在发请求时路径中自动加上 api

14.接口统一管理
项目很小：完全可以在组件的生命周期函数中发请求
项目大：几百个组件都用一个地址，一个个发很麻烦，因此要进行统一管理

15.nprogress 的使用
在发送请求和等待服务器响应的过程中使用进度条
start():进度条开始
done():进度条结束
且进度条样式可修改

16.vuex 状态管理库
官方提供的插件，集中式管理项目中组件共用的数据，如果项目小，不需要 vuex，如果项目很大，组件很多，数据很多，需要用 vuex，
vuex 主要包括 state,mutations，actions,getters,modules

17.vuex 的基本使用
模块式开发
如果项目过大，组件过多，接口也很多，数据也很多
需要将 store 拆分为小仓库

18.完成三级联动数据获取
（1）鼠标移进完成一级数据背景色添加：
--采用样式完成：item:hover{background-color:skyblue}
--采用 js:给标签动态添加 class
（2）鼠标移除背景色消失：
--事件委派：将移除事件交给父元素，只有鼠标移除父元素时背景色才消失

19.通过 js 控制二三级分类展示
最初为通过 css 实现的：
--最初二三级样式为 display:none，当鼠标移到一级分类上去的时候，把 display 变为 block
&:hover {
.item-list {
display: block;
}
}
用 js 实现：
--动态改变 display 属性:style="{display:currentIndex==index?'block':'none'}"

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
往哪跳：跳到 Search 组件

21.开发 search 模块中三级联动 Navtype 的显示与隐藏
--在 typeNav 中通过 v-show 控制

22.过度动画：
前提条件：元素务必要有 v-if,v-show 指令才可以进行过度动画

23.优化：
每次挂载 TypeNav 组件都会向服务器发请求，因此将发请求放在根组件的 mounted 中，可以保证只发一次请求。

24.开发 home 首页中的 ListContainer 组件与 Floor 组件
但是服务器只返回商品列表的数据，因此需要 mock 技术造一些数据
--在 src 下创建 mock 文件夹
--在 mock 文件夹中创建 json 文件
--把 mock 需要的图片放在 public 文件夹下，public 在打包的时候会原封不动的放在 dist 文件夹下
--通过 mock 模拟数据
--在入口文件 main.js 引入执行一次
--获取数据，存入 store 仓库
Banner 轮播图实现（swiper 使用步骤）
npm install 引包和 css 样式、务必在完成页面元素加载后，创建 swiper 实例
由于向服务器发请求是异步的，因此在 ListContainer 中要等待数据回来才能创建 swiper 实例，一种方法是使用定时器解决
另一种是使用 watch+$nextTick:第一次 v-for bannerList 是个空数组，下次 DOM 更新时 bannerList 有数据了，v-for 结束之后，执行 nextTick 中的回调。
nextTick 可以保证页面中元素一定是有的

复习：search 模块需要的数据已经请求到了，且存储于 vuex 中，通过 getters 映射到了组件
商品列表和平台售卖属性的数据均来自于服务器

25.当删除面包屑时，需要重新发请求，但是$route 不能手动修改，只有路由发生变化是才会改变，因此需要 push(),但要注意如果原路径中有 params 参数也要一并带给服务器

26.排序操作：根据销量、价格等进行排序
通过 order 中的属性值判断："1：asc""2:desc"
谁有类名 active 谁高亮，且有箭头

27.分页
为什么分页：数据量太大时加载数据很慢，会出现卡顿
前端三件套：轮播图、分页、日历
pagenation 需要的数据：当前是第几页 pageNo，每一页展示多少数据 pageSize，一共有多少条数据 total（共有多少页）、连续页码个数 continues（一般是 5 或 7，因为需要对称）

自定义分页器：先传假的数据再使用服务器
重要：算出连续页码起始页和结束页：当前页永远在最中间，在当前页的基础上前后+-2

分页器动态展示
分为上中下三个部分：

28.详情页
当点击商品图片时。跳转到详情页并传参，（params 参数）
路由跳转：此处用声明式导航就可以
滚动行为
请求接口数据：
vuex 新增模块

29.计算属性：
//给子组件的数据
skuImageList() {
return this.skuInfo.skuImageList || [];
}
在模板中就不要再使用 skuInfo.skuImageList 了，直接使用 skuImageList

30
