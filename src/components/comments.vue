<template>
    <div id="comments">
        <div class="content clearfix">
            <div class="left clearfix">
                <!-- 磁盘 -->
                <div class="top-left">
                    <div class="pan" v-if="musicContent.al!=undefined">
                        <img :src="musicContent.al.picUrl" width="130px" alt="" >
                    </div>
                </div>
                <div class="top-right">
                    <div class="title">
                        <i></i>
                        <span>{{musicContent.name}}</span>
                        <small v-if="musicContent.alia!=undefined">{{musicContent.alia[0]}}</small>
                    </div>
                    <!-- 所属歌手、专辑 -->
                    <p v-if="musicContent.ar!=undefined">歌手<i>:</i><span :aid="musicContent.ar[0].id">{{musicContent.ar[0].name}}</span></p>
                    <p v-if="musicContent.al!=undefined">所属专辑<i>:</i><span :blumId="musicContent.al.id">{{musicContent.al.name}}</span></p>
                    <!-- 播放、收藏、分享... -->
                    <div class="navbar">
                        <a href="#">
                            <span class="play"></span>
                            播放
                        </a>
                        <a href="#">
                            <span class="collection"></span>
                            收藏
                        </a>
                        <a href="#">
                            <span class="share"></span>
                            分享
                        </a>
                        <a href="#">
                            <span class="download"></span>
                            下载
                        </a>
                        <a href="#">
                            <span class="comments"></span>
                            {{commentsCount.total}}
                        </a>
                    </div>
                    <div class="lyric" v-html="lyric">  
                    </div>
                    <div class="top-footer">
                        <p>报错</p>
                        <p v-if="lyricUser!=undefined">
                            <span>贡献歌词:</span><span>{{lyricUser.nickname}}</span> 
                        </p>
                    </div>
                </div>
                <!-- 评论区 -->
                <div class="commentsBody clearfix">
                    <p>评论<small>共{{commentsCount.total}}条评论</small></p>
                    <div class="commentsBox clearfix">
                        <img src="../images/default_avatar.jpg" width="50px" alt="">
                        <div class="commentsContent">
                            <textArea style="resize:none;width:100%;height:100%" placeholder="快来发表评论呀..." @focus="comment"></textArea>
                        </div>
                        <div class="btn">
                            <a href="#">评论</a>
                        </div>
                    </div>
                    <div class="commentslist clearfix">
                        <p>热门评论</p>
                        <v-hncomments :musicId="musicId" v-for="item in commentsCount.hotComments" :item="item" @like="like" @unlike="unlike"></v-hncomments>
                         <p>最新评论</p>
                        <v-hncomments :musicId="musicId" v-for="item in commentsCount.comments" :item="item" @like="like" @unlike="unlike"></v-hncomments>
                        <a href="#" @click.prevent="loadMore()" ref="loadMore" class="loadMore">加载更多...</a>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="songsIncluded">
                    <p class="title">包含这首歌的歌单</p>
                    <ul>
                        <li v-for="item in sameSongLists" class="clearfix">
                            <div>
                                <img :src="item.coverImgUrl" width="41px" alt="">
                            </div>
                            <div>
                                <p>{{item.name}}</p>
                                <p>by&nbsp;:&nbsp;{{item.creator.nickname}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="sameSongs" v-if="sameSongs!=''">
                    <p class="title">相似歌曲</p>
                    <ul>
                        <li v-for="item in sameSongs" class="clearfix">
                            <div class="sameSongsImg">
                                <div class="mask" @click="toSameSongs($event)">
                                </div>
                                <img :src="item.album.picUrl" alt="" width="42px" :mp3Url="item.mp3Url" :songsId="item.id" :type="item.type" >
                            </div> 
                            
                            <div class="right-bottom">
                                <p>{{item.album.name}}</p>
                                <p>{{item.album.artists[0].name}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="right-footer">
                    <p class="title">网易云音乐多端下载</p>
                    <span class="iosDown"></span>
                    <span class="pcDown"></span>
                    <span class="androidDown"></span>
                    <p class="right-footerP">同步歌单，随时畅听320k好音乐</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vHncomments from './hot and new comments';
    export default{
        data(){
            return{
                tipMsg:"快来发表评论呀...",
                musicId:'',
                musicContent:[],
                musicUrl:'',
                commentsCount:0,
                lyric:'',
                lyricUser:'',
                sameSongs:'',
                sameSongLists:[],
                limit:20,
                liked:""
            }
        },
        // watch: {
        //     liked(){
        //         this.getComments(this.musicId);
        //         console.log(312);
        //     }
        // }
        // ,
        watch: {
            musicId(){
                this.$router.push("/comments?id="+this.musicId)
            }
        }
        ,
        methods: {
            getData(id){
                this.$axios.get('http://118.24.90.238:3000/song/detail?ids='+id).then((res)=>{
                    this.musicContent = res.data.songs[0];
                }).catch((error)=>{
                    console.log(error);
                })
            },
            /*优化:url和时长已经在store里面了无需再次请求然后传给audio*/ 
            // getUrl(id){
            //     this.$axios.get('/api/music/url?id='+id).then((res)=>{
            //         this.musicUrl = res.data.data[0].url;
            //     }).catch((error)=>{
            //         console.log(error);
            //     })
            // },
            getComments(id){ 
                   this.$axios.get('http://118.24.90.238:3000/comment/music?id='+id).then((res)=>{
                    this.commentsCount = res.data;
                }).catch((error)=>{
                    console.log(error);
                })  
            },
            getLyric(id){
                this.$axios.get('http://118.24.90.238:3000/lyric?id='+id).then((res)=>{
                    this.lyric = res.data.lrc.lyric; 
                    this.lyricUser = res.data.lyricUser;                  
                    this.lyric = this.lyric.replace(/\[.*?\]/gi,"</p><p style='margin-top:13px'>");
                }).catch((error)=>{
                    console.log(error);
                })
            },
            getSameSongs(id){
                this.$axios.get("http://118.24.90.238:3000/simi/song?id="+id).then((res)=>{
                    this.sameSongs = res.data.songs;
                }).catch((error)=>{
                    console.log(error);  
                })
            },
            getSameSongLists(id){
                this.$axios.get("http://118.24.90.238:3000/simi/playlist?id="+id).then((res)=>{
                    this.sameSongLists = res.data.playlists;
                }).catch((error)=>{
                    console.log(error);  
                })
            },
            /*加载更多*/ 
            loadMore(){
                if(this.limit<=100){
                    this.limit+=20;
                    this.$axios.get('http://118.24.90.238:3000/comment/music?id='+this.musicId+'&limit='+this.limit).then((res)=>{
                        this.commentsCount = res.data;                    
                    }).catch((error)=>{
                        console.log(error);
                    })  
                    if(this.limit==100){
                        this.limit+=20;
                        setTimeout(()=>{
                            this.$refs.loadMore.innerHTML="没有更多了...";  
                        },1000)          
                    }  
                }  
            },
            like(liked){
                this.liked=liked; 
                this.getComments(this.musicId);
            },
            unlike(liked){
                this.liked=liked;    
                this.getComments(this.musicId)
            },
            toSameSongs(event){
                /*音乐url*/
                
                var musicUrl = event.target.nextElementSibling.getAttribute("mp3Url");
                this.musicId = event.target.nextElementSibling.getAttribute("songsId");               
                /*请求之后把时长存到Vuex中集中保存*/
                this.$store.commit('musicUrl',musicUrl);                           
                this.$axios.get('http://118.24.90.238:3000/song/detail?ids='+this.musicId).then((res)=>{
                    this.$store.commit('musicTime',res.data.songs[0].dt);                    
                }).catch((error)=>{
                    console.log(error);      
                })  
                /*重新更改页面数据*/
                this.getData(this.musicId);
                this.getComments(this.musicId);
                this.getLyric(this.musicId);
                this.getSameSongs(this.musicId);
                this.getSameSongLists(this.musicId); 
            },
            /*评论框获取焦点*/ 
            comment(){
                if(this.$store.state.isLogin==1){
                    console.log("请继续")
                }else{
                    this.$store.commit("tipsShow");
                }
            }
        },
       mounted () {
           this.musicId = this.$route.query.id;
           this.getData(this.musicId);
        //    this.getUrl(this.musicId);
           this.getComments(this.musicId);
           this.getLyric(this.musicId);
           this.getSameSongs(this.musicId);
           this.getSameSongLists(this.musicId);
       },
       components: {
           vHncomments
       }
    }
</script>
<style scoped>
    .clearfix::after{
        display: block;
        content: '';
        clear: both;
        visibility: hidden;
        height: 0;
    }
    .clearfix{
        zoom: 1;
    }
    #comments{
        width: 100%;
        margin: 0 auto;
        background: #f5f5f5;
    }
    .content{
        width: 1040px;
        margin: 0 auto;
        background: #fff;
    }
    .left{
        width: 70%;
        box-sizing: border-box;
        padding: 45px 30px 40px 30px;
        float: left;
    }
    .right{
        width: 30%;
        box-sizing: border-box;
        padding: 20px 40px 40px 30px;
        float: left;
    }
    .top-left,.top-right{
        height: 650px;
        float: left;
    }
    .top-left{
        width: 196px;
    }
    .top-right{
        width: 442px;
        box-sizing: border-box;
        margin-left: 30px;
    }
    .pan{
        width: 196px;
        height: 200px;
        line-height: 204px;
        text-align: center;
        border-radius: 50%;
        background: url(../images/coverall.png) no-repeat -145px -579px;
    }
    .pan img{
        vertical-align: middle;
        border-radius: 50%;
    }
    .title>i{
        display: inline-block;
        width: 54px;
        height: 24px;
        background: url(../images/icon.png) 0 -463px; 
    }
    .title>span{
        font-size: 25px;
        font-size: 900;
        color: #333;
    }
    .title>small{
        display: block;
        font-size: 14px;
        color: #bababa;
        padding: 1px 0 1px 60px;
        font-weight: 600px;
    }
    .top-right p{
        font-size: 12px;
        margin: 10px 0;
        color: #999;
    }
    .top-right p i{
        padding: 0 5px;
        font-style: inherit;
    }
    .top-right p span{
        color: #0c73c2;
    }
    .top-right p span:hover{
        text-decoration: underline;
    }
    /* 收藏 */
    .navbar a span{
        display: inline-block;
        height: 15px;
        width: 15px;
        background: url(../images/icon.png) no-repeat -45px -110px;
        vertical-align: middle;
    }
    /* 播放 */
    .navbar a .play{
         background: url(../images/icon.png) no-repeat -45px -635px;
    }
    /* 分享 */
    .navbar a .share{
         background: url(../images/icon.png) no-repeat -45px -160px;
    }
    /* 下载 */
    .navbar a .download{
         background: url(../images/icon.png) no-repeat -68px -430px;
    }
    .navbar a{
       text-decoration: none;
       color: #333;
       font-size: 14px;
       display: inline-block;
       margin-right: 3px;
       padding: 5px 8px;
       border: 1px solid #b2b2b2;
       border-radius: 5px;
    }
    .lyric{
        margin-top: 46px;
        box-sizing: border-box;
        height: 450px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #333;
    }
    .top-footer p{
        text-align: right;
        color: #999;
    }
    .top-footer p:nth-child(2) span:nth-child(1){
        color: #666;
        text-decoration: none;
    }
    .commentsBody{
        margin-top: 100px;
        width: 100%;
        float: left;
    }
    .commentsBody p{
        font-weight: 500px;
        font-size: 20px;
        border-bottom: 2px solid #c20c0c; 
        padding-bottom: 5px;
    }
    .commentsBody p small{
        font-size: 12px;
        color: #666;
        display: inline-block;
        padding-left: 30px;
    }
    .commentsBox{
        width: 100%;
        height: 100px;
        margin: 20px 0;
    }
    .commentsBox img{
        vertical-align: top;
    }
    .commentsBox .commentsContent{
        position: relative;
        width: 89%;
        margin-left: 15px;
        height: 62px;
        border: 1px solid #666;
        display: inline-block;
        font-size : 14px;
        color : #999;
    }
    .commentsBox .commentsContent textArea{
        outline : 0;
        border : 0 ;
        padding : 5px;
        display: inline-block;
        box-sizing:border-box;
    }
    .commentsBox .commentsContent::before,.commentsBox .commentsContent::after{
        display: block;
        content: '';
        border: 8px solid transparent;
        border-right: 8px solid #666;
        position: absolute;
        left: -16px;
        top: 10px;
    }
    .commentsBox .commentsContent::before{
        border-right: 8px solid #fff;
        left:-14px;
        z-index:3;
    }
    .commentsBox .btn{
        height: 20px;
        margin-top: 5px;
        text-align: right;
    }
    .commentsBox .btn a{
        display: inline-block;
        height: 25px;
        width: 45px;
        font-size: 14px;
        line-height: 25px;
        background: #0c73c2;
        color: #fff;
        text-decoration: none;
        border-radius: 3px;
        margin-right: 5px;
        text-align: center;
    }
    .commentslist p{
        font-size: 12px;
        color: #666;
        margin-top: 20px;
    }
    .songsIncluded{
        width: 240px;
        height: 230px;
        margin-bottom: 40px;
    }
    .sameSongs .title,.songsIncluded .title,.right-footer .title{
        height: 40px;
        color: #333;
        border-bottom: 1px solid #666;
        line-height: 40px;
        font-size: 14px;
        font-weight: 700;
    }
    .sameSongs li,.songsIncluded li{
        list-style: none;
        margin-top: 15px;
    }
     .sameSongs li:hover{
         background: rgba(153, 153, 153,0.4);
     }
     .sameSongs li img{
         vertical-align: middle;
     }
    .sameSongs div,.songsIncluded div{
        float: left;
        margin-right: 10px;
        font-size: 12px;
    }
    .songsIncluded div:nth-child(2){
        width: 170px;
    }
    .sameSongs div p:nth-child(1),.songsIncluded div p:nth-child(1){
        color:#333;
        margin-top: 2px;
         overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .sameSongs div p:nth-child(2),.songsIncluded div p:nth-child(2){
        color:#666;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .sameSongs .sameSongsImg{
        position: relative;
        cursor: pointer;
    }
    .sameSongs .mask{
        background: url(../images/iconall.png) -1px -86px;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 11px;
        left: 10px;
    }
    .right-footer{
        margin-top: 60px;
    }
    .right-footer span{
        display: inline-block;
        height: 48px;
        margin-top: 20px;
    }
    .iosDown{
        width: 28px;
        background: url(../images/sprite.png) -7px -393px;
    }
    .iosDown:hover{
        width: 28px;
        background: url(../images/sprite.png) -7px -473px;
    }
    .pcDown{
        width: 60px;
        background: url(../images/sprite.png) -72px -393px;
        margin: 0 57px;
    }
    .pcDown:hover{
         width: 60px;
        background: url(../images/sprite.png) -72px -473px;
        margin: 0 57px;
    }
    .androidDown{
        width: 30px;
        background: url(../images/sprite.png) -164px -393px;
    }
    .androidDown:hover{
         width: 30px;
        background: url(../images/sprite.png) -164px -473px;
    }
    .right-footerP{
        color: #999;
        font-size: 12px;
        margin-top: 30px;
    }
    .right-bottom p{
        width: 180px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .loadMore{
        font-size: 14px;
        color: #999;
        text-align: center;
        text-decoration: none;
        margin-top: 10px;
        display: inline-block;
        width: 100%;
    }
    .loadMore:hover{
        color: #0c73c2;
    }
</style>

