<template>
    <div id="hot" class="clearfix">
        <div class="avatar">
            <img :src="item.user.avatarUrl" width="50px" alt="">
        </div>
        <div class="comments">
            <div>
                <span>{{item.user.nickname}}</span>
                <span>:</span>
                <span>{{item.content}}</span>
                <div v-if="item.beReplied[0]!=undefined" class="beReplied">
                    <span>{{item.beReplied[0].user.nickname}}</span>
                    <span>:</span>
                    <span>{{item.beReplied[0].content}}</span>
                </div>
            </div>
            <div class="date">
               {{date}} 
            </div>
            <div class="zan" :cid="item.commentId" :sid="musicId">
                <span :class="isZan?'figurezan':'figure'" @click="like($event)"></span>
                <span>({{item.likedCount}})</span>
                <span>|</span>
                <a href="#">回复</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                date:'',
                code:"",
                isZan:false,
            }
        },
        methods:{
            getDate(){
                var datex = new Date(this.item.time);
                datex = datex.toLocaleString().split(' ');  
                datex = datex[0].toString().split('/');
                this.date = datex[0]+"年"+datex[1]+"月"+datex[2]+"日";
            },
            like(event){
                if(this.$store.state.isLogin!=1){
                    this.$store.commit('maskShow');
                    document.body.style.overflow = "hidden"; 
                    this.$store.commit("tipsShow");
                }else{
                     var cid = event.target.parentElement.getAttribute("cid");
                     var sid = event.target.parentElement.getAttribute("sid");
                    /*本应该用item.liked作为判断条件，但是由于数据原因无法成功*/  
                    if(!this.isZan){  
                        this.$axios.get("http://118.24.90.238:3000/comment/like?id="+sid+"&cid="+cid+"&t=1&type=0").then((res)=>{
                            this.isZan = true;
                            this.$emit("like",this.item.liked)       
                        }).catch((error)=>{
                            console.log(error);     
                        })
                    }else{
                        this.$axios.get("http://118.24.90.238:3000/comment/like?id="+sid+"&cid="+cid+"&t=0&type=0").then((res)=>{
                             this.isZan = false;
                            this.$emit("unlike",this.item.liked)       
                        }).catch((error)=>{
                            console.log(error);     
                        }) 
                    } 
                }
            },
            /*是否赞过*/
        },
        mounted() {
            this.getDate();
            this.isZan = this.item.liked;            
        },
        props: ['item','musicId']
    }
</script>
<style scoped>
    #hot{
        padding: 10px 0;
        margin: 10px 0;
        border-bottom: 1px dotted #ccc;
    }
    .avatar img{
        vertical-align: top;
    }
    .avatar,.comments{
        float: left;
    }
    .comments{
        width: 80%;
        margin-left: 10px;
    }
    .comments span{
        font-size: 12px;
    }
    .comments span:nth-child(1){
        color: #0c73c2;
        font-size: 12px;
    }
    .date{
        height: 30px;
        line-height: 30px;
        float: left;
        margin-top: 5px;
        font-size: 12px;
        color: #999;
        margin-top: 20px;
    }
    .zan{
        height: 30px;
        float: right;
        margin:20px -60px 0 0;
    }
    .zan .figure{
        background: url(../images/icon.png) no-repeat -36px -680px;
        display: inline-block;
        height: 12px;
        width: 14px;
        margin: 0px 0px 0px 10px;
        vertical-align: middle;
    }
      .zan .figurezan{
        background: url(../images/icon.png) no-repeat -35px -718px;
        display: inline-block;
        height: 12px;
        width: 14px;
        margin: 0px 0px 0px 10px;
        vertical-align: middle;
    }
    .zan span:nth-child(2){
        display: inline-block;
        margin-right: 5px;
    }
    .zan a{
        color:#666;
        font-size: 12px;
        text-decoration: none;
        display: inline-block;
        margin:0  10px 0 5px;
    }
    /* 回复的原文 */
    .beReplied{
        background: #f4f4f4;
        margin-top: 15px;
        padding: 8px 19px;
        border: 1px solid rgb(222, 222, 222); 
        position: relative;
        color: #666;
    }
    .beReplied:after,.beReplied:before{
        display:block;
        content:"";
         position: absolute;
        border: 5px solid transparent;
        border-right: 5px solid rgb(222, 222, 222);
        left: -11px;
        top: 10px;
    }
    .beReplied:after{
         border-right: 5px solid #f4f4f4;
         left:-10px;
    }
</style>

