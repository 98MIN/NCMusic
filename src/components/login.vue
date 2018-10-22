<template>
    <div id="login">
        <div class="loginBox">
            <div class="loginBar">
                {{loginType}}
                <span @click="close()">X</span>
            </div>
            <div class="loginContent">
                <div><input type="text" class="account" placeholder="请输入账号" v-model="account"></div>
                <div class="pwddiv"><input type="password" class="pwd" placeholder="请输入密码" v-model="pwd"></div>
                <div class="remember clearfix">
                    <label class="rememberLeft"><input type="checkbox" v-model="checked">自动登录</label>
                    <a href="#" class="rememberRight">忘记密码?</a>
                </div>
                <div class="btn">
                    <a href="#" @click="login()">登录</a>
                </div>
                <p class="tip">{{tip}}</p>
            </div>
            <div class="loginBottom clearfix">
                <a href="#">&lt;其他登录方式</a>
                <a href="#">没有账号?免费注册&gt;</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                account:"",
                pwd:"",
                loginRes:[],
                tip:'',
                checked:false
            }
        },
        props:['loginType'],
        methods:{
            login(){
                var qs = require('qs');              
                this.$axios.get(`http://118.24.90.238:3000/login/cellphone?phone=${this.account}&password=${this.pwd}`).then((res)=>{
                    // 存储返回的数据
                    this.loginRes = res; 
                    console.log(this.loginRes.data);           
                    this.loginRes.data.checked=this.checked;
                    if(res.data.code==200){
                        // 将获取到的数据传递到父组件中
                        this.$emit("codeP",this.loginRes.data); 
                        // 登录成功关闭登录面板
                        this.close(); 
                        this.$store.commit('maskHide');
                        document.body.style.overflow = "auto";  
                    }else{
                        this.tip = '用户名或密码错误';
                        setTimeout(()=>{
                            this.tip = '';
                        },2000)
                    }
                   
                }).catch((error)=>{
                    console.log(error);           
                })
            },
            // 关闭登录面板
            close(){
                // 改变vuex中登陆面板的状态
                this.$store.commit('close');
                 this.$store.commit('maskHide');
                 document.body.style.overflow = "auto";       
            }
        }
    }
</script>
<style lang="scss" scoped>
    #login{
        position: absolute;
        z-index: 999;
        top: 0;
        width: 100%;
        height: 999px;
        .loginBox{
            width: 530px;
            height: 330px;
            border-radius:5px;
            margin: 10px auto;
            background: #fff;
            .loginBar{
                width: 100%;
                height: 38px;
                line-height: 38px;
                color: #fff;
                font-size: 14px;
                background: #2d2d2d;
                border-radius:5px 5px 0 0;
                font-weight: bold;
                padding-left: 18px;
                box-sizing: border-box;
                span{
                    float: right;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    margin-top: 10px;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
            .loginContent{
                width: 220px;
                height: 238px;
                background: #fff;
                margin: 0 auto;
                box-sizing: border-box;
                padding: 30px 0 43px;
                .account,.pwd{
                    width: 206px;
                    height: 19px;
                    padding: 5px 6px 6px;
                    border: 1px solid #cdcdcd;
                    outline: 0;
                }
                .pwddiv{
                    margin-top: 10px;
                }
                .remember{
                    margin-top: 10px;
                    font-size: 12px;
                    height: 16px;
                    line-height: 16px;
                    .rememberLeft{
                        float: left;
                        color: #666;
                        input{
                            margin-right: 12px; 
                        }
                    }
                    .rememberRight{
                        color: #666;
                        float: right;
                        text-decoration: none;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
                .btn{
                    margin-top: 20px;
                    a{
                        background: #2475c3;
                        height: 31px;
                        display: block;
                        text-align: center;
                        line-height: 31px;
                        text-decoration: none;
                        color: #fff;
                        font-weight: bold;
                        border-radius: 4px;
                        &:hover{
                            background: #4e97db;
                        }
                    }
                }
                .tip{
                    height: 20px;
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    margin-top: 10px;
                    color: red;
                }
            }
            .loginBottom{
                height: 52px;
                width: 528px;
                box-sizing: border-box;
                line-height: 52px;
                padding: 0 19px;
                border-top: 1px solid #c6c6c6;
                background: #f7f7f7;
                a{
                    text-decoration: none;
                }
                a:nth-child(1){
                    color: #0c72c3;
                    float: left;
                }
                a:nth-child(2){
                    color: #999;
                    float: right;
                }
            }
        }
    }

</style>

