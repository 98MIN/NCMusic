<template>
    <div id="header">
        <div class="hContent clearfix">
            <ul class="clearfix">
                <li>
                    <img src="../images/topbar.png" alt="">
                </li>
                <li>
                    <a href="#" class="active">发现音乐</a>
                </li>
                <li>
                    <a href="#" @click.prevent="myMusic()">我的音乐</a>
                </li>
                <li>
                    <a href="#">朋友</a>
                </li>
                <li>
                    <a href="#">商城</a>
                </li>
                <li>
                    <a href="#">音乐</a>
                </li>
                <li>
                    <a href="#">下载客户端</a>
                    <sup></sup>
                </li>
            </ul>
            <div class="hRight  clearfix">
                <div class="search-input">
                    <input type="text" @mouseover="getPlace()" @focus="getFocus()" @blur="dropFocus()" @mouseout="dropPlace()" :placeholder="placeHold">
                    <vHotsearch v-if="isFocus"></vHotsearch>
                </div>
                <div class="videodiv"><a href="#" class="video">视频投稿</a></div>
                <div class="logindiv" @mouseover="loginHoverOn()" @mouseout="loginHoverOut()">
                    <a href="#" class="login" v-if="!code">登录</a>
                    <a href="#" class="loginIn" v-else><img :src="avater" width="30px" alt=""></a>
                    <div class="login-style" v-if="LHover&&!code">
                        <ul>
                            <li @click="telLogin()">
                                <a href="#">手机号登录</a>
                            </li>
                            <li>
                                <a href="#">微信登录</a>
                            </li>
                            <li>
                                <a href="#">QQ登录</a>
                            </li>
                            <li>
                                <a href="#">新浪微博登录</a>
                            </li>
                            <li @click="emailLogin()">
                                <a href="#">网易邮箱登录</a>
                            </li>
                        </ul>
                    </div>
                    <div class="login-style add" v-if="LHover&&code">
                        <ul>
                            <li>
                                <router-link :uid="userId" to="homePage">我的主页</router-link>
                            </li>
                            <li>
                                <a href="#">我的消息</a>
                            </li>
                            <li>
                                <a href="#">我的等级</a>
                            </li>
                            <li>
                                <a href="#">VIP会员</a>
                            </li>
                            <li>
                                <a href="#">个人设置</a>
                            </li>
                            <li>
                                <a href="#" @click="quit()">退出</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <v-login :loginType="loginType" v-if="this.$store.state.loginPanel" @codeP="codeP"></v-login>
    </div>
</template>
<script>
import vLogin from "./login";
import vHotsearch from "./hotSearch";
    export default{
        data(){
            return{
                placeHold:"",
                isFocus:false,
                LHover:false,
                loginType:"",
                loginTypeClick:false,
                code:'',
                avater:'',
                userId:'',
                /*是否勾选自动登录*/
                checked:false 
            }
        },
        methods: {
            getPlace(){
                setTimeout(()=>{
                    this.placeHold="音乐/视频/电台/用户";
                },500);    
            },
            dropPlace(){
                if(this.isFocus!=true){
                    this.placeHold="";
                }else{
                    return;
                }    
            },
            getFocus(){
                this.isFocus = true;

            },
            dropFocus(){
                this.isFocus = false;
                this.placeHold="";
            },
            loginHoverOn(){
                this.LHover = true;
            },
            loginHoverOut(){
                this.LHover = false;
            },
            telLogin(){
                this.loginType = "手机号登录";
                this.$store.commit('open')
            },
            emailLogin(){
                this.loginType = "网易邮箱登录";
                this.loginTypeClick = true;
            },
            codeP(codeP){   
                this.checked = codeP.checked;
                if(this.checked){
                    localStorage.setItem("STORAGE_KEY", window.JSON.stringify(codeP));              
                }else{
                    sessionStorage.setItem("STORAGE_KEY", window.JSON.stringify(codeP)); 
                }           
                this.userId = codeP.bindings[0].userId; 
                this.$store.commit("getUid",this.userId);     
                this.code = codeP.code;
                this.avater = codeP.profile.avatarUrl;  
                this.$store.commit('login');        
            },
            quit(){
                this.code = '';
                this.$store.commit('quit'); 
                this.$store.commit("setUid");
                /*退出登录接口有问题*/ 
                // this.$axios.get("http://118.24.90.238:3000/logout").then((res=>{
                //     console.log(res.data);
                // })).catch((error)=>{
                //     console.log(error);    
                // })
                if(this.checked){
                   localStorage.removeItem("STORAGE_KEY")
                }else{
                     sessionStorage.removeItem("STORAGE_KEY")
                } 
            },
            myMusic(){
                if(this.$store.state.isLogin!=1){
                   this.$store.commit("tipsShow");
                }
            }
        },
        components: {
            vLogin,
            vHotsearch
        },
        mounted() {
            /*实现勾选则自动登录，否则浏览器关闭就需要重新登录*/ 
            var aList  = window.JSON.parse(window.localStorage.getItem("STORAGE_KEY"))||window.JSON.parse(window.sessionStorage.getItem("STORAGE_KEY"));
            if(aList){
                this.checked = aList.checked;
            }
            if(this.checked){
                var list = window.JSON.parse(window.localStorage.getItem("STORAGE_KEY")); 
            }else{
               var list = window.JSON.parse(window.sessionStorage.getItem("STORAGE_KEY")); 
            }       
            if(list){
                this.userId = list.bindings[0].userId; 
                this.$store.commit("getUid",this.userId);     
                this.code = list.code;
                this.avater = list.profile.avatarUrl;  
                this.$store.commit('login');   
            }
        }
    }
