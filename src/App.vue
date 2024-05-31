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
  }
}
</script>

<style>

</style>
