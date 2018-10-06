<template>
    <!-- 音乐推荐 -->
    <div id="personalized">
        <div class="personal">
             <div class="title">
                <h2>歌&emsp;单&emsp;推&emsp;荐</h2>
            </div>
            <div class="nav">
                <a href="#" @click.prevent="getAdd(index)" v-for="(item,index) in navList" :class="index==AIndex?'active':''">{{item}}</a>
            </div>
            <div class="form">
                <ul class="clearfix">
                    <li v-for="item in form">
                        <div class="imgdiv"><img :src="item.picUrl" height="225px" alt=""></div>
                        <p><b>{{item.name}}</b></p>
                        <p class="playCount"><span>播放量:</span>{{(item.playCount/10000).toFixed(2)}}万</p>
                    </li>
                </ul>
                <div class="arrow-left">&lt;</div>
                <div class="arrow-right">&gt;</div>
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
                AIndex:0,
                navList:["为你推荐","经典国语","古筝","韩语","情歌","网络歌曲"]
            }
        },
        methods: {
            getForm(){
                this.$axios.get('http://118.24.90.238:3000/personalized').then((res)=>{
                    this.result = res.data.result;
                    this.form = this.result.slice(0,8);         
                }).catch((error)=>{
                    console.log(error);      
                })
            },
            getAdd(index){
                this.AIndex = index;
                if(index*8<30){
                    this.form = this.result.slice(index*8,index*8+8);
                }else{
                    this.form = this.result.slice(index*8-32,index*8+8-32);
                }
            }
        },
        mounted () {
            this.getForm();
        }
    }
</script>
<style lang="scss" scoped>
    #personalized{
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
            .nav{
                height: 50px;
                text-align: center;
                a{
                    display: inline-block;
                    font-size: 15px;
                    margin: 0 24px;
                    text-decoration: none;
                    color: #2d2d2d;
                }
                .active{
                    color: #c20c0c;
                }
            }
            .form{
                height: 630px;   //-->更改处
                background: #f6f6f6;
                position: relative;
                .arrow-left,.arrow-right{
                    width: 80px;
                    height: 105px;
                    line-height: 105px;
                    text-align: center;
                    background: #DDD;
                    position: absolute;
                    left: -130px;
                    top: 70px;
                    font-size: 40px;
                    color: #ccc;
                    z-index: 666;
                    transition: all 1s;
                    display: none;
                    &:hover{
                        background: #ccc;
                    }
                }
                .arrow-right{
                    left: 1100px;
                }
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
                        margin-top: 20px;
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
</style>

