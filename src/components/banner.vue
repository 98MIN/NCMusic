<template>
    <div id="banner" ref="bannerx">
        <div class="content" ref="content">
            <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide><img :src="img1" alt=""></swiper-slide>
                <swiper-slide><img :src="img2" alt=""></swiper-slide>
                <swiper-slide><img :src="img3" alt=""></swiper-slide>
                <swiper-slide><img :src="img4" alt=""></swiper-slide>
                <swiper-slide><img :src="img5" alt=""></swiper-slide>
                <swiper-slide><img :src="img6" alt=""></swiper-slide>
                <swiper-slide><img :src="img7" alt=""></swiper-slide>
                <swiper-slide><img :src="img8" alt=""></swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                index:0,
                img1:require("../images/banner1.jpg"),
                img2:require("../images/banner2.jpg"),
                img3:require("../images/banner3.jpg"),
                img4:require("../images/banner4.jpg"),
                img5:require("../images/banner5.jpg"),
                img6:require("../images/banner6.jpg"),
                img7:require("../images/banner7.jpg"),
                img8:require("../images/banner8.jpg"),
                 swiperOption: {
                    autoplay: { 
                       delay: 3000, 
                       stopOnLastSlide: false,
                      disableOnInteraction: false
                    },
                    loop:true,
                    effect : 'cube',
                    cubeEffect: {
                        slideShadows: true,
                        shadow: true,
                        shadowOffset: 30,
                        shadowScale: 0.6
                    },
                     navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        methods: {
        },
        mounted () {
           
        }
    }
</script>
<style scoped lang="scss">
    #banner{
       width: 100%;
       height: 336px;
       background: #475768;
       .content{
           width: 730px;
           margin: 0 auto;
           .swiper-container,.swiper-slide {
                height: 336px;
            }
            .swiper-pagination-bullet {
                width: 15px;
                height: 15px;
            }
            .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
                bottom: 8%;
            }
            .swiper-button-prev{
                height: 65px;
                width: 37px;
                background: url(../images/banner.png) 0px -430px;
            }
            .swiper-button-next{
                height: 65px;
                width: 37px;
                background: url(../images/banner.png) 0px -575px;
            }
       }
    }
</style>


