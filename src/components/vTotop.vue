<template>
    <div id="toTop" @click="toTop($event)" ref="toTopz">

    </div>    
</template>
<script>
    export default{
        methods:{
            toTop(event){
                    /*很糙的滑动到顶部效果*/   
                   var timer = setInterval(function(){
                       /*获取滚动条的高度*/
                         var SHeight = document.documentElement.scrollTop||document.body.scrollTop;
                        if(SHeight==0){
                            clearInterval(timer);
                        }else{
                            document.documentElement.scrollTop-=100;            
                        }
                    },10);
                    
                if(document.documentElement.scrollTop<300||document.body.scrollTop<300){
                    event.target.style.display = 'none'; 
                }else{
                    event.target.style.display = 'block';
                }
            }
        },
        mounted() {
            /*监听滚动条*/ 
            window.addEventListener("scroll", ()=>{
                var SHeight = document.documentElement.scrollTop||document.body.scrollTop;
                if(SHeight<100){
                    this.$refs.toTopz.style.display = 'none';

                }else{
                    this.$refs.toTopz.style.display = 'block';
                }                
        })
        },
    }
</script>
<style scoped>
    #toTop{
        width: 47px;
        height: 42px;
        background: url(../images/sprite.png) -266px -47px;
        position: fixed;
        right: 20px;
        bottom: 150px;
        cursor: pointer;
    }
    #toTop:hover{
        background: url(../images/sprite.png) -326px -47px;
    }
</style>

