import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

/*1.state在vuex中用于存储数据*/ 
var state = {
    isLogin:0,
    loginPanel:false,
    /*音乐的url和时长*/ 
    songsUrl:'',
    musicTime:0,
    /*控制播放条上升下降*/ 
    clockIndex:0,
    /*tips显示隐藏*/ 
    isShow:false,
    /*用户id*/
    userId:'' 
}

/*2.mutations里面放方法,方法主要改变state里面的方法*/ 
var mutations = {
    /*登录状态切换*/
    login(){
        state.isLogin=1;
    } ,
    quit(){
        state.isLogin=0;
    },
    /*登录面案的开启与关闭*/ 
    open(){
        state.loginPanel=true;
    },
    close(){
        state.loginPanel=false;
    },
    /*获取音乐url和时长*/
    musicUrl(state,musicUrl){
        sessionStorage.setItem("list", window.JSON.stringify(musicUrl))
           state.songsUrl = musicUrl; 
    },
    loUrl(){
        if(window.JSON.parse(sessionStorage.getItem("list"))){
            state.songsUrl = window.JSON.parse(sessionStorage.getItem("list"));
        }
    },
    musicTime(state,musicTime){
        sessionStorage.setItem("timeList", window.JSON.stringify(musicTime));
        state.musicTime = musicTime;
    },
    loTime(){
        if(window.JSON.parse(sessionStorage.getItem("timeList"))){
            state.musicTime = window.JSON.parse(sessionStorage.getItem("timeList"));
        }
    },
    /*音乐播放栏状态持久化*/ 
    changeClock(){
        if(state.clockIndex == 1){
            state.clockIndex = 0;
        }else{
            state.clockIndex = 1;
        }
    },
    /*控制提示框*/
    tipsShow(){
        state.isShow = true;
    },
    tipsHide(){
        state.isShow = false;
    },
    /*设置用户id*/
    getUid(state,uid){
        state.userId = uid;
    },
    setUid(){
        state.userId = '';
    }  
}

/**/
var store = new Vuex.Store({
    state,
    mutations
}) 

/*暴露出去*/ 
export default store;