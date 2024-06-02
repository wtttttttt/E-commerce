<template>
    <div class="type-nav">
            <div class="container">
                <!-- 事件委派/事件代理 -->
                <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                    
                    <h2 class="all" >全部商品分类</h2>
                    <!-- 三级联动  利用事件委派和编程式路由导航完成路由跳转 //过渡动画-->
                    <transition name="sort"></transition>
                    <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                            <h3 @mouseenter="changeIndex(index)">
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}-{{index}}</a>
                            </h3>
                            <!-- 二级、三级分类 -->
                            <div class="item-list clearfix"  :style="{display:currentIndex==index?'block':'none'}">
                                <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>                     
                    </div>
                </div>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                
            </div>
        </div>
</template>
<script>
import {mapState} from 'vuex'
//这是引入了lodash的全部功能
//import _ from 'lodash'
//按需引入
import throttle from 'lodash/throttle'
export default {
    name:'TypeNav',
    
    data(){
        return{
           //存储用户鼠标在哪个一级分类上
            currentIndex:-1,
            show:true,
        };
    },
    methods:{
        //鼠标进入哪个一级分类的索引值,改变该项的背景颜色
        //正常情况，用户缓慢进入，非正情况：用户行为很快，导致浏览器来不及解析全部代码，有可能出现卡顿现象
        // changeIndex(index){
        //     //console.log(index);
        //     this.currentIndex=index;            
        // },
        //此处不能用箭头函数
        changeIndex:throttle(function(index){
            this.currentIndex=index;
        },50),
        //鼠标移除一级分类回调函数
        leaveIndex(){
            this.currentIndex=-1;
            //如果是search路由才执行
            if(this.$route.path!="/home"){
                this.show=false; 
            }                     
        },
        enterShow(){
            this.show=true;
        },
        goSearch(event){
            //问题1：由于用了事件委派，h3,dt,dl,em的事件全都委派给父节点，如何确定点击的时候一定是a标签
            //--给a标签添加自定义属性:data-categoryName其余子节点没有，只要带有:data-categoryName属性的就是a标签
            //问题2：即使能确定点击的是a标签，如何确定是哪一及a标签
            //--
            //获取到当前触发事件的节点，有可能是h3,dt,dl,em，a标签
            let element=event.target;
            //console.log(element.dataset);
            let{categoryname,category1id,category2id,category3id}=element.dataset;
            if(categoryname){
                //整理路由跳转参数
               
                let location={name:"search"}
                let query={categoryName:categoryname};
                //一级分类、二级分类、三级分类标签
                if(category1id){
                    query.category1Id=category1id;
                }else if(category2id){
                    query.category2Id=category2id;
                }else{
                    query.category3Id=category3id;
                }
                //参数整理完毕，将参数整合
                location.query=query;
                //路由跳转
                //判断：是否有params参数
                if(this.$route.params){
                    location.params = { ...this.$route.params, keyword: 'defaultKeyword' };
                }else {
                    location.params = { keyword: 'defaultKeyword' };
                }
                this.$router.push(location);
                                                                    
            }

        },
        
    },
    //组件挂载完毕就可以向服务器发数据，转移到根组件发送了
    mounted(){        
        if(this.$route.path!='/home'){
            this.show=false;
            //console.log("typeNav挂载完毕");
        }
        
    },
    computed:{
        ...mapState({
            //右侧是个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            //会注入一个参数state，即为大仓库中的数据
            categoryList:(state)=>{
                return state.home.categoryList
            }
            //简写
            //categoryList:state=>state.home.categoryList
        })
    }
}
</script>
<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        
                    }
                    .cur{
                        background-color: skyblue;
                    }
                }
            }
            //过渡动画样式
            //过渡动画开始样式（进入）
            .sort-enter{
                height: 0px;
            }
            //过渡动画结束状态（进入）
            .sort-enter-to{
                height: 461px;
            }
            .sort-enter-active{
                transition: all .5s liner;
            }
        }
    }
</style>
