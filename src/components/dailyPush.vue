<template>
    <!-- 音乐推荐 -->
    <div id="dailyPush">     
        <div class="personal">
             <div class="title">
                <h2>每&emsp;日&emsp;推&emsp;荐</h2>
            </div>
            <div class="form clearfix">
                <div class="leftBox">
                   <div class="top">{{topInner}}</div>
                   <div class="middle"><span>{{middleInner}}</span></div>
                   <div class="bottom">
                       <p>每日歌曲推荐</p>
                       <span>根据你的口味生成，每天6:00更新</span>
                   </div>
                </div>
                <ul class="clearfix">
                    <li v-for="item in form">
                        <div class="imgdiv"><img :src="item.album.picUrl" height="225px" alt=""></div>
                        <p><b @click="getUrl($event)" :id="item.id">{{item.name}}</b></p>
                        <p class="playCount"><span>播放量:</span>{{(item.lMusic.playTime/10000).toFixed(2)}}万</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                form:[],
                result:[],
                topInner:'',
                middleInner:"",
                songsUrl:[]
            }
        },
        methods: {
            getForm(){
                this.$axios.get('http://118.24.90.238:3000/recommend/songs').then((res)=>{
                    this.result = res.data.recommend;
                    this.form = this.result.slice(0,6);                                
                }).catch((error)=>{
                    console.log(error);      
                })
            },
            getInner(){
                let date = new Date();
                this.topInner = date.getDay();
                this.middleInner = date.getDate();
                switch(this.topInner){
                    case 0:
                        this.topInner = "星期天";
                        break;
                    case 1:
                        this.topInner = "星期一";
                        break;
                    case 2:
                        this.topInner = "星期二";
                        break;
                    case 3:
                        this.topInner = "星期三";
                        break;
                    case 4:
                        this.topInner = "星期四";
                        break;
                    case 5:
                        this.topInner = "星期五";
                        break;
                    case 6:
                        this.topInner = "星期六";
                        break;
                } 
            },
            getUrl(event){
                var id = event.target.id;  
                this.$axios.get('http://118.24.90.238:3000/music/url?id='+id).then((res)=>{
                    this.$store.commit('musicUrl',res.data.data[0].url);                 
                }).catch((error)=>{
                    console.log(error);      
                })              
               this.$axios.get('http://118.24.90.238:3000/song/detail?ids='+id).then((res)=>{
                    this.$store.commit('musicTime',res.data.songs[0].dt);                     
                }).catch((error)=>{
                    console.log(error);      
                }) 
            }
        },
        created () {
            this.getForm();
            this.getInner();
        }
    }
</script>
<style lang="scss" scoped>
    #dailyPush{
        width: 100%;
        background: #f2f2f2;
        .personal{
            width:1040px;
             margin: 0 auto;
             &::before{
                 display: table;
                 content: '';
             }
            .title{
                height: 114px;
                font-size: 20px;
                margin-top: 30px;
                h2{
                    text-align: center;
                }
            }
            .form{
                height: 630px;   //-->更改处
                background: #f6f6f6;
                position: relative;
                .leftBox{
                    width: 252px;
                    height: 630px;
                    float: left;
                    .top,.bottom,.middle{
                        width: 80%;
                        margin: 10px auto;
                        height: 155px;
                    }
                    .top{
                        height: 50px;
                        color: #fed9d9;
                        text-shadow: 0 -1px #962626;
                        line-height: 50px;
                        text-align: center;
                        font-size: 14px;
                        background: linear-gradient(to bottom,#d74040,#bc1e1e);
                        border-radius: 5px 5px 0 0;
                        margin-bottom: 0;
                        margin-top:50px;
                    }
                    .middle{
                        background: linear-gradient(to bottom,#fff,#dcdcdc);
                        margin-top: 0px;
                        box-sizing: border-box;
                        border-radius: 0 0 5px 5px;
                        font-size: 90px;
                        font-weight: bold;
                        color: #333;
                        position: relative;
                        text-align: center;
                       padding-top: 20px;
                    }
                    .bottom{
                        width: 50%;
                        margin-left: 25px;
                        p{
                            margin-bottom: 10px;
                            color: #000;
                        }
                        span{
                            color: #999;
                            font-size: 14px;
                        }
                    }
                }
                ul{   
                    float: left;
                    width: 780px;
                    margin-left: 5px;
                    li{
                        float: left;
                        list-style: none;
                        width: 225px;
                        margin-left: 30px;
                        font-size: 12px;
                        .imgdiv{
                            transition: all 1s;
                            border-radius: 50%;
                            height:225px;
                            width: 225px;
                            overflow: hidden;
                            position: relative; 
                            margin-top: 10px; 
                            &::before{
                                width: 100%;
                                height: 100%;
                                content: '';
                                border-radius: 50%;
                                box-shadow: 0 0 0px 15px rgba(255,255,255,0.4) inset;
                                position: absolute;
                                z-index: 55;
                                display: block;
                            }
                            img{
                                transition: all 1s;
                            }
                            &:hover img{
                                transform: scale(1.1);   
                            }
                        }
                        p{
                            margin-top: 8px;
                            text-align: center;
                            color: #383636;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap
                        }
                        .playCount{
                            font-size: 14px;
                            color: rgb(199, 197, 197);
                            font-weight: 500;
                        }
                    }
                } 
            }
        }
    }
</style>

