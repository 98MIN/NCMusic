<template>
    <div id="nav">
        <ul class="content clearfix">
            <li v-for="(item,index) in list" @click="addStyle(index)" :class="index==nIndex?'active':''">
                <router-link :to="{name:item[1]}">{{item[0]}}</router-link>
            </li>
            
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                nIndex:0,
                list:[
                        ['首页','home'],
                        ['歌单','highLists'],
                        ['专辑','home'],
                        ['排行榜','home'],
                        ['电台','home'],
                        ['数字专辑','home'],
                        ['新品上架','home']
                    ], 
            }
        },
        methods: {
            addStyle(index){
                this.nIndex = index;
            }
        }
    }
</script>
<style lang="scss" scoped>
    #nav{
        font-size: 13px;
        width: 100%;
        height: 35px;
        line-height: 35px;
         background: #c20c0c;
         position: relative;

        .content{
            width: 715px;
            height: 35px;
            line-height: 35px;
            list-style: none;
            margin: 0 auto;
            &::before{
                display: block;
                content: '';
                width: 0;
                height: 0;
                border: 5px solid transparent;
                border-bottom:5px solid #c20c0c; 
                position: absolute;
                top: -10px;
                left: 343px;
            }
            .active{
                 background: #9B0909;
                border-radius: 13px;
            }
            li{
                margin: 5px 20px 0 0;
                float: left;
                height: 26px;
                line-height: 26px;
                padding:0 18px;
                text-align: center;
                list-style: none;
                
                &:hover{
                    background: #9B0909;
                    border-radius: 13px;
                }
                
                a{
                    text-decoration: none;
                    color: #fff;
                }
            }
           
        }
    }
</style>

