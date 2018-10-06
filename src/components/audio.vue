<template>
    <div :class="clockIndex==1?'audioTemplate audioBottom':'audioTemplate'">      
        <div class="audio clearfix">
            <audio :src="this.$store.state.songsUrl" ref="audio"></audio>
            <span class="pre"></span>
            <span  @click="Pause()" :class="pause==true?'pause':'play'"></span>
            <span class="next"></span>
            <div class="statbar" ref="statbar">
                <div class="dot" ref="dot"></div>
                <div class="playbar" ref="playbar"></div>
            </div>          
            <span class="time">{{playtime}}/{{Time}}</span>
            <span class="collection"></span>
            <span class="loop"></span>
            <span class="sound"></span>
        </div>
        <div class="clock">
            <div @click="changeClock()" :class="clockIndex==0?'clock-icon clock-open':'clock-icon clock-close'">
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                pause:true,
                Time:'00:00:00',//-->音乐时长
                minute:'',
                hour:'',
                second:'',
                playtime:'00:00:00',//-->已播放时间
                playTime:0,
                timer:null  //定时器
            }
        },
        computed: {
            musicTime:function(){  
                return this.$store.state.musicTime;
            },
            clockIndex:function(){
                return this.$store.state.clockIndex;
            }
        },
        /*这里使用的musicTime要从vuex中拿到,prop传值的方式已被修改*/ 
        watch: {
            musicTime:function(){  
                this.$refs.dot.style.left=0;
                clearInterval(this.timer);
                this.pause = true;
                this.playtime = "00:00:00";
                this.playTime = 0;  
                this.minute = parseInt(parseInt(this.musicTime/1000)/60);
                this.hour = parseInt(parseInt(this.musicTime/1000)/3600);            
                this.second = parseInt(this.musicTime/1000)%3600%60;               
                this.Time = this.toDouble(this.hour)+":"+this.toDouble(this.minute)+":"+this.toDouble(this.second);
            },
        },
        methods: {
           changeClock(){
               this.$store.commit("changeClock")
           },
            toDouble(num){
                return num>=10?num+'':"0"+num;
            },
            Pause(){
                this.pause = !this.pause; 
                clearInterval(this.timer);
                this.timer = null;
                if(this.pause){
                    this.$refs.audio.pause();
                }else{
                    this.$refs.audio.play();
                }
                if(!this.pause){ 
                    this.timer = setInterval(()=>{
                        this.playTime = Math.floor(this.$refs.audio.currentTime);                      
                            this.minute = parseInt(this.playTime/60);
                            this.hour = parseInt(this.playTime/3600);
                            this.second = parseInt(this.playTime%3600%60);    
                            this.playtime = this.toDouble(this.hour)+":"+this.toDouble(this.minute)+":"+this.toDouble(this.second);
                            if(this.playTime>this.musicTime||this.pause==true){
                                clearInterval(timer);
                                this.pause = true;  //播放完毕之后播放按钮变为暂停状态
                            }
                            var playbarWidth = this.$refs.dot.style.left = (this.$refs.statbar.offsetWidth-(this.$refs.dot.offsetWidth/2))*(this.playTime/(this.musicTime/1000))+"px";
                            this.$refs.playbar.style.width = playbarWidth;                     
                        },1000); 
                }          
            }
        },
        /*解决回退currentTime报错问题*/ 
        destroyed() {
            clearInterval(this.timer);
        },
        mounted() {
           this.$store.commit("loUrl");
           this.$store.commit("loTime");
        },
    }
</script>
<style scoped>
    .audioTemplate{
        width: 100%;
        position: fixed;
        z-index: 100000;
        height: 47px;
        bottom:-44px;
        background:#252525;
        transition: all 0.5s;
        cursor: pointer;
    }
    .audioBottom{
        bottom:0;
    }
    .audioTemplate:hover{
        bottom: 0px;
    }
    .audio{
        width: 800px;
        margin: 0 auto;
        height: 47px;
        line-height: 47px;
    }    
    span{
        display: block;
        float: left;
        width: 24px;
        height: 24px;
        margin: 14px 3px 0px 3px;      
    }
    span:hover{
        cursor: pointer;
    }
    .pre{  
        background: url(../images/iconall.png) no-repeat -43px -53px;
        transform: rotate(180deg);
    }
    .next{
        background: url(../images/iconall.png) no-repeat -43px -53px;
    }
    .pause,.play{
        margin-top: 12px; 
        width: 25px;
        height: 25px;
        background: url(../images/iconall.png) no-repeat -42px -23px;
    }
    .pause:hover{
       background: url(../images/iconall.png) no-repeat -42px -53px;  
    }
    .play{
        background: url(../images/iconall.png) -80px -91px;
    }
    .play:hover{
       background: url(../images/iconall.png) -80px -61px;
    }
    /* 播放条 */
    .statbar{
        position: relative;
        float: left;
        height: 8px;
        width: 400px;
        margin: 23px 15px 0 15px;
        background: url(../images/statbar.png) no-repeat;
        border-radius: 9px 9px 9px 9px;
    }
    .dot{
        position: absolute;
        width: 17px;
        height: 17px;
        top: -5px;
        left: 0;
        z-index: 2;
        background: url(../images/iconall.png) no-repeat -3px -252px;
    } 
    .playbar{
        position: absolute;
        width: 0px;
        height: 8px;
        left: 0;
        background: url(../images/statbar.png) no-repeat -0px -65px;
    }
    .collection{
        float: left;
        width: 55px;
        height: 21px;
        margin-top: 17px;
        background:url(../images/playbar.png) no-repeat -46px -72px;
    }
    .loop{
        float: left;
        margin-top: 18px;
        background: url(../images/playbar.png) -37px -348px;
    }
    .time{
        width: 100px;
        height: 20px;
        font-size: 13px;
        float: left;
        margin:3px 15px 0 3px;
        color: #fff;
        font-weight: 500;
    }
    .sound{
        float: left;
        margin-top: 16px;
        background: url(../images/playbar.png) -35px -250px;
    }
    .clock{
        width: 65px;
        margin-top: -59px;
        margin-left: 1200px;
        height: 60px;
        position: relative;
        background:url(../images/playbar.png) no-repeat 0px -389px;
    }
    .clock-icon{
        width: 15px;
        height: 15px;
        position: absolute;
        left: 17px;
    }
    .clock-open{
        background: url(../images/playbar.png) no-repeat -81px -382px;
    }
    .clock-open:hover{
        background: url(../images/playbar.png) no-repeat -81px -402px;
    }
    .clock-close{
        background: url(../images/playbar.png) no-repeat -102px -382px;
    }
    .clock-close:hover{
        background: url(../images/playbar.png) no-repeat -102px -402px;
    }
</style>