</script>
<style scoped  lang="scss">
    #header{
        background: #242424;
        width: 100%;
        height: 70px;
        font-size: 14px;
        .hContent{
            width: 1105px;
            height: 70px;
            line-height: 70px;
            margin: 0 auto;
            background: #242424;
            ul{
                float: left;
                list-style: none;
                height: 70px;
                li:nth-child(1){
                    padding-left: 0;
                }
                
                li{
                    padding:0 20px;
                    float: left;
                    position: relative;
                    img{
                        vertical-align: middle;
                    }
                    a{
                        color: #ccc;
                        text-decoration: none;
                        &:hover{
                            color:#fff;
                            cursor: pointer;
                        }
                        &.active{
                            color: #fff;
                        }
                    }
                    sup{
                        position: absolute;
                        width: 30px;
                        height: 13px;
                        left: 100px;
                        top: 20px;
                        background-image: url("../images/hot.png");
                        background-position: -190px 0px;
                        z-index: 999;
                    }
                }
            }
            .hRight{
                width: 400px;
                height: 70px;
                line-height: 70px;
                float: right;
                position: relative;
                .search-input{
                    float: left;
                    width: 170px;
                }
                input{
                    box-sizing: border-box;
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    
                    outline: 0;
                    transition: all 1s;
                    border: 1px solid #ccc;
                    background:#fff url(../images/search.png) no-repeat -2px -2px;
                    &:hover{
                        width: 160px;
                        padding-left: 30px;
                    }
                    &:focus{
                        width: 160px;
                        padding-left: 30px;
                    }
                }
                .videodiv,.logindiv{
                    float: left;
                }
                .video{
                    padding-left: 20px;
                    color: #ccc;
                    text-decoration: none;
                    padding:5px 12px 8px 30px;
                    background: url(../images/hot.png)  no-repeat 0px -140px;
                    &:hover{
                       background: url(../images/hot.png)  no-repeat -100px -140px; 
                    }
                }
                .login{
                    padding: 10px 30px 10px 8px;
                    color: #787878;
                    text-decoration: none;
                    background: url(../images/hot.png)  no-repeat -180px -42px; 
                    &:hover{
                        color: #999;
                        text-decoration: underline;
                    }
                }
                .loginIn{
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    padding: 10px 30px 10px 8px;
                    text-decoration: none;
                    background: url(../images/hot.png)  no-repeat -180px -37px; 
                    img{
                        vertical-align: middle;
                        border-radius: 50%;
                    }
                }
                
                .login-style{
                    width: 160px;
                    height: 200px;
                    position: absolute;
                    right: 20px;
                    top: 60px;
                    background: #2b2b2b;
                    z-index: 10;
                    ul{
                        &::before{
                            content: '';
                            display: block;
                            width: 0;
                            position: absolute;
                            top: -12px;
                            left: 70px;
                            border: 6px solid transparent;
                            border-bottom: 6px solid #2b2b2b;
                        }
                        li{
                            width: 100%;
                            height: 40px;
                            box-sizing: border-box;
                            line-height: 40px;
                            padding:0 20px;
                            font-size: 12px;
                            font-weight: 500;
                        }
                    }  
                }
                .add{
                    height: 240px;
                }
            }
        }
    }
</style>


