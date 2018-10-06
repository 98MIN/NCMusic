<template>
    <div id="hotSearch">
        <div class="title">
            热门搜索
        </div>
        <ul>
            <li v-for="item in hotList">{{item.first}}</li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                hotList:[]
            }
        },
        methods:{
            getHotSearch(){
                this.$axios.get("http://118.24.90.238:3000/search/hot").then((res)=>{
                    this.hotList = res.data.result.hots.slice(0,7);
                }).catch((error)=>{
                    console.log(error);
                })
            }
        },
        created () {
            this.getHotSearch();
        },
    }
</script>
<style scoped>
    #hotSearch{
        width: 162px;
        position: absolute;
        font-size: 12px;
        color: #999;
        height: 205px;
        background: #f4f4f4;
        z-index: 888;
        top: 62px;
        transition: all 1s;
    }
    #hotSearch::before{
        display: block;
        content:'';
        border: 8px solid transparent;
        border-bottom: 8px solid #f4f4f4; 
        position: absolute;
        left: 70px;
        z-index: 889;
        top: -16px;
    }
    .title{
        width: 100%;
        height: 30px;
        line-height: 30px;
    }
    li{
        list-style: none;
        height: 25px;
        line-height: 25px;
        padding-left: 5px;
        box-sizing: border-box; 
        cursor: pointer;
        /*超出部分显示省略号*/
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    li:hover{
        background: red;
        color: #fff;
    }
</style>

