<template>
    <div>
        <!-- 三级联动组件已经注册为全局组件，因此不需要引入 -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <like></like>
        <!-- 父给子传递数据 -->
        <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"></Floor>
        <Brand></Brand>
    </div>
</template>
<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default{
    name:'',
    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted() {
        //通知服务器发请求
        this.$store.dispatch('getFloorList');
        setTimeout(()=>{
            //console.log(this.floorList);
        },5000) 
    },
    computed: {
        ...mapState({
            floorList : state => state.home.floorList,
        })
    },
    data(){
        return{
            
        }
    },
    methods:{
        
    },

}
</script>
<style>
</style>