            <!-- 使用路由守卫如果没有登录就提示要登录 -->
 <template>
    <div id="tips" v-show="this.$store.state.isShow" ref="tips">
       <div class="content" >
           <span>您尚未登录，请先登录再进行操作</span>
           <div class="close" @click="close()"></div>
       </div>
    </div> 
</template>
<script>
        export default{
            data(){
                return{

                }
            },
            methods: {
                close(){
                   this.$store.commit("tipsHide");
                },
                Center(){
                     var tips = this.$refs.tips;
                    /*可视区宽度*/ 
                    var CWidth = document.documentElement.clientWidth||document.body.clientWidth;
                    var left = CWidth/2-(parseInt(getComputedStyle(tips.children[0]).width)/2);     
                        
                    /*可视区高度*/    
                    var CHeight = document.documentElement.clientHeight||document.body.clientHeight;
                    /*滚动条高度*/ 
                    var SHeight = document.documentElement.scrollTop||document.body.scrollTop;
                    var top = SHeight+(CHeight/2-(parseInt(getComputedStyle(tips.children[0]).height)/2));
                    tips.children[0].style.left = parseInt(left)+"px";
                    tips.children[0].style.top = parseInt(top)+"px";
                }
            },
            updated() {
               this.Center();
            }
        }
</script>
<style scoped>
    .content{
        width: 400px;
        height: 200px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 200px;
        z-index: 999;
        position: absolute;
        top: 200px;
        background: rgba(0, 0, 0, 0.4);
    }
    .close{
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        left: 380px;
        top: 0px;
        background: url(../images/icon2.png) -3px -190px;
    }
    .close:hover{
         background: url(../images/icon2.png) -46px -190px;
    }
</style>

