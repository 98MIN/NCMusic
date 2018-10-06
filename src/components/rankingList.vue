<template>
    <div id="rankingList">
            <dl class="content">
                <dt class="top clearfix">
                    <div class="left">
                       <a href="#"><img :src="list.coverImgUrl" width="100px" alt=""></a> 
                    </div>
                    <div class="right">
                        <h5>{{list.name}}</h5>
                        <a href="#" class="play"></a>
                        <a href="#" class="collection"></a>
                    </div>
                </dt>
                <dd class="body">
                    <ol>
                        <li v-for="(item,index) in itemList" :class="index%2==0?'active':''">
                            <span :class="index<TIndex?'topList':''">{{index+1}}</span>
                            <router-link :id="item.id" :to="{name:'comments',query:{id:item.id}}" :idx="item.ar[0].id" @click.native.prevent="getUrl($event)">{{item.name}}</router-link>
                        </li>
                    </ol>
                </dd>
            </dl>
            <div class="footer"><a href="#">查找更多&gt;</a></div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                TIndex:3,
                musicId:'',
            }
        },
        methods:{
             getUrl(event){
                this.musicId = event.target.id;  
                this.$axios.get('http://118.24.90.238:3000/music/url?id='+this.musicId).then((res)=>{
                    /*请求之后把时长存到Vuex中集中保存*/
                    this.$store.commit('musicUrl',res.data.data[0].url);               
                }).catch((error)=>{
                    console.log(error);      
                })              
               this.$axios.get('http://118.24.90.238:3000/song/detail?ids='+this.musicId).then((res)=>{
                    this.$store.commit('musicTime',res.data.songs[0].dt);                    
                }).catch((error)=>{
                    console.log(error);      
                })
            }
        },
        props:['itemList','list']
    }
</script>
<style scoped>
    #rankingList{
        width: 240px;
        background: #fff;
        height: 509px;
        margin: 20px 0;
        border: 1px solid #c10d0c;
    }
    .content{
        width: 240px;
        background: #f4f4f4;
    }
    .top{
        padding: 15px 0 0 19px;
        height: 125px;
        box-sizing: border-box;
    }
     .left,.right{
        float: left;
        width: 100px;
        height: 105px;
    }
    .right{
        margin: 10px 0 0 10px;
        width: 100px;
        height: 60px;
    }
   h5{
       margin-bottom: 10px;
       font-weight: 700;
       font-size: 14px;
   }
    .right a{
        display: inline-block;
        width: 26px;
        height: 26px;
        margin-right: 8px;
    }
    .play{
        background: url(../images/iconall.png) no-repeat -81px 2px;
    }
    .play:hover{
        background: url(../images/iconall.png) no-repeat -81px -28px;
    }
    .collection{
        background: url(../images/iconall.png) no-repeat -80px -60px;
    }
    .collection:hover{
        background: url(../images/iconall.png) no-repeat -80px -90px;
    }
    
    .body li{
        list-style: none;
        font-size: 14px;
        width: 100%;
        height: 35px;
        color: #bbb;
        line-height: 35px;
    }
    li span{
        padding: 0px 15px 0 15px; 
        position: relative;
        top: -10px;
        color: #666;
        height: 33px;
        width: 5%;
    }
    li a{
        display: inline-block;
        width:70%;
        height: 35px;
        text-decoration: none;
        color: #bbb;
         overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    li:hover a{
        text-decoration: underline;
    }
    .active{
        background: #e8e8e8;
    }
    /* 榜单前三 */
    .topList{
        color: #c10d0c;
    }
    .footer{
        width: 240px;
        height: 33px;
        line-height: 33px;
        background: #e8e8e8;
    }
    .footer a{
        text-decoration: none;
        color: #000;
        float: right; 
        font-size: 12px;  
    }
</style>

