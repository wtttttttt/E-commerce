<template>
    <div>
        <!-- 三级联动组件已经注册为全局组件，因此不需要引入 -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <like></like>
        <Floor></Floor>
        <Floor></Floor>
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

import { mapState } from 'vuex'
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
    data(){
        return{
            
        }
    },
    methods:{
        
    },
    computed:{
        
    }

}
</script>
<style>
</style>