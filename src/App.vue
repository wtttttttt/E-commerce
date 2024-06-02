<template>
  <div>
    <Header></Header>
    <RouterView></RouterView>
    <!--在home、search组件中显示，在login、register组件中隐藏-->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
    
  </div>
  
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

import { RouterView } from 'vue-router';
export default{
  name:'',
  components:{
    Header,
    Footer
  },
  mounted(){
    //通知Vuex发送请求，获取数据，存在仓库中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
