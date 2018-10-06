<template>
    <div id="highLists">
        <div class="container">
             <div class="top clearfix">
                <h3>
                    <span>全部</span>
                    <a href="#" @click.prevent="getChinese()">选择分类</a>
                </h3>
                <div class="top-right">
                    <a href="#">热门</a>
                    <a href="#" @click.prevent="getNew($event)" :class="cat=='new'?'newList':''">最新</a>
                </div>
            </div>
            <div class="content">
                <ul class="clearfix">
                    <li v-for="item in highLists" class="liList">
                        <img :src="item.coverImgUrl" width="140px" listId="item.id" alt="">
                        <div class="li-div"></div>
                        <p class="first" :title="item.description">{{item.description}}</p>
                        <p><span>by&nbsp;:&nbsp;</span>{{item.creator.nickname}}&emsp;<sup></sup></p>
                    </li>
                </ul>
                <div class="btn" v-if="cat=='华语'">
                    <a href="#" @click="prev()" :class="Index==1?'active':''">上一页</a>
                    <a href="#" v-for="(item,index) in btnList" @click="getNum($event)" :class="Index==(index+1)?'numActive':''">{{item}}</a>
                    <a href="#" @click="next()" :class="Index==leng?'active':''">下一页</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                highLists:[],
                total:0,
                btnList:[],
                Index:1,
                leng:0,
                cat:"华语",
                api:''
            }
        },
        methods:{
            getHighLists(Index,cat,api){
                this.$axios.get(api).then((res)=>{ 
                    this.highLists = [];
                    this.highLists = res.data.playlists;
                    this.total = this.highLists.length;                    
                    this.highLists = this.highLists.slice((Index-1)*35,(Index-1)*35+35);
                    this.leng = Math.ceil(this.total/35);
                    var i;
                     this.btnList=[];
                    for(i=1;i<=this.leng;i++){ 
                        this.btnList.push(i);
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            getNum(event){
                this.Index = parseInt(event.target.innerHTML);
                this.getHighLists(this.Index,this.cat,this.api);
            },
            // 上一页
            prev(){
                if(this.Index>1){
                    this.Index -= 1;
                    this.getHighLists(this.Index,this.cat,this.api);
                }
            },
            // 下一页
             next(){
                if(this.Index<3){
                    this.Index += 1;
                    this.getHighLists(this.Index,this.cat,this.api);
                }
            },
            // 获取最新歌单
            getNew(event){
                this.cat = "new";
                this.Index = 1;
                this.api = "http://118.24.90.238:3000/top/playlist/highquality";
                this.getHighLists(this.Index,this.cat,this.api);
            },
            // 获取华语歌单
            getChinese(){
                this.Index = 1;
                this.cat = "华语";
                this.api = "http://118.24.90.238:3000/top/playlist?limit=100&cat="+this.cat;
                this.getHighLists(this.Index,this.cat,this.api);
            }
        },
        mounted() {
            this.api = "http://118.24.90.238:3000/top/playlist?limit=100&cat=华语";
            this.getHighLists(this.Index,this.cat,this.api);
        },
    }
</script>
<style scoped>
    #highLists{
        width: 1040px;
        background: #fff;
        margin: 0 auto;
        padding-bottom: 30px;
    }
    #highLists::before{
        display: table;
        content: '';
    }
    .top{
        height: 40px;
        border-bottom: 2px solid #c20c0c;
        margin-top: 40px;
    }
    .container{
        width: 900px;
        margin: 0 auto;
    }
    .top>h3{
        float: left;
    }
    .top h3 a{
        display: inline-block;
        height: 31px;
        line-height: 31px;
        overflow: hidden;
        vertical-align: top;
        text-align: center;
        font-size: 12px;
        text-decoration: none;
        cursor: pointer;
        width: 70px;
        background: url(../images/button.png) 0 -760px;
    }
    .top-right{
        float: right;
        background: url(../images/button.png) 0 0;
        width: 90px;
        height: 28px;
        line-height: 28px;
    }
    .top-right a{
        display: inline-block;
        font-size: 12px;
        width: 42px;
        text-decoration: none;
        text-align: center;
        color: #333;
        cursor: pointer;
    }
    .top-right a:nth-child(1){
        color: #fff;
    }
    .top-right .newList{
        color: #E1151d;
    }
    .content li{
        width: 140px;
        height: 190px;
        margin: 30px 10px 0 10px;
        list-style: none;
        display: inline-block;
        position: relative;
        cursor: pointer;
    }
    .content li:nth-child(5n){
        margin-right: 0;
    }
    /* .li-div{
        position: absolute;
         width: 140px;
        height: 190px;
        top: 0;
         background: url(../images/coverall.png) -10px -360px;
         z-index: 3;
    } */
    p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        margin-top: 5px;
    }
    .content li p{
        font-size: 12px;
        color: #999;
    }
    .content li .first{
        color: #333;
    }
    .btn{
        width: 400px;
        height: 35px;
        margin: 30px  auto 0px auto;
        text-align: center;
    }
    .btn a{
        display: inline-block;
        padding: 5px 15px;
        text-decoration: none;
        color: #333;
        border: 1px solid #999;
        margin-right: 20px;
    }
    /* 禁止按钮点击样式 */
    .active{
        background: rgba(240, 247, 240, 0.5);
    }
    /* 当前按钮 */
    .numActive{
        background: #E1151d;
        color: #fff !important;
    }
    /* 一般会员 */
    /* sup{
        height: 16px;
        width: 16px;
        display: inline-block;
    } */
    pvip{   
        background:red url(../images/icon.png) -65px -840px;
    }
    .liList{
        transition: all 1s;
        padding: 10px;
    }
    .liList:hover{
        box-shadow: 0px 3px 20px 3px #999;
    }
</style>
