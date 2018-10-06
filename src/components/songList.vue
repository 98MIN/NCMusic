<template>
    <div id="songList">
        <div class="content clearfix">
            <div class="left">
                <span>{{index+1}}.</span>
                <span class="icon" :class="index==0?'redIcon':''"></span>
                <span class="songName">{{item.song.song.name}}</span>
                <span>-</span>
                <span>{{item.song.song.artist.name}}</span>
            </div>
            <div class="center">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="right">
               <span>{{item.playCount}}次</span> 
               <div :class="index%2==0?'rightFirst':'rightSecond'" class="maskDiv" ref="mask"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: ['item','index'],
        methods:{
            maskDiv(){
                var oMask = this.$refs.mask;
                /*最大的次数*/
                var max = document.getElementById("songList").querySelector(".right>span");
                max = parseInt(max.innerHTML)           
                oMask.style.width = (this.item.playCount/max)*(oMask.parentElement.offsetWidth)+"px";            
            }
        },
        mounted() {
            this.maskDiv()
        },
    }
</script>
<style scoped>
     .clearfix::after{
        display: block;
        content: '';
        height: 0;
        visibility: hidden;
        clear: both;
    }
    .clearfix{
        zoom: 1;
    }
    .content{
        width: 100%;
        height: 42px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-top: 0;
        box-sizing: border-box;
    }
    .left,.center,.right{
        float: left;
    }
    .left{
        width: 500px;
        padding-left: 20px;
        box-sizing: border-box;
    }
    .center{
        width: 200px;

    }
    .right{
        width: 261px;
        position: relative;
    }
    .right .maskDiv{
        position: absolute;
        top: 0;
        left: 0;
        width:261px;
        height: 42px;
    }
    .left span{
        display: inline-block;
        margin-right: 5px;
        font-size: 12px;
    }
    .left span:nth-child(1){
        width: 20px;
        text-align: right;
    }
    .songName{
        font-size: 16px ;
        font-weight: 700;
    }
    .icon{
        width: 20px;
        height: 20px;
        background: url(../images/iconall.png) -0px  -0px;
        vertical-align: middle;
    }
    .redIcon{
           background: url(../images/iconall.png) -20px  -60px;
    }
    .center{
        height: 40px;
        line-height: 50px;
        visibility: hidden;
    }
    #songList{
        cursor: pointer;
    }
    #songList:hover .center{
        visibility: visible;
    }
    /* 中间的移入显示图标 */
    .center span{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 5px;
        background: url(../images/icon.png) -22px -700px;
    }
    .center span:nth-child(2){
         background: url(../images/icon.png) -45px -110px;
    }
    .center span:nth-child(3){
        background: url(../images/icon.png) -45px -160px;
    }
    .center span:nth-child(4){
       background: url(../images/icon.png) -65px -430px;
    }
    .right span{
        font-size: 12px;
        z-index: 3;
        position: absolute;
    }
    .rightFirst{
        background: #edf7fd;
    }
    .rightSecond{
        background: #e5f0f6;
    }
</style>

