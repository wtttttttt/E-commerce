<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>
<script>
import Swiper from 'swiper';
export default {
    name: 'Carousel',
    props: ["list"],
    watch: {
        //监听bannerList的变化，有一个空数组变为从服务器返回的数据
        list: {
            immediate: true,
            //如果handler执行了，代表数据发生了改变,但不能说明页面渲染完毕,因此要使用nextTick：
            //nextTick:第一次v-for bannerList是个空数组，下次DOM更新时bannerList有数据了，v-for结束之后，执行nextTick中的回调。            
            handler(newValue, oldValue) {
                this.$nextTick(() => {
                    //console.log(1111);
                    var mySwiper = new Swiper(this.$refs.cur, {
                        loop: true, // 循环模式选项        
                        // 如果需要分页器
                        pagination: {
                            clickable: true,
                            el: '.swiper-pagination',
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },

                        // 如果需要滚动条
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                    })
                })

            }
        }
    }
}
</script>
<style>
</style>